const config = require('./config');
const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middleware/error-handler');
const path = require('path');

const app = express();

const mongoose = require('mongoose');

async function start(PORT, UrlDb) {
	try {
		await mongoose.connect(UrlDb, { dbName: 'books' });
		app.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`);
		})
	} catch (e) {
		console.error(e)
	}
}

app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use('/', routes);
app.use(errorHandler);

const URL_DB = config.URL_DB;
const PORT = config.PORT;
start(PORT, URL_DB);