'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var compose = _ramda2.default.compose;
var _toString = _ramda2.default.toString;

var IO = function () {
  function IO(fn) {
    _classCallCheck(this, IO);

    if (!(this instanceof IO)) {
      return new IO(fn);
    }

    this.effect = fn;
    return this;
  }

  _createClass(IO, [{
    key: 'map',
    value: function map(fn) {
      /*eslint no-underscore-dangle:0*/
      var _this = this;
      return new IO(compose(fn, _this.effect));
    }
  }, {
    key: 'chain',
    value: function chain(fn) {
      /*eslint no-underscore-dangle:0*/
      var _this = this;
      return new IO(function () {
        /*eslint prefer-spread:0 prefer-rest-params:0*/
        var next = fn(_this.effect.apply(_this, arguments));
        return next.effect.apply(next, arguments);
      });
    }
  }, {
    key: 'ap',
    value: function ap(thatIO) {
      /*eslint no-underscore-dangle:0*/
      var _this = this;
      return _this.chain(function (fn) {
        return thatIO.map(fn);
      });
    }
  }, {
    key: 'runIO',
    value: function runIO() {
      /*eslint prefer-spread:0 prefer-rest-params:0*/
      return this.effect.apply(this, arguments);
    }
  }, {
    key: 'join',
    value: function join() {
      /*eslint prefer-spread:0 prefer-rest-params:0*/
      return this.effect.apply(this, arguments);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return 'IO(' + _toString(this.effect()) + ')';
    }
  }], [{
    key: 'of',
    value: function of(fn) {
      return new IO(function () {
        return fn;
      });
    }
  }, {
    key: 'runIO',
    value: function runIO(io) {
      /*eslint prefer-spread:0 prefer-rest-params:0*/
      return io.runIO.apply(io, [].slice.call(arguments, 1));
    }
  }, {
    key: 'join',
    value: function join(io) {
      return io.effect();
    }
  }]);

  return IO;
}();

exports.default = IO;

//# sourceMappingURL=index.js.map