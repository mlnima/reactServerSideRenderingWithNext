"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AssetStatusNavigation_1 = tslib_1.__importDefault(require("./AssetStatusNavigation"));
var AssetSearch_1 = tslib_1.__importDefault(require("./AssetSearch"));
var AssetPagination_1 = tslib_1.__importDefault(require("./AssetPagination"));
var AssetSize_1 = tslib_1.__importDefault(require("./AssetSize"));
var AssetBulkAction_1 = tslib_1.__importDefault(require("./AssetBulkAction"));
var PostsTypes_1 = tslib_1.__importDefault(require("./PostsTypes"));
var router_1 = require("next/router");
var PostsByMeta_1 = tslib_1.__importDefault(require("./PostsByMeta"));
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var TableControlsStyledDiv = styled_components_1.default.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  align-items: center;\n\n  * {\n    font-size: 12px;\n  }\n"], ["\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  align-items: center;\n\n  * {\n    font-size: 12px;\n  }\n"])));
var TableControls = function (_a) {
    var selectedItems = _a.selectedItems, setSelectedItems = _a.setSelectedItems, assetPageData = _a.assetPageData;
    var query = (0, router_1.useRouter)().query;
    return (<TableControlsStyledDiv className='asset-page-table-head'>
            <AssetStatusNavigation_1.default />
            <AssetSize_1.default />
            <AssetBulkAction_1.default selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
            {query.assetsType === 'posts' ? <PostsTypes_1.default /> : null}
            <AssetPagination_1.default assetPageData={assetPageData}/>
            <AssetSearch_1.default />
            {query.assetsType === 'posts' ? <PostsByMeta_1.default /> : null}
        </TableControlsStyledDiv>);
};
exports.default = TableControls;
var templateObject_1;
//# sourceMappingURL=TableControls.jsx.map