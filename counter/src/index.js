const config = require('./config');
const express = require('express');
const routes = require('./routes/api');

const app = express();
app.use('/', routes);
app.listen(config.PORT, () => {
    console.log(`Server started on port ${config.PORT}`);
})