"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = translate;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function translate(displayName, shouldComponentUpdate) {
  var t = void 0;
  var previousLocale = null;
  return function (ChildComponent) {
    var Translator = function (_Component) {
      _inherits(Translator, _Component);

      function Translator(props, context) {
        _classCallCheck(this, Translator);

        var _this = _possibleConstructorReturn(this, (Translator.__proto__ || Object.getPrototypeOf(Translator)).call(this, props, context));

        _this.shouldComponentUpdate = shouldComponentUpdate;
        return _this;
      }

      _createClass(Translator, [{
        key: "render",
        value: function render() {
          var _context = this.context,
              translator = _context.translator,
              locale = _context.locale;

          if (locale !== previousLocale) {
            t = translator(displayName);
            previousLocale = locale;
          }
          return _react2.default.createElement(ChildComponent, _extends({}, this.props, { t: t }));
        }
      }]);

      return Translator;
    }(_react.Component);

    Translator.contextTypes = {
      translator: _propTypes2.default.func.isRequired,
      locale: _propTypes2.default.string.isRequired
    };

    return Translator;
  };
}