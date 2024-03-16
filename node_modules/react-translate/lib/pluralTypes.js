"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var pluralTypes = {
  chinese: function chinese(n) {
    return 0;
  },
  german: function german(n) {
    return n !== 1 ? 1 : 0;
  },
  french: function french(n) {
    return n > 1 ? 1 : 0;
  },
  russian: function russian(n) {
    return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  },
  czech: function czech(n) {
    return n === 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2;
  },
  polish: function polish(n) {
    return n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
  },
  icelandic: function icelandic(n) {
    return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
  }
};

exports.default = pluralTypes;