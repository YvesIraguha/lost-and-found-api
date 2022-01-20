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

  async getOneItem(id) {
    const results = await this.dynamoConnector.getItem(id);
    return results.Item;
  }

  async addItem(itemInput) {
    const { input } = itemInput;
    const id = uuid();
    const queryParams = {
      pk: 'item',
      sk: id,
      updatedAt: new Date().toISOString(),
      ...input
    };
    await this.dynamoConnector.putItem(queryParams);
    return queryParams;
  }

  async updateItem(id, input) {
    const queryParams = {
      pk: 'item',
      sk: id,
      updatedAt: new Date().toISOString(),
      ...input
    };
    await this.dynamoConnector.putItem(queryParams);
    return queryParams;
  }

  async deleteItem(id) {
    const results = await this.dynamoConnector.deleteItem(id);
    return results;
  }
}

export default Item;
