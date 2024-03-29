const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 5000;

// middle wear
app.use(cors())
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.91makds.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const productsCollection = client.db("star-e-commerce").collection("products");

        //To Get Products Data
        app.get('/products', async (req, res) => {
            const result = await productsCollection.find().toArray();
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Star e commerce Server is Running')
})

app.listen(port, () => {
    console.log(`Star e commerce server is running on port: ${port}`)
})
