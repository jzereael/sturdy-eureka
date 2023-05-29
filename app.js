const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const randomNumberRoutes = require('./src/routes/random-number-api.routes');

// Create the Express app
const app = express();

// Parse JSON requests
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process with a failure code
  });

// Use random number routes, here is where the endpoint is defined
app.use('/random-number', randomNumberRoutes);

// Default endpoint
app.get('/', (req, res) => {
  res.send('Random Number Generator API');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


// const express = require('express');
// const app = express();
// const randomNumberRoutes = require('./src/routes/random-number-api.routes');

// const username = encodeURIComponent("default-user");
// const password = encodeURIComponent("ZY5ledatCSd27cra");

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://default-user:ZY5ledatCSd27cra@cluster-0000.l5lgu2e.mongodb.net/?retryWrites=true&w=majority`;

// console.log(username);
// console.log(password);

// // Parse JSON requests
// app.use(express.json());

// // Use random-number-routes
// app.use('/random-number', randomNumberRoutes);

// // Default endpoint
// app.get('/', (req, res) => {
//     res.send('Random Number Generator API');
// });

// module.exports = app;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });


// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);
