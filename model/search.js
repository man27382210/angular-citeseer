(function (){
    var ajaxModel = require('./ajax');

    module.exports = {
        getSearchReuslt: function (config, callback) {
            ajaxModel.ajax({
                method: 'GET',
                path:'/search',
                args: {
                    "queryString": config
                },
                success: function (data){
                    if (!data || data.length === 0) {
                        callback('error');
                    }else
                    {
                        callback(null, data);
                    }
                },
                error: function (err){
                    callback(err);
                }
            });
        },

        getPaperWithIndex: function (config, callback) {
            ajaxModel.ajax({
                method: 'GET',
                path:'/searchIndex',
                args: {
                    "queryIndex": config
                },
                success: function (data){
                    console.log(data);
                    if (!data || data.length === 0) {
                        callback('error');
                    }else
                    {
                        callback(null, data);
                    }
                },
                error: function (err){
                    callback(err);
                }
            });
        },

        getTf: function (callback) {
           ajaxModel.ajax({
                method: 'GET',
                path:'/counttfidf',
                args:'',
                success: function (data){
                    if (!data || data.length === 0) {
                        callback('error');
                    }else
                    {
                        callback(null, data);
                    }
                },
                error: function (err){
                    callback(err);
                }
            });
        },
        
        getTfTwo: function (callback) {
           ajaxModel.ajax({
                method: 'GET',
                path:'/counttfidftwo',
                args:'',
                success: function (data){
                    if (!data || data.length === 0) {
                        callback('error');
                    }else
                    {
                        callback(null, data);
                    }
                },
                error: function (err){
                    callback(err);
                }
            });
        }
    };
}())