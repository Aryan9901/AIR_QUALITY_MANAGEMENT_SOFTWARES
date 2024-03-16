"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.useTranslate = useTranslate;
exports.TranslatorProvider = TranslatorProvider;
exports.translate = translate;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createTranslator = require("./createTranslator");

var _createTranslator2 = _interopRequireDefault(_createTranslator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function translator(namespace) {
  return function (key) {
    return namespace + "." + key;
  };
}

var Context = (0, _react.createContext)({ translator: translator, locale: null });

function useTranslate(namespace) {
  var _useContext = (0, _react.useContext)(Context),
      translator = _useContext.translator,
      locale = _useContext.locale;

  var t = (0, _react.useMemo)(function () {
    return translator(namespace);
  }, [namespace, locale]);
  return t;
}

function TranslatorProvider(_ref) {
  var translations = _ref.translations,
      children = _ref.children;

  return _react2.default.createElement(
    Context.Provider,
    {
      value: {
        translator: (0, _createTranslator2.default)(translations),
        locale: translations.locale
      }
    },
    children
  );
}

function translate(displayName) {
  return function (Component) {
    return function ReactTranslateLegacy(props) {
      var t = useTranslate(displayName);
      return _react2.default.createElement(Component, _extends({}, props, { t: t }));
    };
  };
}