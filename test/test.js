//
// run this with nodejs 

var codegrid = require('..');
var grid = codegrid.CodeGrid ()

function test (lat, lng, expect) {
    var str = "getCode (" + 22.502 +", " + 114.0527 + ")";

    if (!expect) {
        str += " should have returned error";
    }
    
    cb = function (err, res) {
        console.info (str); 
        if (err) {
            console.info("  ERROR: Returned: " + err);
        } else {
            if (res === expect) {
                console.info("  Success: returned "+ res);
            } else {
                console.info("  Failure: returned "+ res + " instead of " +expect);
            }
        }
    };
    grid.getCode(lat, lng, cb);
}

test (22.502, 114.0527, "cn:hk");
test (20.895,115.252, "None");
test (69.8202, -140.8063, "us;ca");
test (1000, 1000, null);

