const express = require('express');
const router = express.Router();

module.exports = function(mongo){

    router.get('/', function(req, res, next) {
        mongo.mongo.find().toArray((error, response) => {
          if (error) next(error);
            res.render('index', { icolist: response.map(el => {
                el.links = el.links ? el.links.map(l => l.type + ': ' + l.link).join('<br>') : '&nbsp;';
                if (el.sales && el.sales[0]) {
                    el.sales_begin_date = el.sales[0].begin_date ? el.sales[0].begin_date.toDateString() : '';
                    el.sales_end_date = el.sales[0].end_date ? el.sales[0].end_date.toDateString() : '';
                    el.sales_real_date = el.sales[0].real_date ? el.sales[0].real_date.toDateString() : '';
                    el.sales_raised_btc = el.sales[0].raised_btc;
                    el.sales_raised_usd = el.sales[0].raised_usd;
                    el.sales_course = el.sales[0].course;
                    el.sales_coins = el.sales[0].coins;
                    el.sales_link = el.sales[0].link;
                }
                return el;
            }) });
        });

    });

    return router;
};
