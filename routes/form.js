const express = require('express');
const router = express.Router();


module.exports = function(mongo) {

    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('form');
    });

    router.get('/:id', function (req, res, next) {
        try {
            mongo.mongo.findOne({_id: mongo.ObjectID(req.params.id)}).then(function (doc) {
                if (!!doc.sales) {
                    doc.sales.forEach(sale => {
                        if (!!sale.begin_date) sale.begin_date = sale.begin_date.toDateString();
                        if (!!sale.end_date) sale.end_date = sale.end_date.toDateString();
                        if (!!sale.real_date) sale.real_date = sale.real_date.toDateString();
                    })
                }
                res.json(doc);
            });
        } catch(e) {
            console.log(e);
            next(e);
        }
    });

    router.post('/', function (req, res, next) {
        let id = req.body._id;
        delete req.body._id;
        try {
            if (id) {
                mongo.mongo.update({_id: mongo.ObjectID(id)}, req.body, (error, result) => {
                    if (error) return next(error);
                    res.json({id: id});
                });
            } else {
                mongo.mongo.insert(req.body, (error, result) => {
                    if (error) return next(error);
                    res.json({id: result.insertedIds[0]});
                });
            }
        } catch (e) {
            return next(e);
        }
    });

    return router;
};
