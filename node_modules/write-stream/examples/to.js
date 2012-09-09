var to = require("..")
    , Stream = require("readable-stream")

var buffer1 = []
var out1 = to(buffer1, function () {
    console.log("out", buffer1)
})

createInput().pipe(out1)

var buffer2 = []
var out2 = to(function write(chunk) {
    buffer2.push(chunk)
}, function end() {
    console.log("out", buffer2)
})

createInput().pipe(out2)

var buffer3 = []
var out3 = to(function write(chunk) {
    var stream = this
    buffer3.push(chunk)
    setTimeout(function () {
        stream.emit("drain")
    }, 500)
    return false
}, function end() {
    console.log("out", buffer3)
})

createInput().pipe(out3)

function createInput() {
    var s = new Stream()
        , count = 0

    s.read = function () {
        if (++count < 5) {
            return count
        } else {
            s.end()
        }
    }
    s.end = function () {
        s.emit("end")
    }

    return s
}