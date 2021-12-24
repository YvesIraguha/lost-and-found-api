import { DynamoDB } from 'aws-sdk';

export default class DynamoConnector {
  constructor(config) {
    if (config == null) {
      throw Error('Provide configurations');
    }
    this.tableName = config.tableName;
    this.docClient = new DynamoDB.DocumentClient({ ...config.options });
  }

  query(params) {
    const queryParams = {
      TableName: this.tableName,
      KeyConditionExpression: '#keyName = :keyValue',
      ExpressionAttributeNames: {
        '#keyName': params.partitionKeyName
      },
      ExpressionAttributeValues: {
        ':keyValue': params.partitionKeyValue
      }
    };
    return this.docClient.query(queryParams).promise();
  }

  getItem(id) {
    const getParams = {
      TableName: this.tableName,
      Key: {
        pk: 'item',
        sk: id
      }
    };

    return this.docClient.get(getParams).promise();
  }

  putItem(params) {
    const queryParams = {
      TableName: this.tableName,
      Item: params
    };
    return this.docClient.put(queryParams).promise();
  }

  deleteItem(id) {
    const params = {
      TableName: this.tableName,
      Key: {
        pk: 'item',
        sk: id
      },
      ReturnValues: 'ALL_OLD'
    };
    return this.docClient
      .delete(params)
      .promise()
      .then((response) => response.Attributes);
  }
}
