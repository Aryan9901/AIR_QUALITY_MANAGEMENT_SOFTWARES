"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var REACT_ELEMENT = Symbol.for("react.element");

var EMPTY_ARRAY = [];

var isFlattenable = function isFlattenable(value) {
  var type = typeof value === "undefined" ? "undefined" : _typeof(value);
  return type === "string" || type === "number";
};

var flatten = function flatten(array) {
  if (array.every(isFlattenable)) {
    return array.join("");
  }
  return array;
};

var toTemplate = function toTemplate(string) {
  var expressionRE = /{{\w+}}/g;
  var match = string.match(expressionRE) || EMPTY_ARRAY;
  return [string.split(expressionRE)].concat(_toConsumableArray(match));
};

var normalizeValue = function normalizeValue(value, key) {
  if (value == null || typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  if (value.$$typeof === REACT_ELEMENT) {
    return _react2.default.cloneElement(value, { key: key });
  }
};

var render = function render(string, values) {
  var _toTemplate = toTemplate(string),
      _toTemplate2 = _toArray(_toTemplate),
      parts = _toTemplate2[0],
      expressions = _toTemplate2.slice(1);

  return flatten(parts.reduce(function (acc, item, index, array) {
    if (index === array.length - 1) {
      return [].concat(_toConsumableArray(acc), [item]);
    }
    var match = expressions[index] && expressions[index].match(/{{(\w+)}}/);
    var value = match != null ? values[match[1]] : null;
    return [].concat(_toConsumableArray(acc), [item, normalizeValue(value, index)]);
  }, []));
};

exports.default = render;