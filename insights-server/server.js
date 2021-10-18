
const express = require('express');
const mountRoutes = require('./routes');

const app = express();
const host = '0.0.0.0';
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mountRoutes(app);

app.listen(port, host,() => {
    console.log(`Server running on http://${host}:${port}`);
});

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    server.close(() => {
        console.log('Http server closed.');
    });
});