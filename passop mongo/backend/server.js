const express = require('express');
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
const cors = require('cors')

// or as an es module:
// import { MongoClient } from 'mongodb'
dotenv.config()

// Connection URL
const url = process.env.MONGO_URI
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const app = express()
// console.log(process.env.MONGO_URI) //remove this after you've confirmed it is working
app.use(cors())
const port = 3000
app.use(bodyparser.json())

//Use connect method to connect to the server
//  client.connect();
client.connect()
    .then(() => {
        console.log("MongoDB connected successfully")
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err)
    })

//Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//Save a password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true, result: findResult})
})


//Delete a password by id
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true, result: findResult})
})

app.listen(port, () => {
    console.log(`Example app listening http://localhost:${port}`)
})