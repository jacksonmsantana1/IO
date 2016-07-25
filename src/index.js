import R from 'ramda';

const compose = R.compose;
const toString = R.toString;

class IO {

  constructor(fn) {
    if (!(this instanceof IO)) {
      return new IO(fn);
    }

    this.effect = fn;
    return this;
  }

  static of(fn) {
    return new IO(() => (fn));
  }

  static runIO(io) {
    /*eslint prefer-spread:0 prefer-rest-params:0*/
    return io.runIO.apply(io, [].slice.call(arguments, 1));
  }

  static join(io) {
    return io.effect();
  }

  map(fn) {
    /*eslint no-underscore-dangle:0*/
    const _this = this;
    return new IO(compose(fn, _this.effect));
  }

  chain(fn) {
    /*eslint no-underscore-dangle:0*/
    const _this = this;
    return new IO(function () {
      /*eslint prefer-spread:0 prefer-rest-params:0*/
      const next = fn(_this.effect.apply(_this, arguments));
      return next.effect.apply(next, arguments);
    });
  }

  ap(thatIO) {
    /*eslint no-underscore-dangle:0*/
    const _this = this;
    return _this.chain((fn) => (thatIO.map(fn)));
  }

  runIO() {
    /*eslint prefer-spread:0 prefer-rest-params:0*/
    return this.effect.apply(this, arguments);
  }

  join() {
    /*eslint prefer-spread:0 prefer-rest-params:0*/
    return this.effect.apply(this, arguments);
  }

  toString() {
    return `IO(${toString(this.effect())})`;
  }

}

export
default IO;
