
var spawn = require('child_process').spawn,
    Vow = require('vow');

// magic double escaper. passing data thru platforms!

exports.packData = function(s) {
    return strEscape(exports.innerPackData(s));
};

exports.innerPackData = function(s) {
    return [
        'json_decode(\"',
        JSON.stringify(s)
            .replace(/[\\"']/g, '\\$&')
            .replace(/\u0000/g, '\\0'),
        '\", 1)'
    ].join('');
};

function strEscape(s) {
    return s.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

exports.runPhpCode = function(code) {
    code = Array.isArray(code) ? code : [code];
    code = ['<?php'].concat(code).join('\n');

    var php = spawn('php'),
        html = '',
        errs = '',
        defer = Vow.defer();

    php.stdout.on('data', function(data) {
        html += data.toString();
    });

    php.stderr.on('data', function(data) {
        errs += data.toString();
    });

    php.on('close', function(code) {
        if (errs || code !== 0) {
            errs = errs ? [errs] : [];
            code && errs.unshift('php process exited with code ' + code + '\\n');
        }
        defer.resolve(errs + html);
    });

    php.stdin.write(code);
    php.stdin.end();

    return defer.promise();
};
