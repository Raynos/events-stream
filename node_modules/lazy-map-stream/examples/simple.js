var from = require("read-stream")
    , to = require("write-stream")
    , map = require("..")
    , assert = require("assert")
    , list = []

// map(stream, iterator)
var doubles = map(from([1,2,3,4,5]), function (value) {
    return value * 2
})

doubles.pipe(to(list, function () {
    // the doubled states
    assert.deepEqual(list, [2, 4, 6, 8, 10])
    console.log("list", list)
}))