var proxy = require("proxy-stream")

module.exports = map

function map(stream, iterator) {
    return proxy(stream, write, read, stream.end, [pipeWrite])

    function write(chunk) {
        return stream.write(iterator(chunk))
    }

    function read(bytes) {
        var chunk = stream.read(bytes)
        return chunk === null ? null : iterator(chunk)
    }

    function pipeWrite(chunk, buffer) {
        buffer.push(iterator(chunk))
    }
}