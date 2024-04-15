const config = require('./config');
const express = require('express');
const routes = require('./routes');

const app = express();

app.use('/api', express.json(), routes);

app.listen(config.PORT, () => {
	console.log(`Server started on port ${config.PORT}`);
})
