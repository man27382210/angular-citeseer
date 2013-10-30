(function () {

    var http = require('http'),
        qs = require('querystring'),
        JSONParser = require('../utilities/JSONParser'),

        apiSettingsClosure = function () {
            var fs = require('fs'),
                settingsString = fs.readFileSync('api-settings.json', 'utf-8'),
                settings = JSONParser(settingsString);
            return function () {
                return settings;
            };
        },
        apiSettings = apiSettingsClosure(),

        host = apiSettings().host,
        port = apiSettings().port;

    module.exports = {
        ajax: function (config) {
            var method = config.method || 'GET',
                args = qs.stringify(config.args) || '',
                path = (method === 'GET') ? config.path + ((args === '') ? '' : '?' + args) : config.path,
                success = config.success,
                error = config.error,
                headers = (method === 'POST' || method === 'PUT') ? {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': args.length
                } : {},

                data = '',
                req = http.request({
                    host: host,
                    port: port,
                    path: path,
                    method: method,
                    headers: headers
                }, function (res) {
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        data = data + chunk;
                    });
                    res.on('error', error);
                    res.on('end', function () {
                        var dataObject = JSONParser(data);
                        if (dataObject && data !== '') {
                            success(dataObject);
                        } else {
                            error('error');
                        }
                    });
                });

            if (method === 'POST' || method === 'PUT') {
                //console.log(args);
                req.write(args);
            }

            req.end();
        }
    };

}());