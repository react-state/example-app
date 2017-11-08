const React = require("react");
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const Render = require('../dist/ssr').Render;

const PORT = process.env.PORT || 4000;

function handleRender(req: any, res: any) {
    fs.readFile('./dist/index.html', 'utf8', function (err: any, data: any) {
        if (err) throw err;
        Render.sendResponse(req, res, data);
    });
}

const app = express();

app.use('/assets', express.static(path.join(__dirname, '../dist/assets')));
app.use('/', handleRender);

app.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
});