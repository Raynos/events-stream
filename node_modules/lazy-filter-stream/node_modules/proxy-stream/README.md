# proxy-stream

Create a wrapped stream

## Example

```
var proxy = require("proxy-stream")
    , through = require("through-stream")

function map(stream, iterator) {
    return proxy(stream, write, read, stream.end, pipe)

    function write(chunk) {
        return stream.write(iterator(chunk))
    }

    function read(bytes) {
        var chunk = stream.read(bytes)
        return chunk === null ? null : iterator(chunk)
    }

    function pipe(dest) {
        var mapped = through(function write(chunk, buffer) {
            buffer.push(iterator(chunk))
        })
        mapped.pipe(dest)
        stream.pipe(mapped)
        return dest
    }
}
```

Proxy stream is used to create a new stream based on another stream. 

## Installation

`npm install proxy-stream`

## Contributors

 - Raynos

## MIT Licenced