type Item {
    name: String! 
    item_id: String! 
    location: Location!
    status: String! 
    date: String! 
    id: String!
    reward: String
}

type Location {
    sector: String
    district: String 
    village: String 
    cell: String 
    province: String 
    coordinates: Coordinates
}

type Coordinates{
    longitude: String!
    latitude: String!
}

type Query {
    getAllItems(status: String!): [Item!]!
}