
/*
 * GET home page.
 */
(function () {
    var search = require('../model/search');

        exports.index = function (req, res) {
            res.render('index', { title: 'Express' });
        };

        exports.search = function (req, res) {
            var queryTitle = req.query.q;
            search.getSearchReuslt(queryTitle, function (err, data){
                if (!err) {
                    console.log(data);
                    res.send(data);
                };
            });
        };
    
        exports.paperFindWithIndex = function (req, res) {
            var selectIndex = req.params.id;
            search.getPaperWithIndex(selectIndex, function (err, data){
                if (!err) {
                    console.log(data);
                    res.send(data);
                };
            });
        };

        exports.getTF = function (req, res) {
            search.getTf(function (err, data){
                if (!err) {
                    res.send(data);
                };
            });
        };

        exports.getTfTwo = function (req, res) {
            search.getTfTwo(function (err, data){
                if (!err) {
                    res.send(data);
                };
            });
        };
}());