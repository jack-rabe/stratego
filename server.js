import express from 'express';
import https from 'https';
import fs from 'fs';
import path from 'path';
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(path.resolve() + '/dist/index.html'));
});
app.use(express.static('dist'));
app.use('/assets', express.static(path.resolve() + '/dist'));

let server = https
    .createServer(
        {
            //must be after all the app...
            key: fs.readFileSync('./ssl/server.key'),
            cert: fs.readFileSync('./ssl/server.cert'),
        },
        app
    )
    .listen(443, `0.0.0.0`, function () {
        console.log('Listening on port 443!');
    });
