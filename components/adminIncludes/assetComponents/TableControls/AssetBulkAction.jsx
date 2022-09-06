"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var globalStateReducer_1 = require("@store_toolkit/clientReducers/globalStateReducer");
var router_1 = require("next/router");
var adminPanelPostsReducer_1 = require("@store_toolkit/adminReducers/adminPanelPostsReducer");
var _variables_1 = require("@_variables/_variables");
var hooks_1 = require("@store_toolkit/hooks");
var AssetBulkActionStyledDiv = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  select {\n    width: 150px;\n\n    .btn-navigation {\n      margin: 0 2px;\n    }\n  }\n"], ["\n  select {\n    width: 150px;\n\n    .btn-navigation {\n      margin: 0 2px;\n    }\n  }\n"])));
var AssetBulkAction = function (_a) {
    var selectedItems = _a.selectedItems, setSelectedItems = _a.setSelectedItems;
    var dispatch = (0, hooks_1.useAdminDispatch)();
    var _b = tslib_1.__read((0, react_1.useState)(''), 2), status = _b[0], setStatus = _b[1];
    var _c = (0, router_1.useRouter)(), push = _c.push, pathname = _c.pathname, query = _c.query;
    var reGetData = function () {
        (0, _variables_1.updateQueryGenerator)(query, push, pathname);
        // push({pathname: pathname, query: {...query}}).finally()
    };
    var onApplyHandler = function () {
        if ((selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.length) && status) {
            switch (query.assetsType) {
                case 'posts':
                    dispatch((0, adminPanelPostsReducer_1.fetchAdminPanelBulkActionPost)({ ids: selectedItems, status: status }));
                    setSelectedItems([]);
                    reGetData();
                    break;
                case 'metas':
                    dispatch((0, adminPanelPostsReducer_1.fetchAdminBulkActionMeta)({ type: 'metas', status: status, ids: selectedItems }));
                    reGetData();
                    //
                    // bulkAction('metas', status, selectedItems).then(() => {
                    //     setSelectedItems([])
                    //     reGetData()
                    // })
                    break;
                default:
                    break;
            }
        }
        else {
            dispatch((0, globalStateReducer_1.setAlert)({ message: 'No Item Or Status is Selected', type: 'warning', active: true }));
        }
    };
    return (<AssetBulkActionStyledDiv>
            <select className={'custom-select'} placeholder='Bulk Actions' value={status} onChange={function (e) { return setStatus(e.target.value); }}>
                <option value=''>Bulk Actions</option>
                {query.status !== 'published' ? <option value='published'>Published</option> : null}
                {query.status !== 'draft' ? <option value='draft'>Draft</option> : null}
                {query.status !== 'trash' ? <option value='trash'>Trash</option> : null}
                {query.status !== 'pending' ? <option value='pending'>Pending</option> : null}
                {query.status === 'trash' ? <option value='delete'>Delete</option> : null}
            </select>
            <button className={'btn btn-primary'} onClick={onApplyHandler}>Apply</button>
        </AssetBulkActionStyledDiv>);
};
exports.default = AssetBulkAction;
var templateObject_1;
//# sourceMappingURL=AssetBulkAction.jsx.map