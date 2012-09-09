var proxy = require("..")
    , through = require("through-stream")
    , input = through()
    , output = through(function (chunk) {
        console.log("chunk", chunk)
    })

map(input, function (chunk) {
    return chunk * 2
}).pipe(output)

input.write(2)
input.write(3)

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