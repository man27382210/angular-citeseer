module.exports = function (string) {
    var j;
    try {
        j = JSON.parse(string);
    } catch (exp) {
        j = undefined;
        console.log('JSON parse error for string:\n' + string);
    }
    return j;
};
