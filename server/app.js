require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

// LOAD schema & resolvers
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolver');

// LOAD db methods
const mongoDataMethods = require('./data/db');

// Connect to MongoDB
(async function () {
	const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.zxzqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
	try {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
})();

// Graphql khuyến cáo nên import db methods vào đây, không nên import thẳng
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () => ({ mongoDataMethods }),
});

const app = express();

(async function () {
	await server.start();
	server.applyMiddleware({ app });
})();

app.listen({ port: 4000 }, () => {
	console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});
