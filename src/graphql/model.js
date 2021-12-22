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
}

export default Item;
