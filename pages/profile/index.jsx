"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerSideProps = void 0;
var tslib_1 = require("tslib");
var ProfileNavigation_1 = tslib_1.__importDefault(require("@components/includes/profilePageComponents/ProfileNavigation/ProfileNavigation"));
var ProfileImage_1 = tslib_1.__importDefault(require("@components/includes/profilePageComponents/ProfileImage/ProfileImage"));
var serverSideTranslations_1 = require("next-i18next/serverSideTranslations");
var styled_components_1 = tslib_1.__importDefault(require("styled-components"));
var link_1 = tslib_1.__importDefault(require("next/link"));
var react_redux_1 = require("react-redux");
var store_1 = require("@store_toolkit/store");
var AppLayout_1 = tslib_1.__importDefault(require("@components/layouts/AppLayout"));
var _getServerSideStaticPageData_1 = tslib_1.__importDefault(require("@store_toolkit/_storeVariables/_getServerSideStaticPageData"));
var SvgRenderer_1 = tslib_1.__importDefault(require("@components/global/commonComponents/SvgRenderer/SvgRenderer"));
var ProfileStyledMain = styled_components_1.default.main(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: flex-start;\n  color: var(--main-text-color);\n  grid-area: main !important;\n\n  .profile-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 10px 0;\n    border-bottom: .5px solid var(--main-text-color);\n  }\n\n  .profile-page-info {\n    width: 300px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n\n    .profile-page-info-edit-link {\n      color: var(--main-text-color);\n    }\n  }\n\n  .profile-username {\n\n  }\n\n  .profile-posts {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    margin: 20px 0;\n\n    .profile-no-posts {\n      border: .5px solid var(--main-text-color);\n      border-radius: 50%;\n      width: 150px;\n      height: 150px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n\n      svg {\n        color: var(--main-text-color);\n        width: 75px;\n        height: 75px;\n      }\n    }\n\n    .profile-no-posts-title {\n      color: var(--main-text-color);\n    }\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: flex-start;\n  color: var(--main-text-color);\n  grid-area: main !important;\n\n  .profile-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 10px 0;\n    border-bottom: .5px solid var(--main-text-color);\n  }\n\n  .profile-page-info {\n    width: 300px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n\n    .profile-page-info-edit-link {\n      color: var(--main-text-color);\n    }\n  }\n\n  .profile-username {\n\n  }\n\n  .profile-posts {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    margin: 20px 0;\n\n    .profile-no-posts {\n      border: .5px solid var(--main-text-color);\n      border-radius: 50%;\n      width: 150px;\n      height: 150px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n\n      svg {\n        color: var(--main-text-color);\n        width: 75px;\n        height: 75px;\n      }\n    }\n\n    .profile-no-posts-title {\n      color: var(--main-text-color);\n    }\n  }\n"])));
var Profile = function () {
    // @ts-ignore
    var userData = (0, react_redux_1.useSelector)(function (_a) {
        var user = _a.user;
        return user === null || user === void 0 ? void 0 : user.userData;
    });
    return (<ProfileStyledMain className='profile-page main'>
            <div className='profile-header'>
                <ProfileImage_1.default />
                <ProfileNavigation_1.default />
            </div>
            <div className='profile-page-info'>
                <p className='profile-username'>{(userData === null || userData === void 0 ? void 0 : userData.username) ? userData.username : ''}</p>
                <link_1.default href={'/profile/edit'}>
                    <a className='btn-secondary btn profile-page-info-edit-link'>
                        Edit
                    </a>
                </link_1.default>
            </div>

            <div className='profile-posts'>
                <div className='profile-no-posts'>

                    <SvgRenderer_1.default svgUrl={'/public/asset/images/icons/camera-solid.svg'} size={20} color={'var(--navigation-text-color, #ccc)'}/>
                </div>
                <h2 className='profile-no-posts-title'>No Post Yet </h2>
                <p className='profile-no-posts-title'> Coming Soon</p>
            </div>
        </ProfileStyledMain>);
};
exports.getServerSideProps = store_1.wrapper.getServerSideProps(function (store) { return function (context) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a;
    var _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0: 
            // @ts-ignore
            return [4 /*yield*/, (0, _getServerSideStaticPageData_1.default)(context, [
                    'profilePageRightSidebar',
                    'profilePageLeftSidebar',
                    'profilePage'
                ], {
                    page: 'profile',
                    setHeadData: true
                }, store)];
            case 1:
                // @ts-ignore
                _c.sent();
                _b = {};
                _a = [{}];
                return [4 /*yield*/, (0, serverSideTranslations_1.serverSideTranslations)(context.locale, ['common', 'customTranslation', 'profile'])];
            case 2: return [2 /*return*/, (_b.props = tslib_1.__assign.apply(void 0, _a.concat([(_c.sent())])),
                    _b)];
        }
    });
}); }; });
Profile.getLayout = function getLayout(page) {
    return (<AppLayout_1.default>
            {page}
        </AppLayout_1.default>);
};
exports.default = Profile;
var templateObject_1;
//# sourceMappingURL=index.jsx.map