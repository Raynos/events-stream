var through = require("through-stream")
    , reemit = require("re-emitter").reemit

module.exports = proxy

function proxy(stream, write, read, end, pipe) {
    var proxied = through(write, read, end)

    if (pipe) {
        proxied.pipe = handlePipe
    }

    proxied.writable = stream.writable
    proxied.readable = stream.readable

    reemit(stream, proxied, ["readable", "drain", "end"])

    return proxied

    function handlePipe(dest) {
        var intern = through.apply(null, pipe)
        intern.pipe(dest)
        stream.pipe(intern)
        return dest
    }
}