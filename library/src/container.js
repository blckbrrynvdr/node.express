const { Container } = require('inversify');
const BooksRepository = require("./classes/book");

const container = new Container();

container.bind(BooksRepository).toSelf();

module.exports = container;