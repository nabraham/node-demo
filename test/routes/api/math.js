var assert = require('assert')
  , math = require('../../../lib-cov/routes/api/math');

function mockRequest(n) {
    return {params: {'n' : n}};
}

function mockResponse(validator, done) {
    return { 
        send: function(r) {
            if (validator !== undefined) {
                validator(r);
            }

            if (done !== undefined) {
                done();
            }
        }
    };
}

describe('failure conditions', function() {
    it('should fail on non-positive integers', function() {
        var f = function() {
            math.fib_slow(mockRequest(0), mockResponse());
        };
        assert.throws(f, /fibbonacci defined/);
    });

    it('should fail on non-natural integers', function() {
        var f = function() {
            math.fib_slow(mockRequest('foo'), mockResponse());
        };
        assert.throws(f, /numeric argument/);
    });

    it('should fail on non-positive integers', function() {
        var f = function() {
            math.fib_fast(mockRequest(0), mockResponse());
        };
        assert.throws(f, /fibbonacci defined/);
    });

    it('should fail on non-natural integers', function() {
        var f = function() {
            math.fib_fast(mockRequest('foo'), mockResponse());
        };
        assert.throws(f, /numeric argument/);
    });
});

describe('regular use cases', function() {
    it('should return 144 for n=12 (slow)', function(done) {
        math.fib_slow(mockRequest(12), mockResponse(function(r) {
            assert.equal(r.result, 144);
        }, done));
    });

    it('should return 144 for n=12 (fast)', function(done) {
        math.fib_fast(mockRequest(12), mockResponse(function(r) {
            assert.equal(r.result, 144);
        }, done));
    });
});
