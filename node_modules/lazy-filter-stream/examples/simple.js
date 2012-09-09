var from = require("read-stream")
    , to = require("write-stream")
    , filter = require("..")
    , assert = require("assert")
    , list = []

// filter(stream, iterator)
var odds = filter(from([1,2,3,4,5]), function (value) {
    return value % 2
})

odds.pipe(to(list, function () {
    // the doubled states
    assert.deepEqual(list, [1, 3, 5])
    console.log("list", list)
}))