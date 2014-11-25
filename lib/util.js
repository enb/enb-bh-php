
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
