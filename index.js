var from = require("read-stream")

module.exports = events

function events(elem, eventName, capture) {
    if (capture === undefined) {
        capture = false
    }

    var buffer = []
        , stream = from(read, end, buffer)

    elem.addEventListener(eventName, addToBuffer, capture)

    return stream

    function end() {
        elem.removeEventListener(eventName, addToBuffer, capture)
        stream.emit("end")
    }

    function addToBuffer(event) {
        buffer.push(event)
        if (buffer.length === 1) {
            stream.emit("readable")
        }
    }
}

function read(bytes, buffer) {
    return buffer.shift()
}