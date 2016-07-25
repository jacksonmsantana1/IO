import IO from './index.js';
import { expect } from 'chai';
import R from 'ramda';

let compose = R.compose;
let curry = R.curry;
let map = R.map;
let chain = R.chain;

describe('IO => ', () => {
  it('of() -> 1', () => {
    var io = IO.of('CU');
    
    expect(io.runIO()).to.be.equal('CU');
  });

  it('of() -> 2', () => {
    let fn = (str) => (str + 'ANUS');
    let fn2 = (str) => (str + '!!!');
    let io = IO.of('EU AMO MEU ');
    let ioio = io.map(fn).map(fn2);
    
    expect(ioio.runIO()).to.be.equal('EU AMO MEU ANUS!!!');
  });

  it('toString()', () => {
    let io = IO.of('CU');
    let ioio = IO.of(io);
    let ioioio = IO.of(ioio);
    
    expect(ioio.toString()).to.be.equal('IO(IO("CU"))');
    expect(ioioio.toString()).to.be.equal('IO(IO(IO("CU")))');
    expect(ioioio.runIO().runIO().runIO()).to.be.equal('CU');
  });

  it('map() -> 1', () => {
  });

  it('chain()', () => {
    let io = (str) => (IO.of(str));
    let fn = (str) => (IO.of(str + 'CU'));
    let fn1 = (str) => (IO.of(str + 'CU'));
    let fn2 = (str) => (IO.of(str + 'CU'));

    let impure = compose(map(map(map(fn2))), map(map(fn1)), map(fn), io);
    let impure2 = compose(IO.join, map(fn2), IO.join, map(fn1), IO.join, map(fn), io);
    let impure3 = compose(chain(fn2), chain(fn1), chain(fn), io);

    expect(impure('CU').runIO().runIO().runIO().runIO()).to.be.equal('CUCUCUCU');
    expect(impure2('CU').runIO()).to.be.equal('CUCUCUCU');
    expect(impure3('CU').runIO()).to.be.equal('CUCUCUCU');
  });

  it('ap()', () => {
    let signin = curry((x, y, z) => (x + y + z));
    let x = IO.of('A');
    let y = IO.of('N');
    let z = IO.of('US');

    let impure = IO.of(signin).ap(x).ap(y).ap(z);
    expect(impure.runIO()).to.be.equal('ANUS');
  });

});
