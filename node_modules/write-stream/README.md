# write-stream

Base class for writable streams

## Example array

```
var to = require("write-stream")
    , array = []
    , stream = to(array, function end() {
        /* never called as process.stdin does not end */
    })

process.stdin.pipe(stream)

setInterval(function () {
    // peek at the buffered array of chunks from stdin every second
    console.log(array)
}, 1000)
```

## Example function

```
var to = require("write-stream")
    , stream = to(function write(chunk) {
        // chunks from stdin
    })

process.stdin.pipe(stream)
```

## Installation

`npm install write-stream`

## Contributors

 - Raynos

## MIT Licenced