import MongoClient from 'mongodb'

export const connect = (mongourl: string = 'mongodb://localhost:27017') =>
    MongoClient.connect(mongourl, {useNewUrlParser: true, useUnifiedTopology: true})