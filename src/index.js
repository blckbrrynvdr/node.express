const config = require('./config');
const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middleware/error-handler');
const path = require('path');

const app = express();
app.get("/:name", (req, res) => {
	const {name} = req.params;

	res.json({message: 'Hello, ' + name})
})

app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use('/', routes);
app.use(errorHandler);

app.listen(config.PORT, () => {
	console.log(`Server started on port ${config.PORT}`);
})