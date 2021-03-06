const Book = require('../models/Book');
const Author = require('../models/Author');

const mongoDataMethods = {
	getAllBooks: async (condition) =>
		condition === null ? await Book.find() : await Book.find(condition),
	getAllAuthors: async () => await Author.find(),

	getBookById: async (id) => await Book.findById(id),
	getAuthorById: async (id) => await Author.findById(id),

	createBook: async (args) => {
		const newBook = new Book(args);
		return await newBook.save();
	},
	createAuthor: async (args) => {
		const newAuthor = new Author(args);
		return await newAuthor.save();
	},
};

module.exports = mongoDataMethods;
