"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_redux_1 = require("react-redux");
var lab_1 = require("@material-ui/lab");
var core_1 = require("@material-ui/core");
var errorActions_1 = require("../../redux/actions/errorActions");
var HighlightOff_1 = __importDefault(require("@material-ui/icons/HighlightOff"));
var ErrorToolbar = function () {
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = (0, react_redux_1.useSelector)(function (state) { return state.errorReducer; }), showError = _a.showError, message = _a.message, title = _a.title;
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: showError &&
            (0, jsx_runtime_1.jsxs)(lab_1.Alert, __assign({ severity: 'error', action: (0, jsx_runtime_1.jsx)(core_1.IconButton, __assign({ "aria-label": 'close', color: 'inherit', size: 'small', onClick: function () {
                        dispatch((0, errorActions_1.hideError)());
                    } }, { children: (0, jsx_runtime_1.jsx)(HighlightOff_1.default, {}, void 0) }), void 0) }, { children: [(0, jsx_runtime_1.jsx)(lab_1.AlertTitle, { children: title }, void 0), message] }), void 0) }, void 0));
};
exports.default = ErrorToolbar;
