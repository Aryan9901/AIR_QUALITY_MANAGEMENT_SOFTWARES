"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pluralTypes = require("./pluralTypes");

var _pluralTypes2 = _interopRequireDefault(_pluralTypes);

var _pluralMap = require("./pluralMap");

var _pluralMap2 = _interopRequireDefault(_pluralMap);

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPluralType = function getPluralType(locale) {
  (0, _invariant2.default)(typeof locale === "string", "react-translate: locale must be specified");
  (0, _invariant2.default)(_pluralMap2.default.hasOwnProperty(locale.slice(0, 2)), "react-translate: locale is not supported");
  return _pluralTypes2.default[_pluralMap2.default[locale.slice(0, 2)]];
};

exports.default = getPluralType;