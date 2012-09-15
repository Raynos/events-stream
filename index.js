var from = require("read-stream")

module.exports = events

function events(elem, eventName, capture) {
    if (elem.addEventListener) {
        return DOMEvents(elem, eventName, capture)
    } else {
        return EEEvents(elem, eventName)
    }
}

function DOMEvents(elem, eventName, capture) {
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

function EEEvents(ee, eventName) {
    var buffer = []
        , stream = from(read, end, buffer)

    ee.on(eventName, addToBuffer)

    return stream

    function end() {
        ee.removeListener(eventName, addToBuffer)
        stream.emit("end")
    }

    function addToBuffer() {
        if (arguments.length === 1) {
            buffer.push(arguments[0])
        } else {
            buffer.push(toArray(arguments))
        }
        if (buffer.length === 1) {
            stream.emit("readable")
        }
    }
}

function read(bytes, buffer) {
    return buffer.shift()
}

function toArray(list) {
    var array = []
    for (var i = 0; i < list.length; i++) {
        array[i] = list[i]
    }
    return array
}