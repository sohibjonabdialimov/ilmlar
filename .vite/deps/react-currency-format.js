import {
  require_prop_types
} from "./chunk-QTX26RTD.js";
import {
  require_react
} from "./chunk-2PA4WPI3.js";
import {
  __commonJS
} from "./chunk-ROME4SDB.js";

// node_modules/react-currency-format/lib/utils.js
var require_utils = __commonJS({
  "node_modules/react-currency-format/lib/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.noop = noop;
    exports.returnTrue = returnTrue;
    exports.charIsNumber = charIsNumber;
    exports.escapeRegExp = escapeRegExp;
    exports.fixLeadingZero = fixLeadingZero;
    exports.splitString = splitString;
    exports.limitToScale = limitToScale;
    exports.roundToPrecision = roundToPrecision;
    exports.omit = omit;
    exports.setCaretPosition = setCaretPosition;
    function noop() {
    }
    function returnTrue() {
      return true;
    }
    function charIsNumber(char) {
      return !!(char || "").match(/\d/);
    }
    function escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    function fixLeadingZero(numStr) {
      if (!numStr)
        return numStr;
      var isNegative = numStr[0] === "-";
      if (isNegative)
        numStr = numStr.substring(1, numStr.length);
      var parts = numStr.split(".");
      var beforeDecimal = parts[0].replace(/^0+/, "") || "0";
      var afterDecimal = parts[1] || "";
      return (isNegative ? "-" : "") + beforeDecimal + (afterDecimal ? "." + afterDecimal : "");
    }
    function splitString(str, index) {
      return [str.substring(0, index), str.substring(index)];
    }
    function limitToScale(numStr, scale, fixedDecimalScale) {
      var str = "";
      var filler = fixedDecimalScale ? "0" : "";
      for (var i = 0; i <= scale - 1; i++) {
        str += numStr[i] || filler;
      }
      return str;
    }
    function roundToPrecision(numStr, scale, fixedDecimalScale) {
      var numberParts = numStr.split(".");
      var roundedDecimalParts = parseFloat("0." + (numberParts[1] || "0")).toFixed(scale).split(".");
      var intPart = numberParts[0].split("").reverse().reduce(function(roundedStr, current, idx) {
        if (roundedStr.length > idx) {
          return (Number(roundedStr[0]) + Number(current)).toString() + roundedStr.substring(1, roundedStr.length);
        }
        return current + roundedStr;
      }, roundedDecimalParts[0]);
      var decimalPart = limitToScale(roundedDecimalParts[1] || "", (numberParts[1] || "").length, fixedDecimalScale);
      return intPart + (decimalPart ? "." + decimalPart : "");
    }
    function omit(obj, keyMaps) {
      var filteredObj = {};
      Object.keys(obj).forEach(function(key) {
        if (!keyMaps[key])
          filteredObj[key] = obj[key];
      });
      return filteredObj;
    }
    function setCaretPosition(el, caretPos) {
      el.value = el.value;
      if (el !== null) {
        if (el.createTextRange) {
          var range = el.createTextRange();
          range.move("character", caretPos);
          range.select();
          return true;
        }
        if (el.selectionStart || el.selectionStart === 0) {
          el.focus();
          el.setSelectionRange(caretPos, caretPos);
          return true;
        }
        el.focus();
        return false;
      }
    }
    var thousandGroupSpacing = exports.thousandGroupSpacing = {
      two: "2",
      twoScaled: "2s",
      three: "3",
      four: "4"
    };
  }
});

