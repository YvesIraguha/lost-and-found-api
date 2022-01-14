/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/graphql/dynamoConnector.js":
/*!****************************************!*\
  !*** ./src/graphql/dynamoConnector.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DynamoConnector)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n\n\nvar DynamoConnector = /*#__PURE__*/function () {\n  function DynamoConnector(config) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, DynamoConnector);\n\n    if (config == null) {\n      throw Error('Provide configurations');\n    }\n\n    this.tableName = config.tableName;\n    this.docClient = new aws_sdk__WEBPACK_IMPORTED_MODULE_3__.DynamoDB.DocumentClient(_objectSpread({}, config.options));\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(DynamoConnector, [{\n    key: \"query\",\n    value: function query(params) {\n      var queryParams = {\n        TableName: this.tableName,\n        KeyConditionExpression: '#keyName = :keyValue',\n        ExpressionAttributeNames: {\n          '#keyName': params.partitionKeyName\n        },\n        ExpressionAttributeValues: {\n          ':keyValue': params.partitionKeyValue\n        }\n      };\n      return this.docClient.query(queryParams).promise();\n    }\n  }, {\n    key: \"getItem\",\n    value: function getItem(id) {\n      var getParams = {\n        TableName: this.tableName,\n        Key: {\n          pk: 'item',\n          sk: id\n        }\n      };\n      return this.docClient.get(getParams).promise();\n    }\n  }, {\n    key: \"putItem\",\n    value: function putItem(params) {\n      var queryParams = {\n        TableName: this.tableName,\n        Item: params\n      };\n      return this.docClient.put(queryParams).promise();\n    }\n  }, {\n    key: \"deleteItem\",\n    value: function deleteItem(id) {\n      var params = {\n        TableName: this.tableName,\n        Key: {\n          pk: 'item',\n          sk: id\n        },\n        ReturnValues: 'ALL_OLD'\n      };\n      return this.docClient[\"delete\"](params).promise().then(function (response) {\n        return response.Attributes;\n      });\n    }\n  }]);\n\n  return DynamoConnector;\n}();\n\n\n\n//# sourceURL=webpack://lostandfound.api/./src/graphql/dynamoConnector.js?");

/***/ }),

/***/ "./src/graphql/index.js":
/*!******************************!*\
  !*** ./src/graphql/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handle\": () => (/* binding */ handle),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ \"apollo-server-lambda\");\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schema */ \"./src/graphql/schema.js\");\n/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolvers */ \"./src/graphql/resolvers.js\");\n/* harmony import */ var _dynamoConnector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dynamoConnector */ \"./src/graphql/dynamoConnector.js\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./model */ \"./src/graphql/model.js\");\n\n\n\n\n\nvar dynamoConnector = new _dynamoConnector__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n  tableName: process.env.SINGLE_TABLE_NAME,\n  options: {\n    region: process.env.SERVERLESS_REGION\n  }\n});\nvar handler = new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__.ApolloServer({\n  typeDefs: _schema__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  context: function context(_ref) {\n    var event = _ref.event,\n        _context = _ref.context;\n    return {\n      headers: event.headers,\n      event: event,\n      context: _context,\n      models: {\n        Items: new _model__WEBPACK_IMPORTED_MODULE_4__[\"default\"](dynamoConnector)\n      }\n    };\n  }\n}).createHandler({\n  cors: {\n    credentials: true,\n    origin: '*'\n  }\n});\nvar handle = function handle(event, context, cb) {\n  return handler(event, context, cb);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handle);\n\n//# sourceURL=webpack://lostandfound.api/./src/graphql/index.js?");

/***/ }),

