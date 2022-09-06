"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var link_1 = tslib_1.__importDefault(require("next/link"));
var convertVariableNameToName_1 = tslib_1.__importDefault(require("../../../../_variables/util/convertVariableNameToName"));
var router_1 = require("next/router");
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var AssetStatusNavigationStyledDiv = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  flex-wrap: wrap;\n  \n  .btn-navigation {\n    margin: 0 2px;\n  }\n"], ["\n  display: flex;\n  justify-content: flex-start;\n  align-items: center;\n  flex-wrap: wrap;\n  \n  .btn-navigation {\n    margin: 0 2px;\n  }\n"])));
var AssetStatusNavigation = function () {
    var _a = (0, router_1.useRouter)(), pathname = _a.pathname, query = _a.query;
    var postsStatus = ['all', 'draft', 'published', 'pending', 'trash', 'reported'];
    var renderStatus = postsStatus.map(function (type) {
        return (<link_1.default key={type} href={{ pathname: pathname, query: tslib_1.__assign(tslib_1.__assign({}, query), { status: type }) }}>
                <a className={'btn btn-navigation'}>
                    {(0, convertVariableNameToName_1.default)(type)}
                </a>
            </link_1.default>);
    });
    return (<AssetStatusNavigationStyledDiv className='asset-page-status-navigation'>
            {renderStatus}
        </AssetStatusNavigationStyledDiv>);
};
exports.default = AssetStatusNavigation;
var templateObject_1;
//# sourceMappingURL=AssetStatusNavigation.jsx.map