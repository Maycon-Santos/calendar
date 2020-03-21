"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.marksy = marksy;
exports["default"] = _default;

var _marked = _interopRequireDefault(require("marked"));

var _standalone = require("@babel/standalone");

var _createRenderer = _interopRequireWildcard(require("./createRenderer"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function marksy() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // eslint-disable-next-line no-param-reassign
  options.components = options.components || {};
  var tracker = {
    tree: null,
    elements: null,
    nextElementId: null,
    toc: null,
    currentId: []
  };
  var renderer = (0, _createRenderer["default"])(tracker, options, {
    html: function html(_html) {
      try {
        // eslint-disable-next-line no-plusplus
        var elementId = tracker.nextElementId++;

        var _transform = (0, _standalone.transform)(_html, {
          presets: ['react']
        }),
            code = _transform.code;

        var components = Object.keys(options.components).map(function (key) {
          return options.components[key];
        });
        var mockedReact = {
          createElement: function createElement(tag) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var componentProps = components.indexOf(tag) >= 0 ? Object.assign(props || {}, {
              // eslint-disable-next-line no-plusplus
              key: tracker.nextElementId++,
              context: tracker.context
            }) : Object.assign(props || {}, {
              // eslint-disable-next-line no-plusplus
              key: tracker.nextElementId++
            });

            for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              children[_key - 2] = arguments[_key];
            }

            return options.createElement(tag, componentProps, children);
          }
        };
        tracker.elements[elementId] = // eslint-disable-next-line no-new-func
        _construct(Function, ['React'].concat(_toConsumableArray(Object.keys(options.components)), ["return ".concat(code)])).apply(void 0, [mockedReact].concat(_toConsumableArray(components))) || null;
        tracker.tree.push(tracker.elements[elementId]);
        return "{{".concat(elementId, "}}");
      } catch (e) {//
      }

      return null;
    },
    code: function code(_code, language) {
      if (language === 'marksy') {
        return renderer.html(_code);
      }

      return (0, _createRenderer.codeRenderer)(tracker, options)(_code, language);
    }
  });
  return function compile(content) {
    var markedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    tracker.tree = [];
    tracker.elements = {};
    tracker.toc = [];
    tracker.nextElementId = 0;
    tracker.context = context;
    tracker.currentId = [];
    (0, _marked["default"])(content, Object.assign({
      renderer: renderer,
      smartypants: true,
      sanitize: false,
      smartLists: true
    }, markedOptions));
    return {
      tree: tracker.tree,
      toc: tracker.toc
    };
  };
}

function _default(options) {
  return marksy(options);
}
//# sourceMappingURL=jsx.js.map