/***/ "./src/graphql/model.js":
/*!******************************!*\
  !*** ./src/graphql/model.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"@babel/runtime/regenerator\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ \"@babel/runtime/helpers/asyncToGenerator\");\n/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"@babel/runtime/helpers/classCallCheck\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"@babel/runtime/helpers/createClass\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var uuidv4__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! uuidv4 */ \"uuidv4\");\n/* harmony import */ var uuidv4__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(uuidv4__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n\n\nvar Item = /*#__PURE__*/function () {\n  function Item(dynamoConnector) {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, Item);\n\n    this.dynamoConnector = dynamoConnector;\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(Item, [{\n    key: \"getAllItems\",\n    value: function () {\n      var _getAllItems = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {\n        var results;\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _context.next = 2;\n                return this.dynamoConnector.query({\n                  partitionKeyName: 'pk',\n                  partitionKeyValue: 'item'\n                });\n\n              case 2:\n                results = _context.sent;\n                return _context.abrupt(\"return\", results.Items);\n\n              case 4:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      function getAllItems() {\n        return _getAllItems.apply(this, arguments);\n      }\n\n      return getAllItems;\n    }()\n  }, {\n    key: \"getOneItem\",\n    value: function () {\n      var _getOneItem = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2(id) {\n        var results;\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n                _context2.next = 2;\n                return this.dynamoConnector.getItem(id);\n\n              case 2:\n                results = _context2.sent;\n                return _context2.abrupt(\"return\", results.Item);\n\n              case 4:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, this);\n      }));\n\n      function getOneItem(_x) {\n        return _getOneItem.apply(this, arguments);\n      }\n\n      return getOneItem;\n    }()\n  }, {\n    key: \"addItem\",\n    value: function () {\n      var _addItem = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee3(itemInput) {\n        var input, id, queryParams;\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee3$(_context3) {\n          while (1) {\n            switch (_context3.prev = _context3.next) {\n              case 0:\n                input = itemInput.input;\n                id = (0,uuidv4__WEBPACK_IMPORTED_MODULE_5__.uuid)();\n                queryParams = _objectSpread({\n                  pk: 'item',\n                  sk: id,\n                  updatedAt: new Date().toISOString()\n                }, input);\n                _context3.next = 5;\n                return this.dynamoConnector.putItem(queryParams);\n\n              case 5:\n                return _context3.abrupt(\"return\", queryParams);\n\n              case 6:\n              case \"end\":\n                return _context3.stop();\n            }\n          }\n        }, _callee3, this);\n      }));\n\n      function addItem(_x2) {\n        return _addItem.apply(this, arguments);\n      }\n\n      return addItem;\n    }()\n  }, {\n    key: \"updateItem\",\n    value: function () {\n      var _updateItem = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee4(id, input) {\n        var queryParams;\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee4$(_context4) {\n          while (1) {\n            switch (_context4.prev = _context4.next) {\n              case 0:\n                queryParams = _objectSpread({\n                  pk: 'item',\n                  sk: id,\n                  updatedAt: new Date().toISOString()\n                }, input);\n                _context4.next = 3;\n                return this.dynamoConnector.putItem(queryParams);\n\n              case 3:\n                return _context4.abrupt(\"return\", queryParams);\n\n              case 4:\n              case \"end\":\n                return _context4.stop();\n            }\n          }\n        }, _callee4, this);\n      }));\n\n      function updateItem(_x3, _x4) {\n        return _updateItem.apply(this, arguments);\n      }\n\n      return updateItem;\n    }()\n  }, {\n    key: \"deleteItem\",\n    value: function () {\n      var _deleteItem = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee5(id) {\n        var results;\n        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee5$(_context5) {\n          while (1) {\n            switch (_context5.prev = _context5.next) {\n              case 0:\n                _context5.next = 2;\n                return this.dynamoConnector.deleteItem(id);\n\n              case 2:\n                results = _context5.sent;\n                return _context5.abrupt(\"return\", results);\n\n              case 4:\n              case \"end\":\n                return _context5.stop();\n            }\n          }\n        }, _callee5, this);\n      }));\n\n      function deleteItem(_x5) {\n        return _deleteItem.apply(this, arguments);\n      }\n\n      return deleteItem;\n    }()\n  }]);\n\n  return Item;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Item);\n\n//# sourceURL=webpack://lostandfound.api/./src/graphql/model.js?");

/***/ }),

/***/ "./src/graphql/resolvers.js":
/*!**********************************!*\
  !*** ./src/graphql/resolvers.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar resolvers = {\n  Query: {\n    getAllItems: function getAllItems(_, args, ctx) {\n      return ctx.models.Items.getAllItems(args);\n    },\n    getItem: function getItem(_, _ref, ctx) {\n      var id = _ref.id;\n      return ctx.models.Items.getOneItem(id);\n    }\n  },\n  Mutation: {\n    addItem: function addItem(_, args, ctx) {\n      return ctx.models.Items.addItem(args);\n    },\n    updateItem: function updateItem(_, _ref2, ctx) {\n      var id = _ref2.id,\n          input = _ref2.input;\n      return (// eslint-disable-next-line implicit-arrow-linebreak\n        ctx.models.Items.updateItem(id, input)\n      );\n    },\n    deleteItem: function deleteItem(_, _ref3, ctx) {\n      var id = _ref3.id;\n      return ctx.models.Items.deleteItem(id);\n    }\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (resolvers);\n\n//# sourceURL=webpack://lostandfound.api/./src/graphql/resolvers.js?");

/***/ }),

/***/ "./src/graphql/schema.js":
/*!*******************************!*\
  !*** ./src/graphql/schema.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ \"@babel/runtime/helpers/taggedTemplateLiteral\");\n/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server-lambda */ \"apollo-server-lambda\");\n/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction _templateObject() {\n  var data = _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0___default()([\"\\n  type Item {\\n    name: String!\\n    itemId: String!\\n    location: Location!\\n    status: String!\\n    updatedAt: String!\\n    sk: String!\\n    reward: String\\n  }\\n\\n  type Location {\\n    sector: String\\n    district: String\\n    village: String\\n    cell: String\\n    province: String\\n    coordinates: Coordinates\\n  }\\n\\n  type Coordinates {\\n    longitude: String!\\n    latitude: String!\\n  }\\n\\n  input CoordinatesInput {\\n    longitude: String!\\n    latitude: String!\\n  }\\n\\n  input LocationInput {\\n    sector: String\\n    district: String\\n    village: String\\n    cell: String\\n    province: String\\n    coordinates: CoordinatesInput\\n  }\\n\\n  input AddItemInput {\\n    name: String!\\n    itemId: String!\\n    location: LocationInput!\\n    status: String!\\n    reward: String\\n  }\\n\\n  type Query {\\n    getAllItems(status: String!): [Item!]!\\n    getItem(id: String!): Item\\n  }\\n\\n  type Mutation {\\n    addItem(input: AddItemInput): Item!\\n    updateItem(id: String!, input: AddItemInput): Item!\\n    deleteItem(id: String!): Item\\n  }\\n\"]);\n\n  _templateObject = function _templateObject() {\n    return data;\n  };\n\n  return data;\n}\n\n\nvar typeDefs = (0,apollo_server_lambda__WEBPACK_IMPORTED_MODULE_1__.gql)(_templateObject());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (typeDefs);\n\n//# sourceURL=webpack://lostandfound.api/./src/graphql/schema.js?");

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "@babel/runtime/helpers/taggedTemplateLiteral":
/*!***************************************************************!*\
  !*** external "@babel/runtime/helpers/taggedTemplateLiteral" ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/helpers/taggedTemplateLiteral");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("apollo-server-lambda");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");

/***/ }),

/***/ "uuidv4":
/*!*************************!*\
  !*** external "uuidv4" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("uuidv4");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/graphql/index.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;