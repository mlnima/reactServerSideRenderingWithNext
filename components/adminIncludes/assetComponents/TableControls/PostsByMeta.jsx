"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = require("react");
var router_1 = require("next/router");
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var PostsByMetaStyledForm = styled_components_1.default.form(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  max-width: 300px;\n\n  p {\n    margin: 0 10px;\n  }\n\n  .form-control-input {\n    width: 160px;\n  }\n\n  .btn-navigation {\n    margin: 0 2px;\n  }\n"], ["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  max-width: 300px;\n\n  p {\n    margin: 0 10px;\n  }\n\n  .form-control-input {\n    width: 160px;\n  }\n\n  .btn-navigation {\n    margin: 0 2px;\n  }\n"])));
var PostsByMeta = function () {
    var _a = tslib_1.__read((0, react_1.useState)(''), 2), metaId = _a[0], setMetaId = _a[1];
    var _b = (0, router_1.useRouter)(), query = _b.query, pathname = _b.pathname, push = _b.push;
    var onSearchByMetaHandler = function (e) {
        var _a;
        e.preventDefault();
        if ((_a = metaId === null || metaId === void 0 ? void 0 : metaId.trim()) === null || _a === void 0 ? void 0 : _a.match(/^[0-9a-fA-F]{24}$/)) {
            var queryData = tslib_1.__assign(tslib_1.__assign({}, query), { metaId: metaId });
            // @ts-ignore
            delete queryData.page;
            // @ts-ignore
            delete queryData.keyword;
            push({
                pathname: pathname,
                query: queryData
            }).finally();
        }
    };
    var onDeleteMetaHandler = function () {
        if (metaId) {
            setMetaId('');
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
    (0, react_1.useEffect)(function () {
        if (query.metaId) {
            setMetaId(query.metaId);
        }
    }, [query]);
    return (<PostsByMetaStyledForm className='posts-by-meta' onSubmit={function (e) { return onSearchByMetaHandler(e); }}>
            <p>Meta:</p>

            <input className={'form-control-input'} type={'text'} onChange={function (e) { return setMetaId(e.target.value); }} value={metaId}/>

            <button className={'btn btn-navigation'}>Search</button>

            {metaId ? <span className={'btn btn-navigation'} onClick={onDeleteMetaHandler}>X</span> : null}

        </PostsByMetaStyledForm>);
};
exports.default = PostsByMeta;
var templateObject_1;
//# sourceMappingURL=PostsByMeta.jsx.map