"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _render = require("./render");

var _render2 = _interopRequireDefault(_render);

var _getPluralType = require("./getPluralType");

var _getPluralType2 = _interopRequireDefault(_getPluralType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTranslator = function createTranslator(keys) {
  var pluralType = (0, _getPluralType2.default)(keys.locale);
  return function (componentName) {
    if (!keys.hasOwnProperty(componentName)) {
      return function (key) {
        return componentName + "." + key;
      };
    }
    var componentKeys = keys[componentName];
    return function (key, params) {
      var translation = componentKeys[key];
      if (translation === undefined) {
        return componentName + "." + key;
      }
      if (Array.isArray(translation)) {
        // plural
        if (params != null && typeof params.n === "number") {
          translation = translation[pluralType(params.n)];
        } else {
          return (0, _render2.default)(translation.join("\n"), params);
        }
      }
      return (0, _render2.default)(translation, params);
    };
  };
};

exports.default = createTranslator;