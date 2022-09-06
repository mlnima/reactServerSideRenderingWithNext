"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var router_1 = require("next/router");
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var react_redux_1 = require("react-redux");
var AssetSizeStyledDiv = styled_components_1.default.select(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  width: 100px;\n"], ["\n  width: 100px;\n"])));
var AssetSize = function () {
    var _a = (0, router_1.useRouter)(), pathname = _a.pathname, query = _a.query, push = _a.push;
    var range = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 1000];
    var identity = (0, react_redux_1.useSelector)(function (_a) {
        var settings = _a.settings;
        return {
            identity: settings === null || settings === void 0 ? void 0 : settings.identity
        };
    }).identity;
    var onChangeHandler = function (e) {
        push({
            pathname: pathname,
            query: tslib_1.__assign(tslib_1.__assign({}, query), { size: e.target.value })
        }).finally();
    };
    return (
    //@ts-ignore
    <AssetSizeStyledDiv className={'custom-select'} defaultValue={(identity === null || identity === void 0 ? void 0 : identity.postsCountPerPage) || 20} onChange={function (e) { return onChangeHandler(e); }}>

            {range.map(function (unit) {
            return <option value={unit} key={unit}>{unit}</option>;
        })}
        </AssetSizeStyledDiv>);
};
exports.default = AssetSize;
var templateObject_1;
//# sourceMappingURL=AssetSize.jsx.map