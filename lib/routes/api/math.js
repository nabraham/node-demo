function fib_slow(n) {
    if (n < 1) {
        throw new Error('fibbonacci defined for >= 1');
    } else if (n <= 2) {
        return 1;
    } else {
        return fib_slow(n-1) + fib_slow(n-2);
    }
}

exports.fib_slow = function(req, res) {
    if (isNaN(parseInt(req.params.n))) {
        throw new Error('expected numeric argument');
    } else {
        res.send({result: fib_slow(req.params.n)});
    }
};

exports.fib_fast = function(req, res) {
    throw new Error('not yet implemented');
};
