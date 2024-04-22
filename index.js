const config = require('./config');
const express = require('express');
const routes = require('./routes');
const error404 = require('./middleware/404');

const app = express();

app.use('/api', express.json(), routes);

app.use(error404);

app.listen(config.PORT, () => {
	console.log(`Server started on port ${config.PORT}`);
})
