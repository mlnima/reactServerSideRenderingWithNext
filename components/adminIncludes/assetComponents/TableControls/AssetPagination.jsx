"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var link_1 = tslib_1.__importDefault(require("next/link"));
var router_1 = require("next/router");
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var AssetPaginationStyledDiv = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n\n  label {\n    margin: 0 10px;\n  }\n\n  .btn-navigation {\n    margin: 0 2px;\n  }\n"], ["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n\n  label {\n    margin: 0 10px;\n  }\n\n  .btn-navigation {\n    margin: 0 2px;\n  }\n"])));
var AssetPagination = function (_a) {
    var assetPageData = _a.assetPageData;
    var manualPage = (0, react_1.useRef)(null);
    var _b = (0, router_1.useRouter)(), pathname = _b.pathname, push = _b.push, query = _b.query;
    var onManuallyPageChangeHandler = function () {
        push({ pathname: pathname, query: tslib_1.__assign(tslib_1.__assign({}, query), { page: manualPage.current.value }) }).finally();
    };
    return (<AssetPaginationStyledDiv className='asset-page-pagination'>
            <label>{assetPageData.totalCount}</label>

            <link_1.default href={{ pathname: pathname, query: tslib_1.__assign(tslib_1.__assign({}, query), { page: 1 }) }}>
                <a className='btn btn-navigation'>1 </a>
            </link_1.default>

            <link_1.default href={{
            pathname: pathname,
            query: tslib_1.__assign(tslib_1.__assign({}, query), { page: query.page ? parseInt(query.page) - 1 : 1 })
        }}>
                <a className='btn btn-navigation'>
                    {'<'}
                </a>
            </link_1.default>

            <input ref={manualPage} placeholder={query.page || '1'} type='number' className='form-control-input'/>

            <button className='btn btn-navigation' onClick={onManuallyPageChangeHandler}>
                Go
            </button>

            <link_1.default href={{
            pathname: pathname,
            query: tslib_1.__assign(tslib_1.__assign({}, query), { page: query.page ? parseInt(query.page) + 1 : 2 })
        }}>
                <a className='btn btn-navigation'>{'>'} </a>
            </link_1.default>

            <link_1.default href={{
            pathname: pathname,
            query: tslib_1.__assign(tslib_1.__assign({}, query), { page: Math.ceil(parseInt(assetPageData.totalCount) / parseInt(query.size || '30')) })
        }}>
                <a className='btn btn-navigation'>
                    {Math.ceil(parseInt(assetPageData.totalCount) / parseInt(query.size || '30'))}
                </a>
            </link_1.default>
        </AssetPaginationStyledDiv>);
};
exports.default = AssetPagination;
var templateObject_1;
//# sourceMappingURL=AssetPagination.jsx.map