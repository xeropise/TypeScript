import {connect} from '../mongodb/connect'
import {ObjectId} from 'mongodb'

const fineOneTest = async() => {
    let connection, cursor
    try {
        connection = await connect()
        const db = await connection.db('ch12-2')
        const personsCollection = db.coolection('persons')

        cursor = personsCollection.find({})
        const foundPersons = await cursor.toArray()

        const _id = foundPersons[0]._id
        const result = await personsCollection.fineOne({_id})
        console.log(result)
    } catch(e) {
        console.log(e.message)
    } finally {
        connection.close()
    }
}

fineOneTest()