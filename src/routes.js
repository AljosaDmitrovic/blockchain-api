const auth = require('./controllers/auth');
const bodyParser = require('body-parser');
const api = require('./controllers/api');

let jsonParser = bodyParser.json({
    limit: '10mb',
    extended: true
});

module.exports = (app) => {
    app.get('/getInfo', jsonParser, auth.check, api.getInfo);
    app.get('/getBlock/:blockNum', jsonParser, auth.check, api.getBlock);
    app.get('/getAccount/:accountName', jsonParser, auth.check, api.getAccount);
    app.get('/getAbi/:accountName', jsonParser, auth.check, api.getAbi);
    app.get('/getCurrencyBalance/:accountName', jsonParser, auth.check, api.getCurrencyBalance);
    app.get('/getCurrencyStats', jsonParser, auth.check, api.getCurrencyStats);
    app.get('/getProducers', jsonParser, auth.check, api.getProducers);
    app.get('/getTransaction/:blockNum/:id', jsonParser, auth.check, api.getTransaction);
    app.get('/getAllTransactionsFromBlock/:blockNum', jsonParser, auth.check, api.getAllTransactionsFromBlock);
    app.get('/getLastFour', jsonParser, auth.check, api.getLastFour);
    app.get('/getTransaction30', jsonParser, auth.check, api.getTransaction30);
    app.post('/register', jsonParser, api.register);
};