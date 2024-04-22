const config = require('./config');
const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use('/', routes);

app.listen(config.PORT, () => {
	console.log(`Server started on port ${config.PORT}`);
})