// node_modules/react-currency-format/lib/currency-format.js
var require_currency_format = __commonJS({
  "node_modules/react-currency-format/lib/currency-format.js"(exports, module) {
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    var _utils = require_utils();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var propTypes = {
      thousandSeparator: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.oneOf([true])]),
      thousandSpacing: _propTypes2.default.oneOf(["2", "2s", "3", "4"]),
      decimalSeparator: _propTypes2.default.string,
      decimalScale: _propTypes2.default.number,
      fixedDecimalScale: _propTypes2.default.bool,
      displayType: _propTypes2.default.oneOf(["input", "text"]),
      prefix: _propTypes2.default.string,
      suffix: _propTypes2.default.string,
      format: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
      removeFormatting: _propTypes2.default.func,
      mask: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
      value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
      isNumericString: _propTypes2.default.bool,
      customInput: _propTypes2.default.func,
      allowNegative: _propTypes2.default.bool,
      onValueChange: _propTypes2.default.func,
      onKeyDown: _propTypes2.default.func,
      onMouseUp: _propTypes2.default.func,
      onChange: _propTypes2.default.func,
      onFocus: _propTypes2.default.func,
      onBlur: _propTypes2.default.func,
      type: _propTypes2.default.oneOf(["text", "tel"]),
      isAllowed: _propTypes2.default.func,
      renderText: _propTypes2.default.func
    };
    var defaultProps = {
      displayType: "input",
      decimalSeparator: ".",
      thousandSpacing: "3",
      fixedDecimalScale: false,
      prefix: "",
      suffix: "",
      allowNegative: true,
      isNumericString: false,
      type: "text",
      onValueChange: _utils.noop,
      onChange: _utils.noop,
      onKeyDown: _utils.noop,
      onMouseUp: _utils.noop,
      onFocus: _utils.noop,
      onBlur: _utils.noop,
      isAllowed: _utils.returnTrue
    };
    var CurrencyFormat = function(_React$Component) {
      _inherits(CurrencyFormat2, _React$Component);
      function CurrencyFormat2(props) {
        _classCallCheck(this, CurrencyFormat2);
        var _this = _possibleConstructorReturn(this, (CurrencyFormat2.__proto__ || Object.getPrototypeOf(CurrencyFormat2)).call(this, props));
        _this.validateProps();
        var formattedValue = _this.formatValueProp();
        _this.state = {
          value: formattedValue,
          numAsString: _this.removeFormatting(formattedValue)
        };
        _this.onChange = _this.onChange.bind(_this);
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.onMouseUp = _this.onMouseUp.bind(_this);
        _this.onFocus = _this.onFocus.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        return _this;
      }
      _createClass(CurrencyFormat2, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          this.updateValueIfRequired(prevProps);
        }
      }, {
        key: "updateValueIfRequired",
        value: function updateValueIfRequired(prevProps) {
          var props = this.props, state = this.state;
          if (prevProps !== props) {
            this.validateProps();
            var stateValue = state.value;
            var lastNumStr = state.numAsString || "";
            var formattedValue = props.value === void 0 ? this.formatNumString(lastNumStr) : this.formatValueProp();
            if (formattedValue !== stateValue) {
              this.setState({
                value: formattedValue,
                numAsString: this.removeFormatting(formattedValue)
              });
            }
          }
        }
        /** Misc methods **/
      }, {
        key: "getFloatString",
        value: function getFloatString() {
          var num = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var _getSeparators = this.getSeparators(), decimalSeparator = _getSeparators.decimalSeparator;
          var numRegex = this.getNumberRegex(true);
          var hasNegation = num[0] === "-";
          if (hasNegation)
            num = num.replace("-", "");
          num = (num.match(numRegex) || []).join("").replace(decimalSeparator, ".");
          var firstDecimalIndex = num.indexOf(".");
          if (firstDecimalIndex !== -1) {
            num = num.substring(0, firstDecimalIndex) + "." + num.substring(firstDecimalIndex + 1, num.length).replace(new RegExp((0, _utils.escapeRegExp)(decimalSeparator), "g"), "");
          }
          if (hasNegation)
            num = "-" + num;
          return num;
        }
        //returned regex assumes decimalSeparator is as per prop
      }, {
        key: "getNumberRegex",
        value: function getNumberRegex(g, ignoreDecimalSeparator) {
          var _props = this.props, format = _props.format, decimalScale = _props.decimalScale;
          var _getSeparators2 = this.getSeparators(), decimalSeparator = _getSeparators2.decimalSeparator;
          return new RegExp("\\d" + (decimalSeparator && decimalScale !== 0 && !ignoreDecimalSeparator && !format ? "|" + (0, _utils.escapeRegExp)(decimalSeparator) : ""), g ? "g" : void 0);
        }
      }, {
        key: "getSeparators",
        value: function getSeparators() {
          var _props2 = this.props, decimalSeparator = _props2.decimalSeparator, thousandSpacing = _props2.thousandSpacing;
          var thousandSeparator = this.props.thousandSeparator;
          if (thousandSeparator === true) {
            thousandSeparator = ",";
          }
          return {
            decimalSeparator,
            thousandSeparator,
            thousandSpacing
          };
        }
      }, {
        key: "getMaskAtIndex",
        value: function getMaskAtIndex(index) {
          var _props$mask = this.props.mask, mask = _props$mask === void 0 ? " " : _props$mask;
          if (typeof mask === "string") {
            return mask;
          }
          return mask[index] || " ";
        }
      }, {
        key: "validateProps",
        value: function validateProps() {
          var mask = this.props.mask;
          var _getSeparators3 = this.getSeparators(), decimalSeparator = _getSeparators3.decimalSeparator, thousandSeparator = _getSeparators3.thousandSeparator;
          if (decimalSeparator === thousandSeparator) {
            throw new Error("\n          Decimal separator can't be same as thousand separator.\n\n          thousandSeparator: " + thousandSeparator + ' (thousandSeparator = {true} is same as thousandSeparator = ",")\n          decimalSeparator: ' + decimalSeparator + " (default value for decimalSeparator is .)\n       ");
          }
          if (mask) {
            var maskAsStr = mask === "string" ? mask : mask.toString();
            if (maskAsStr.match(/\d/g)) {
              throw new Error("\n          Mask " + mask + " should not contain numeric character;\n        ");
            }
          }
        }
      }, {
        key: "splitDecimal",
        value: function splitDecimal(numStr) {
          var allowNegative = this.props.allowNegative;
          var hasNagation = numStr[0] === "-";
          var addNegation = hasNagation && allowNegative;
          numStr = numStr.replace("-", "");
          var parts = numStr.split(".");
          var beforeDecimal = parts[0];
          var afterDecimal = parts[1] || "";
          return {
            beforeDecimal,
            afterDecimal,
            hasNagation,
            addNegation
          };
        }
        /** Misc methods end **/
        /** caret specific methods **/
      }, {
        key: "setPatchedCaretPosition",
        value: function setPatchedCaretPosition(el, caretPos, currentValue) {
          (0, _utils.setCaretPosition)(el, caretPos);
          setTimeout(function() {
            if (el.value === currentValue)
              (0, _utils.setCaretPosition)(el, caretPos);
          }, 0);
        }
        /* This keeps the caret within typing area so people can't type in between prefix or suffix */
      }, {
        key: "correctCaretPosition",
        value: function correctCaretPosition(value, caretPos, direction) {
          var _props3 = this.props, prefix = _props3.prefix, suffix = _props3.suffix, format = _props3.format;
          if (!format) {
            var hasNegation = value[0] === "-";
            return Math.min(Math.max(caretPos, prefix.length + (hasNegation ? 1 : 0)), value.length - suffix.length);
          }
          if (typeof format === "function")
            return caretPos;
          if (format[caretPos] === "#" && (0, _utils.charIsNumber)(value[caretPos]))
            return caretPos;
          if (format[caretPos - 1] === "#" && (0, _utils.charIsNumber)(value[caretPos - 1]))
            return caretPos;
          var firstHashPosition = format.indexOf("#");
          var lastHashPosition = format.lastIndexOf("#");
          caretPos = Math.min(Math.max(caretPos, firstHashPosition), lastHashPosition + 1);
          var nextPos = format.substring(caretPos, format.length).indexOf("#");
          var caretLeftBound = caretPos;
          var caretRightBoud = caretPos + (nextPos === -1 ? 0 : nextPos);
          while (caretLeftBound > firstHashPosition && (format[caretLeftBound] !== "#" || !(0, _utils.charIsNumber)(value[caretLeftBound]))) {
            caretLeftBound -= 1;
          }
          var goToLeft = !(0, _utils.charIsNumber)(value[caretRightBoud]) || direction === "left" && caretPos !== firstHashPosition || caretPos - caretLeftBound < caretRightBoud - caretPos;
          return goToLeft ? caretLeftBound + 1 : caretRightBoud;
        }
      }, {
        key: "getCaretPosition",
        value: function getCaretPosition(inputValue, formattedValue, caretPos) {
          var format = this.props.format;
          var stateValue = this.state.value;
          var numRegex = this.getNumberRegex(true);
          var inputNumber = (inputValue.match(numRegex) || []).join("");
          var formattedNumber = (formattedValue.match(numRegex) || []).join("");
          var j = void 0, i = void 0;
          j = 0;
          for (i = 0; i < caretPos; i++) {
            var currentInputChar = inputValue[i] || "";
            var currentFormatChar = formattedValue[j] || "";
            if (!currentInputChar.match(numRegex) && currentInputChar !== currentFormatChar)
              continue;
            if (currentInputChar === "0" && currentFormatChar.match(numRegex) && currentFormatChar !== "0" && inputNumber.length !== formattedNumber.length)
              continue;
            while (currentInputChar !== formattedValue[j] && j < formattedValue.length) {
              j++;
            }
            j++;
          }
          if (typeof format === "string" && !stateValue) {
            j = formattedValue.length;
          }
          j = this.correctCaretPosition(formattedValue, j);
          return j;
        }
        /** caret specific methods ends **/
        /** methods to remove formattting **/
      }, {
        key: "removePrefixAndSuffix",
        value: function removePrefixAndSuffix(val) {
          var _props4 = this.props, format = _props4.format, prefix = _props4.prefix, suffix = _props4.suffix;
          if (!format && val) {
            var isNegative = val[0] === "-";
            if (isNegative)
              val = val.substring(1, val.length);
            val = prefix && val.indexOf(prefix) === 0 ? val.substring(prefix.length, val.length) : val;
            var suffixLastIndex = val.lastIndexOf(suffix);
            val = suffix && suffixLastIndex !== -1 && suffixLastIndex === val.length - suffix.length ? val.substring(0, suffixLastIndex) : val;
            if (isNegative)
              val = "-" + val;
          }
          return val;
        }
      }, {
        key: "removePatternFormatting",
        value: function removePatternFormatting(val) {
          var format = this.props.format;
          var formatArray = format.split("#").filter(function(str) {
            return str !== "";
          });
          var start = 0;
          var numStr = "";
          for (var i = 0, ln = formatArray.length; i <= ln; i++) {
            var part = formatArray[i] || "";
            var index = i === ln ? val.length : val.indexOf(part, start);
            if (index === -1) {
              numStr = val;
              break;
            } else {
              numStr += val.substring(start, index);
              start = index + part.length;
            }
          }
          return (numStr.match(/\d/g) || []).join("");
        }
      }, {
        key: "removeFormatting",
        value: function removeFormatting(val) {
          var _props5 = this.props, format = _props5.format, removeFormatting2 = _props5.removeFormatting;
          if (!val)
            return val;
          if (!format) {
            val = this.removePrefixAndSuffix(val);
            val = this.getFloatString(val);
          } else if (typeof format === "string") {
            val = this.removePatternFormatting(val);
          } else if (typeof removeFormatting2 === "function") {
            val = removeFormatting2(val);
          } else {
            val = (val.match(/\d/g) || []).join("");
          }
          return val;
        }
        /** methods to remove formattting end **/
        /*** format specific methods start ***/
        /**
         * Format when # based string is provided
         * @param  {string} numStr Numeric String
         * @return {string}        formatted Value
         */
      }, {
        key: "formatWithPattern",
        value: function formatWithPattern(numStr) {
          var format = this.props.format;
          var hashCount = 0;
          var formattedNumberAry = format.split("");
          for (var i = 0, ln = format.length; i < ln; i++) {
            if (format[i] === "#") {
              formattedNumberAry[i] = numStr[hashCount] || this.getMaskAtIndex(hashCount);
              hashCount += 1;
            }
          }
          return formattedNumberAry.join("");
        }
        /**
         * Format the given string according to thousand separator and thousand spacing
         * @param {*} beforeDecimal 
         * @param {*} thousandSeparator 
         * @param {*} thousandSpacing 
         */
      }, {
        key: "formatThousand",
        value: function formatThousand(beforeDecimal, thousandSeparator, thousandSpacing) {
          var digitalGroup = void 0;
          switch (thousandSpacing) {
            case _utils.thousandGroupSpacing.two:
              digitalGroup = /(\d)(?=(\d{2})+(?!\d))/g;
              break;
            case _utils.thousandGroupSpacing.twoScaled:
              digitalGroup = /(\d)(?=(((\d{2})+)(\d{1})(?!\d)))/g;
              break;
            case _utils.thousandGroupSpacing.four:
              digitalGroup = /(\d)(?=(\d{4})+(?!\d))/g;
              break;
            default:
              digitalGroup = /(\d)(?=(\d{3})+(?!\d))/g;
          }
          return beforeDecimal.replace(digitalGroup, "$1" + thousandSeparator);
        }
        /**
         * @param  {string} numStr Numeric string/floatString] It always have decimalSeparator as .
         * @return {string} formatted Value
         */
      }, {
        key: "formatAsNumber",
        value: function formatAsNumber(numStr) {
          var _props6 = this.props, decimalScale = _props6.decimalScale, fixedDecimalScale = _props6.fixedDecimalScale, prefix = _props6.prefix, suffix = _props6.suffix;
          var _getSeparators4 = this.getSeparators(), thousandSeparator = _getSeparators4.thousandSeparator, decimalSeparator = _getSeparators4.decimalSeparator, thousandSpacing = _getSeparators4.thousandSpacing;
          var hasDecimalSeparator = numStr.indexOf(".") !== -1 || decimalScale && fixedDecimalScale;
          var _splitDecimal = this.splitDecimal(numStr), beforeDecimal = _splitDecimal.beforeDecimal, afterDecimal = _splitDecimal.afterDecimal, addNegation = _splitDecimal.addNegation;
          if (decimalScale !== void 0)
            afterDecimal = (0, _utils.limitToScale)(afterDecimal, decimalScale, fixedDecimalScale);
          if (thousandSeparator) {
            beforeDecimal = this.formatThousand(beforeDecimal, thousandSeparator, thousandSpacing);
          }
          if (prefix)
            beforeDecimal = prefix + beforeDecimal;
          if (suffix)
            afterDecimal = afterDecimal + suffix;
          if (addNegation)
            beforeDecimal = "-" + beforeDecimal;
          numStr = beforeDecimal + (hasDecimalSeparator && decimalSeparator || "") + afterDecimal;
          return numStr;
        }
      }, {
        key: "formatNumString",
        value: function formatNumString() {
          var value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var format = this.props.format;
          var formattedValue = value;
          if (value === "") {
            formattedValue = "";
          } else if (value === "-" && !format) {
            formattedValue = "-";
            value = "";
          } else if (typeof format === "string") {
            formattedValue = this.formatWithPattern(formattedValue);
          } else if (typeof format === "function") {
            formattedValue = format(formattedValue);
          } else {
            formattedValue = this.formatAsNumber(formattedValue);
          }
          return formattedValue;
        }
      }, {
        key: "formatValueProp",
        value: function formatValueProp() {
          var _props7 = this.props, format = _props7.format, decimalScale = _props7.decimalScale, fixedDecimalScale = _props7.fixedDecimalScale;
          var _props8 = this.props, value = _props8.value, isNumericString = _props8.isNumericString;
          if (value === void 0)
            return "";
          if (typeof value === "number") {
            value = value.toString();
            isNumericString = true;
          }
          if (isNumericString && !format && typeof decimalScale === "number") {
            value = (0, _utils.roundToPrecision)(value, decimalScale, fixedDecimalScale);
          }
          var formattedValue = isNumericString ? this.formatNumString(value) : this.formatInput(value);
          return formattedValue;
        }
      }, {
        key: "formatNegation",
        value: function formatNegation() {
          var value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var allowNegative = this.props.allowNegative;
          var negationRegex = new RegExp("(-)");
          var doubleNegationRegex = new RegExp("(-)(.)*(-)");
          var hasNegation = negationRegex.test(value);
          var removeNegation = doubleNegationRegex.test(value);
          value = value.replace(/-/g, "");
          if (hasNegation && !removeNegation && allowNegative) {
            value = "-" + value;
          }
          return value;
        }
      }, {
        key: "formatInput",
        value: function formatInput() {
          var value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var format = this.props.format;
          if (!format) {
            value = this.formatNegation(value);
          }
          value = this.removeFormatting(value);
          return this.formatNumString(value);
        }
        /*** format specific methods end ***/
      }, {
        key: "isCharacterAFormat",
        value: function isCharacterAFormat(caretPos, value) {
          var _props9 = this.props, format = _props9.format, prefix = _props9.prefix, suffix = _props9.suffix, decimalScale = _props9.decimalScale, fixedDecimalScale = _props9.fixedDecimalScale;
          var _getSeparators5 = this.getSeparators(), decimalSeparator = _getSeparators5.decimalSeparator;
          if (typeof format === "string" && format[caretPos] !== "#")
            return true;
          if (!format && (caretPos < prefix.length || caretPos >= value.length - suffix.length || decimalScale && fixedDecimalScale && value[caretPos] === decimalSeparator)) {
            return true;
          }
          return false;
        }
      }, {
        key: "checkIfFormatGotDeleted",
        value: function checkIfFormatGotDeleted(start, end, value) {
          for (var i = start; i < end; i++) {
            if (this.isCharacterAFormat(i, value))
              return true;
          }
          return false;
        }
        /**
         * This will check if any formatting got removed by the delete or backspace and reset the value
         * It will also work as fallback if android chome keyDown handler does not work
         **/
      }, {
        key: "correctInputValue",
        value: function correctInputValue(caretPos, lastValue, value) {
          var format = this.props.format;
          var lastNumStr = this.state.numAsString || "";
          if (value.length >= lastValue.length || !value.length) {
            return value;
          }
          var start = caretPos;
          var lastValueParts = (0, _utils.splitString)(lastValue, caretPos);
          var newValueParts = (0, _utils.splitString)(value, caretPos);
          var deletedIndex = lastValueParts[1].lastIndexOf(newValueParts[1]);
          var diff = deletedIndex !== -1 ? lastValueParts[1].substring(0, deletedIndex) : "";
          var end = start + diff.length;
          if (this.checkIfFormatGotDeleted(start, end, lastValue)) {
            value = lastValue;
          }
          if (!format) {
            var numericString = this.removeFormatting(value);
            var _splitDecimal2 = this.splitDecimal(numericString), beforeDecimal = _splitDecimal2.beforeDecimal, afterDecimal = _splitDecimal2.afterDecimal, addNegation = _splitDecimal2.addNegation;
            if (numericString.length < lastNumStr.length && beforeDecimal === "" && !parseFloat(afterDecimal)) {
              return addNegation ? "-" : "";
            }
          }
          return value;
        }
      }, {
        key: "onChange",
        value: function onChange(e) {
          e.persist();
          var el = e.target;
          var inputValue = el.value;
          var state = this.state, props = this.props;
          var isAllowed = props.isAllowed;
          var lastValue = state.value || "";
          var currentCaretPosition = Math.max(el.selectionStart, el.selectionEnd);
          inputValue = this.correctInputValue(currentCaretPosition, lastValue, inputValue);
          var formattedValue = this.formatInput(inputValue) || "";
          var numAsString = this.removeFormatting(formattedValue);
          var valueObj = {
            formattedValue,
            value: numAsString,
            floatValue: parseFloat(numAsString)
          };
          if (!isAllowed(valueObj)) {
            formattedValue = lastValue;
          }
          el.value = formattedValue;
          var caretPos = this.getCaretPosition(inputValue, formattedValue, currentCaretPosition);
          this.setPatchedCaretPosition(el, caretPos, formattedValue);
          if (formattedValue !== lastValue) {
            this.setState({ value: formattedValue, numAsString }, function() {
              props.onValueChange(valueObj);
              props.onChange(e);
            });
          } else {
            props.onChange(e);
          }
        }
      }, {
        key: "onBlur",
        value: function onBlur(e) {
          var props = this.props, state = this.state;
          var format = props.format, onBlur2 = props.onBlur;
          var numAsString = state.numAsString;
          var lastValue = state.value;
          if (!format) {
            numAsString = (0, _utils.fixLeadingZero)(numAsString);
            var formattedValue = this.formatNumString(numAsString);
            var valueObj = {
              formattedValue,
              value: numAsString,
              floatValue: parseFloat(numAsString)
            };
            if (formattedValue !== lastValue) {
              e.persist();
              this.setState({ value: formattedValue, numAsString }, function() {
                props.onValueChange(valueObj);
                onBlur2(e);
              });
              return;
            }
          }
          onBlur2(e);
        }
      }, {
        key: "onKeyDown",
        value: function onKeyDown(e) {
          var el = e.target;
          var key = e.key;
          var selectionEnd = el.selectionEnd, value = el.value;
          var selectionStart = el.selectionStart;
          var expectedCaretPosition = void 0;
          var _props10 = this.props, decimalScale = _props10.decimalScale, fixedDecimalScale = _props10.fixedDecimalScale, prefix = _props10.prefix, suffix = _props10.suffix, format = _props10.format, onKeyDown2 = _props10.onKeyDown;
          var ignoreDecimalSeparator = decimalScale !== void 0 && fixedDecimalScale;
          var numRegex = this.getNumberRegex(false, ignoreDecimalSeparator);
          var negativeRegex = new RegExp("-");
          var isPatternFormat = typeof format === "string";
          if (key === "ArrowLeft" || key === "Backspace") {
            expectedCaretPosition = selectionStart - 1;
          } else if (key === "ArrowRight") {
            expectedCaretPosition = selectionStart + 1;
          } else if (key === "Delete") {
            expectedCaretPosition = selectionStart;
          }
          if (expectedCaretPosition === void 0 || selectionStart !== selectionEnd) {
            onKeyDown2(e);
            return;
          }
          var newCaretPosition = expectedCaretPosition;
          var leftBound = isPatternFormat ? format.indexOf("#") : prefix.length;
          var rightBound = isPatternFormat ? format.lastIndexOf("#") + 1 : value.length - suffix.length;
          if (key === "ArrowLeft" || key === "ArrowRight") {
            var direction = key === "ArrowLeft" ? "left" : "right";
            newCaretPosition = this.correctCaretPosition(value, expectedCaretPosition, direction);
          } else if (key === "Delete" && !numRegex.test(value[expectedCaretPosition]) && !negativeRegex.test(value[expectedCaretPosition])) {
            while (!numRegex.test(value[newCaretPosition]) && newCaretPosition < rightBound) {
              newCaretPosition++;
            }
          } else if (key === "Backspace" && !numRegex.test(value[expectedCaretPosition]) && !negativeRegex.test(value[expectedCaretPosition])) {
            while (!numRegex.test(value[newCaretPosition - 1]) && newCaretPosition > leftBound) {
              newCaretPosition--;
            }
            newCaretPosition = this.correctCaretPosition(value, newCaretPosition, "left");
          }
          if (newCaretPosition !== expectedCaretPosition || expectedCaretPosition < leftBound || expectedCaretPosition > rightBound) {
            e.preventDefault();
            this.setPatchedCaretPosition(el, newCaretPosition, value);
          }
          if (e.isUnitTestRun) {
            this.setPatchedCaretPosition(el, newCaretPosition, value);
          }
          this.props.onKeyDown(e);
        }
        /** required to handle the caret position when click anywhere within the input **/
      }, {
        key: "onMouseUp",
        value: function onMouseUp(e) {
          var el = e.target;
          var selectionStart = el.selectionStart, selectionEnd = el.selectionEnd, value = el.value;
          if (selectionStart === selectionEnd) {
            var caretPostion = this.correctCaretPosition(value, selectionStart);
            if (caretPostion !== selectionStart) {
              this.setPatchedCaretPosition(el, caretPostion, value);
            }
          }
          this.props.onMouseUp(e);
        }
      }, {
        key: "onFocus",
        value: function onFocus(e) {
          var _this2 = this;
          e.persist();
          setTimeout(function() {
            var el = e.target;
            var selectionStart = el.selectionStart, value = el.value;
            var caretPosition = _this2.correctCaretPosition(value, selectionStart);
            if (caretPosition !== selectionStart) {
              _this2.setPatchedCaretPosition(el, caretPosition, value);
            }
            _this2.props.onFocus(e);
          });
        }
      }, {
        key: "render",
        value: function render() {
          var _props11 = this.props, type = _props11.type, displayType = _props11.displayType, customInput = _props11.customInput, renderText = _props11.renderText;
          var value = this.state.value;
          var otherProps = (0, _utils.omit)(this.props, propTypes);
          var inputProps = _extends({}, otherProps, {
            type,
            value,
            onChange: this.onChange,
            onKeyDown: this.onKeyDown,
            onMouseUp: this.onMouseUp,
            onFocus: this.onFocus,
            onBlur: this.onBlur
          });
          if (displayType === "text") {
            return renderText ? renderText(value) || null : _react2.default.createElement(
              "span",
              otherProps,
              value
            );
          } else if (customInput) {
            var CustomInput = customInput;
            return _react2.default.createElement(CustomInput, inputProps);
          }
          return _react2.default.createElement("input", inputProps);
        }
      }]);
      return CurrencyFormat2;
    }(_react2.default.Component);
    CurrencyFormat.propTypes = propTypes;
    CurrencyFormat.defaultProps = defaultProps;
    module.exports = CurrencyFormat;
  }
});
export default require_currency_format();
//# sourceMappingURL=react-currency-format.js.map
