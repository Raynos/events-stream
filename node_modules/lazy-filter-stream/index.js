var proxy = require("proxy-stream")

module.exports = filter

function filter(stream, predicate) {
    return proxy(stream, write, read, stream.end, [pipeWrite])

    function write(chunk) {
        var keep = predicate(chunk)
        if (keep) {
            return stream.write(chunk)
        }
    }

    function read(bytes) {
        var chunk = stream.read(bytes)
        if (chunk === null) {
            return null
        }

        var keep = predicate(chunk)

        if (keep) {
            return chunk
        } else {
            return read(bytes)
        }
    }

    function pipeWrite(chunk, buffer) {
        var keep = predicate(chunk)

        if (keep) {
            buffer.push(chunk)
        }
    }
}