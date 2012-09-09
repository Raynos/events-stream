"use strict";

var Stream = require("stream")

to.end = defaultEnd

module.exports = to

function to(write, end) {
    if (Array.isArray(write)) {
        return to(writeArray, endArray)
    }

    var stream = new Stream()
        , ended = false

    end = end || defaultEnd

    stream.readable = false
    stream.writable = true

    stream.write = handleWrite
    stream.end = handleEnd

    return stream

    function writeArray(chunk) {
        write.push(chunk)
    }

    function endArray() {
        end.call(this)
        this.emit("end")
    }

    function handleWrite(chunk) {
        var result = write.call(stream, chunk)
        return result === false ? false : true
    }

    function handleEnd(chunk) {
        if (ended) {
            return
        }
        ended = true
        if (arguments.length) {
            stream.write(chunk)
        }
        this.writable = false
        end.call(stream)
    }
}

function defaultEnd() {
    this.emit("end")
}