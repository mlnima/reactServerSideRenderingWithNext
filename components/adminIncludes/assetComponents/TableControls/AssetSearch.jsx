"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var router_1 = require("next/router");
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var StyledForm = styled_components_1.default.form(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  max-width: 300px;\n\n  .form-control-input {\n    width: 160px;\n  }\n\n  .btn-navigation {\n    margin: 0 2px;\n  }\n"], ["\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  max-width: 300px;\n\n  .form-control-input {\n    width: 160px;\n  }\n\n  .btn-navigation {\n    margin: 0 2px;\n  }\n"])));
var AssetSearch = function () {
    var _a = (0, router_1.useRouter)(), query = _a.query, pathname = _a.pathname, push = _a.push;
    var _b = tslib_1.__read((0, react_1.useState)(''), 2), keyword = _b[0], setKeyword = _b[1];
    var onSubmitHandler = function (e) {
        e.preventDefault();
        if (keyword) {
            var queryData = tslib_1.__assign(tslib_1.__assign({}, query), { keyword: keyword });
            // @ts-ignore
            delete queryData.page;
            // @ts-ignore
            delete queryData.metaId;
            push({
                pathname: pathname,
                query: queryData
            }).finally();
        }
    };
    var onDeleteKeywordHandler = function () {
        if (keyword) {
            setKeyword('');
            var resetQueries = query;
            delete resetQueries.keyword;
            delete resetQueries.metaId;
            delete resetQueries.page;
            push({
                pathname: pathname,
                query: resetQueries
            }).finally();
        }
    };
    return (<StyledForm className={'asset-page-search'} onSubmit={function (e) { return onSubmitHandler(e); }}>

            <input className={'form-control-input'} value={keyword} type={'text'} onChange={function (e) { return setKeyword(e.target.value); }}/>

            <button className={'btn btn-navigation'}>Search</button>

            {keyword ?
            <span className={'btn btn-navigation'} onClick={onDeleteKeywordHandler}>X</span>
            : null}

        </StyledForm>);
};
exports.default = AssetSearch;
var templateObject_1;
//# sourceMappingURL=AssetSearch.jsx.map