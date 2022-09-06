"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var router_1 = require("next/router");
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var react_1 = tslib_1.__importDefault(require("react"));
var PostsTypesStyledDiv = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  p {\n    margin: 0 10px;\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  p {\n    margin: 0 10px;\n  }\n"])));
var PostsTypes = function () {
    var _a = (0, router_1.useRouter)(), push = _a.push, pathname = _a.pathname, query = _a.query;
    var onFormatChangeHandler = function (e) {
        push({
            pathname: pathname,
            query: tslib_1.__assign(tslib_1.__assign({}, query), { postType: e.target.value })
        }).finally();
    };
    return (<PostsTypesStyledDiv className='post-type asset-page-asset-type-selector'>
            <p>Post Type :</p>
            <select className={'custom-select'} onChange={function (e) { return onFormatChangeHandler(e); }} value={query === null || query === void 0 ? void 0 : query.postType}>
                <option value=''>Select</option>
                <option value='all'>All</option>
                <option value='standard'>Standard</option>
                <option value='video'>Video</option>
                <option value='product'>Product</option>
                <option value='food'>Food</option>
                <option value='article'>Article</option>
                <option value='learn'>Learn</option>
                <option value='promotion'>Promotion</option>
            </select>
        </PostsTypesStyledDiv>);
};
exports.default = PostsTypes;
var templateObject_1;
//# sourceMappingURL=PostsTypes.jsx.map