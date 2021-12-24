const resolvers = {
	// QUERY
	Query: {
		books: async (parent, args, context) =>
			await context.mongoDataMethods.getAllBooks(),
		book: async (parent, args, context) =>
			await context.mongoDataMethods.getBookById(args.id),
		authors: async (parent, args, context) =>
			await context.mongoDataMethods.getAllAuthors(),
		author: async (parent, args, context) =>
			await context.mongoDataMethods.getAuthorById(args.id),
	},
	Book: {
		author: async ({ authorId }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAuthorById(authorId),
	},
	Author: {
		books: async ({ id }, args, { mongoDataMethods }) =>
			await mongoDataMethods.getAllBooks({ authorId: id }),
	},

	// MUTATION
	Mutation: {
		createBook: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createBook(args),
		createAuthor: async (parent, args, { mongoDataMethods }) =>
			await mongoDataMethods.createAuthor(args),
	},
};

module.exports = resolvers;
