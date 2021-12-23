import { uuid } from 'uuidv4';

class Item {
  constructor(dynamoConnector) {
    this.dynamoConnector = dynamoConnector;
  }

  async getAllItems() {
    const results = await this.dynamoConnector.query({
      partitionKeyName: 'pk',
      partitionKeyValue: 'item'
    });
    return results.Items;
  }

  async addItem(itemInput) {
    const { input } = itemInput;
    const id = uuid();
    const queryParams = {
      pk: 'item',
      sk: input.itemId,
      id,
      createdAt: new Date().toISOString(),
      ...input
    };
    await this.dynamoConnector.putItem(queryParams);
    return queryParams;
  }
}

export default Item;
