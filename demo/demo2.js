define (function (require) {

var codegrid = require('js/codegrid');

function test () {
    
    var grid = codegrid.CodeGrid();

    function call (lat, lng, id, next) {
        grid.getCode (lat, lng, function (err, code) {
            var msg;
            if (err) {
                msg = err;
            } else {
                msg =  "Calling getCode("+lat+","+lng+ ") returned: " + code;
            }
            document.getElementById(id).innerHTML = msg;
            if (next) next();
        });
    }
    test1 = function () {call(48,16, "test1", test2)};
    test2 = function () {call(48.7725, 16.6417, "test2", test3)};
    test3 = function () {call(48.7935, 16.6383, "test3")};
    test1();
}

test();

});
