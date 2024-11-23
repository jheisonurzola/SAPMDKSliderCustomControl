/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/SliderCC/i18n/i18n.properties":
/*!*********************************************************!*\
  !*** ./build.definitions/SliderCC/i18n/i18n.properties ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/Application/AppUpdateFailure.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/Application/AppUpdateFailure.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/SliderCC/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/Application/AppUpdateSuccess.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/Application/AppUpdateSuccess.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/SliderCC/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/SliderCC/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/Application/ClientIsMultiUserMode.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/Application/ClientIsMultiUserMode.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/Application/GetClientSupportVersions.js":
/*!**********************************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/Application/GetClientSupportVersions.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/Application/GetClientVersion.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/Application/GetClientVersion.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/Application/OnWillUpdate.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/Application/OnWillUpdate.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/SliderCC/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/Application/ResetAppSettingsAndLogout.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/SliderCC/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/Logging/LogLevels.js":
/*!***************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/Logging/LogLevels.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/Logging/SetTraceCategories.js":
/*!************************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/Logging/SetTraceCategories.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/Logging/SetUserLogLevel.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/Logging/SetUserLogLevel.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/Logging/ToggleLogging.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/Logging/ToggleLogging.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/Logging/TraceCategories.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/Logging/TraceCategories.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/Logging/UserLogSetting.js":
/*!********************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/Logging/UserLogSetting.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/SliderCC/Rules/SetExtensionValue.js":
/*!***************************************************************!*\
  !*** ./build.definitions/SliderCC/Rules/SetExtensionValue.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetExtensionValue)
/* harmony export */ });
/**
* Describe this function...
* @param {IClientAPI} context
*/
function SetExtensionValue(context) {
    console.log("In SetExtensionValue");
    let srcValue = context.getValue();
    let targetCtrl = context.evaluateTargetPath("#Page:Main/#Control:MyExtensionControlName");
    targetCtrl.setValue(srcValue);
}


/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let slidercc_actions_application_appupdate_action = __webpack_require__(/*! ./SliderCC/Actions/Application/AppUpdate.action */ "./build.definitions/SliderCC/Actions/Application/AppUpdate.action")
let slidercc_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./SliderCC/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/SliderCC/Actions/Application/AppUpdateFailureMessage.action")
let slidercc_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./SliderCC/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/SliderCC/Actions/Application/AppUpdateProgressBanner.action")
let slidercc_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./SliderCC/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/SliderCC/Actions/Application/AppUpdateSuccessMessage.action")
let slidercc_actions_application_logout_action = __webpack_require__(/*! ./SliderCC/Actions/Application/Logout.action */ "./build.definitions/SliderCC/Actions/Application/Logout.action")
let slidercc_actions_application_navtoabout_action = __webpack_require__(/*! ./SliderCC/Actions/Application/NavToAbout.action */ "./build.definitions/SliderCC/Actions/Application/NavToAbout.action")
let slidercc_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./SliderCC/Actions/Application/NavToActivityLog.action */ "./build.definitions/SliderCC/Actions/Application/NavToActivityLog.action")
let slidercc_actions_application_navtosupport_action = __webpack_require__(/*! ./SliderCC/Actions/Application/NavToSupport.action */ "./build.definitions/SliderCC/Actions/Application/NavToSupport.action")
let slidercc_actions_application_onwillupdate_action = __webpack_require__(/*! ./SliderCC/Actions/Application/OnWillUpdate.action */ "./build.definitions/SliderCC/Actions/Application/OnWillUpdate.action")
let slidercc_actions_application_reset_action = __webpack_require__(/*! ./SliderCC/Actions/Application/Reset.action */ "./build.definitions/SliderCC/Actions/Application/Reset.action")
let slidercc_actions_application_resetmessage_action = __webpack_require__(/*! ./SliderCC/Actions/Application/ResetMessage.action */ "./build.definitions/SliderCC/Actions/Application/ResetMessage.action")
let slidercc_actions_application_usermenupopover_action = __webpack_require__(/*! ./SliderCC/Actions/Application/UserMenuPopover.action */ "./build.definitions/SliderCC/Actions/Application/UserMenuPopover.action")
let slidercc_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./SliderCC/Actions/CloseModalPage_Cancel.action */ "./build.definitions/SliderCC/Actions/CloseModalPage_Cancel.action")
let slidercc_actions_closemodalpage_complete_action = __webpack_require__(/*! ./SliderCC/Actions/CloseModalPage_Complete.action */ "./build.definitions/SliderCC/Actions/CloseModalPage_Complete.action")
let slidercc_actions_closepage_action = __webpack_require__(/*! ./SliderCC/Actions/ClosePage.action */ "./build.definitions/SliderCC/Actions/ClosePage.action")
let slidercc_actions_genericbannermessage_action = __webpack_require__(/*! ./SliderCC/Actions/GenericBannerMessage.action */ "./build.definitions/SliderCC/Actions/GenericBannerMessage.action")
let slidercc_actions_genericmessagebox_action = __webpack_require__(/*! ./SliderCC/Actions/GenericMessageBox.action */ "./build.definitions/SliderCC/Actions/GenericMessageBox.action")
let slidercc_actions_genericnavigation_action = __webpack_require__(/*! ./SliderCC/Actions/GenericNavigation.action */ "./build.definitions/SliderCC/Actions/GenericNavigation.action")
let slidercc_actions_generictoastmessage_action = __webpack_require__(/*! ./SliderCC/Actions/GenericToastMessage.action */ "./build.definitions/SliderCC/Actions/GenericToastMessage.action")
let slidercc_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./SliderCC/Actions/Logging/LogUploadFailure.action */ "./build.definitions/SliderCC/Actions/Logging/LogUploadFailure.action")
let slidercc_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./SliderCC/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/SliderCC/Actions/Logging/LogUploadSuccessful.action")
let slidercc_actions_logging_uploadlog_action = __webpack_require__(/*! ./SliderCC/Actions/Logging/UploadLog.action */ "./build.definitions/SliderCC/Actions/Logging/UploadLog.action")
let slidercc_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./SliderCC/Actions/Logging/UploadLogProgress.action */ "./build.definitions/SliderCC/Actions/Logging/UploadLogProgress.action")
let slidercc_actions_showmessage_action = __webpack_require__(/*! ./SliderCC/Actions/ShowMessage.action */ "./build.definitions/SliderCC/Actions/ShowMessage.action")
let slidercc_extensions_myslidermodule_controls_mysliderextension_ts = __webpack_require__(/*! ./SliderCC/Extensions/MySliderModule/controls/MySliderExtension.ts */ "./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderExtension.ts")
let slidercc_extensions_myslidermodule_controls_mysliderplugin_android_myslider_ts = __webpack_require__(/*! ./SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/android/MySlider.ts */ "./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/android/MySlider.ts")
let slidercc_extensions_myslidermodule_controls_mysliderplugin_ios_myslider_ts = __webpack_require__(/*! ./SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/ios/MySlider.ts */ "./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/ios/MySlider.ts")
let slidercc_extensions_myslidermodule_controls_mysliderplugin_myslider_ts = __webpack_require__(/*! ./SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/MySlider.ts */ "./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/MySlider.ts")
let slidercc_globals_application_appdefinition_version_global = __webpack_require__(/*! ./SliderCC/Globals/Application/AppDefinition_Version.global */ "./build.definitions/SliderCC/Globals/Application/AppDefinition_Version.global")
let slidercc_globals_application_applicationname_global = __webpack_require__(/*! ./SliderCC/Globals/Application/ApplicationName.global */ "./build.definitions/SliderCC/Globals/Application/ApplicationName.global")
let slidercc_globals_application_supportemail_global = __webpack_require__(/*! ./SliderCC/Globals/Application/SupportEmail.global */ "./build.definitions/SliderCC/Globals/Application/SupportEmail.global")
let slidercc_globals_application_supportphone_global = __webpack_require__(/*! ./SliderCC/Globals/Application/SupportPhone.global */ "./build.definitions/SliderCC/Globals/Application/SupportPhone.global")
let slidercc_i18n_i18n_properties = __webpack_require__(/*! ./SliderCC/i18n/i18n.properties */ "./build.definitions/SliderCC/i18n/i18n.properties")
let slidercc_images_slider_png = __webpack_require__(/*! ./SliderCC/Images/slider.png */ "./build.definitions/SliderCC/Images/slider.png")
let slidercc_jsconfig_json = __webpack_require__(/*! ./SliderCC/jsconfig.json */ "./build.definitions/SliderCC/jsconfig.json")
let slidercc_pages_application_about_page = __webpack_require__(/*! ./SliderCC/Pages/Application/About.page */ "./build.definitions/SliderCC/Pages/Application/About.page")
let slidercc_pages_application_support_page = __webpack_require__(/*! ./SliderCC/Pages/Application/Support.page */ "./build.definitions/SliderCC/Pages/Application/Support.page")
let slidercc_pages_application_useractivitylog_page = __webpack_require__(/*! ./SliderCC/Pages/Application/UserActivityLog.page */ "./build.definitions/SliderCC/Pages/Application/UserActivityLog.page")
let slidercc_pages_main_page = __webpack_require__(/*! ./SliderCC/Pages/Main.page */ "./build.definitions/SliderCC/Pages/Main.page")
let slidercc_rules_application_appupdatefailure_js = __webpack_require__(/*! ./SliderCC/Rules/Application/AppUpdateFailure.js */ "./build.definitions/SliderCC/Rules/Application/AppUpdateFailure.js")
let slidercc_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./SliderCC/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/SliderCC/Rules/Application/AppUpdateSuccess.js")
let slidercc_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./SliderCC/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/SliderCC/Rules/Application/ClientIsMultiUserMode.js")
let slidercc_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./SliderCC/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/SliderCC/Rules/Application/GetClientSupportVersions.js")
let slidercc_rules_application_getclientversion_js = __webpack_require__(/*! ./SliderCC/Rules/Application/GetClientVersion.js */ "./build.definitions/SliderCC/Rules/Application/GetClientVersion.js")
let slidercc_rules_application_onwillupdate_js = __webpack_require__(/*! ./SliderCC/Rules/Application/OnWillUpdate.js */ "./build.definitions/SliderCC/Rules/Application/OnWillUpdate.js")
let slidercc_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./SliderCC/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/SliderCC/Rules/Application/ResetAppSettingsAndLogout.js")
let slidercc_rules_logging_loglevels_js = __webpack_require__(/*! ./SliderCC/Rules/Logging/LogLevels.js */ "./build.definitions/SliderCC/Rules/Logging/LogLevels.js")
let slidercc_rules_logging_settracecategories_js = __webpack_require__(/*! ./SliderCC/Rules/Logging/SetTraceCategories.js */ "./build.definitions/SliderCC/Rules/Logging/SetTraceCategories.js")
let slidercc_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./SliderCC/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/SliderCC/Rules/Logging/SetUserLogLevel.js")
let slidercc_rules_logging_togglelogging_js = __webpack_require__(/*! ./SliderCC/Rules/Logging/ToggleLogging.js */ "./build.definitions/SliderCC/Rules/Logging/ToggleLogging.js")
let slidercc_rules_logging_tracecategories_js = __webpack_require__(/*! ./SliderCC/Rules/Logging/TraceCategories.js */ "./build.definitions/SliderCC/Rules/Logging/TraceCategories.js")
let slidercc_rules_logging_userlogsetting_js = __webpack_require__(/*! ./SliderCC/Rules/Logging/UserLogSetting.js */ "./build.definitions/SliderCC/Rules/Logging/UserLogSetting.js")
let slidercc_rules_setextensionvalue_js = __webpack_require__(/*! ./SliderCC/Rules/SetExtensionValue.js */ "./build.definitions/SliderCC/Rules/SetExtensionValue.js")
let slidercc_styles_styles_css = __webpack_require__(/*! ./SliderCC/Styles/Styles.css */ "./build.definitions/SliderCC/Styles/Styles.css")
let slidercc_styles_styles_less = __webpack_require__(/*! ./SliderCC/Styles/Styles.less */ "./build.definitions/SliderCC/Styles/Styles.less")
let slidercc_styles_styles_light_css = __webpack_require__(/*! ./SliderCC/Styles/Styles.light.css */ "./build.definitions/SliderCC/Styles/Styles.light.css")
let slidercc_styles_styles_light_json = __webpack_require__(/*! ./SliderCC/Styles/Styles.light.json */ "./build.definitions/SliderCC/Styles/Styles.light.json")
let slidercc_styles_styles_light_nss = __webpack_require__(/*! ./SliderCC/Styles/Styles.light.nss */ "./build.definitions/SliderCC/Styles/Styles.light.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	slidercc_actions_application_appupdate_action : slidercc_actions_application_appupdate_action,
	slidercc_actions_application_appupdatefailuremessage_action : slidercc_actions_application_appupdatefailuremessage_action,
	slidercc_actions_application_appupdateprogressbanner_action : slidercc_actions_application_appupdateprogressbanner_action,
	slidercc_actions_application_appupdatesuccessmessage_action : slidercc_actions_application_appupdatesuccessmessage_action,
	slidercc_actions_application_logout_action : slidercc_actions_application_logout_action,
	slidercc_actions_application_navtoabout_action : slidercc_actions_application_navtoabout_action,
	slidercc_actions_application_navtoactivitylog_action : slidercc_actions_application_navtoactivitylog_action,
	slidercc_actions_application_navtosupport_action : slidercc_actions_application_navtosupport_action,
	slidercc_actions_application_onwillupdate_action : slidercc_actions_application_onwillupdate_action,
	slidercc_actions_application_reset_action : slidercc_actions_application_reset_action,
	slidercc_actions_application_resetmessage_action : slidercc_actions_application_resetmessage_action,
	slidercc_actions_application_usermenupopover_action : slidercc_actions_application_usermenupopover_action,
	slidercc_actions_closemodalpage_cancel_action : slidercc_actions_closemodalpage_cancel_action,
	slidercc_actions_closemodalpage_complete_action : slidercc_actions_closemodalpage_complete_action,
	slidercc_actions_closepage_action : slidercc_actions_closepage_action,
	slidercc_actions_genericbannermessage_action : slidercc_actions_genericbannermessage_action,
	slidercc_actions_genericmessagebox_action : slidercc_actions_genericmessagebox_action,
	slidercc_actions_genericnavigation_action : slidercc_actions_genericnavigation_action,
	slidercc_actions_generictoastmessage_action : slidercc_actions_generictoastmessage_action,
	slidercc_actions_logging_loguploadfailure_action : slidercc_actions_logging_loguploadfailure_action,
	slidercc_actions_logging_loguploadsuccessful_action : slidercc_actions_logging_loguploadsuccessful_action,
	slidercc_actions_logging_uploadlog_action : slidercc_actions_logging_uploadlog_action,
	slidercc_actions_logging_uploadlogprogress_action : slidercc_actions_logging_uploadlogprogress_action,
	slidercc_actions_showmessage_action : slidercc_actions_showmessage_action,
	slidercc_extensions_myslidermodule_controls_mysliderextension_ts : slidercc_extensions_myslidermodule_controls_mysliderextension_ts,
	slidercc_extensions_myslidermodule_controls_mysliderplugin_android_myslider_ts : slidercc_extensions_myslidermodule_controls_mysliderplugin_android_myslider_ts,
	slidercc_extensions_myslidermodule_controls_mysliderplugin_ios_myslider_ts : slidercc_extensions_myslidermodule_controls_mysliderplugin_ios_myslider_ts,
	slidercc_extensions_myslidermodule_controls_mysliderplugin_myslider_ts : slidercc_extensions_myslidermodule_controls_mysliderplugin_myslider_ts,
	slidercc_globals_application_appdefinition_version_global : slidercc_globals_application_appdefinition_version_global,
	slidercc_globals_application_applicationname_global : slidercc_globals_application_applicationname_global,
	slidercc_globals_application_supportemail_global : slidercc_globals_application_supportemail_global,
	slidercc_globals_application_supportphone_global : slidercc_globals_application_supportphone_global,
	slidercc_i18n_i18n_properties : slidercc_i18n_i18n_properties,
	slidercc_images_slider_png : slidercc_images_slider_png,
	slidercc_jsconfig_json : slidercc_jsconfig_json,
	slidercc_pages_application_about_page : slidercc_pages_application_about_page,
	slidercc_pages_application_support_page : slidercc_pages_application_support_page,
	slidercc_pages_application_useractivitylog_page : slidercc_pages_application_useractivitylog_page,
	slidercc_pages_main_page : slidercc_pages_main_page,
	slidercc_rules_application_appupdatefailure_js : slidercc_rules_application_appupdatefailure_js,
	slidercc_rules_application_appupdatesuccess_js : slidercc_rules_application_appupdatesuccess_js,
	slidercc_rules_application_clientismultiusermode_js : slidercc_rules_application_clientismultiusermode_js,
	slidercc_rules_application_getclientsupportversions_js : slidercc_rules_application_getclientsupportversions_js,
	slidercc_rules_application_getclientversion_js : slidercc_rules_application_getclientversion_js,
	slidercc_rules_application_onwillupdate_js : slidercc_rules_application_onwillupdate_js,
	slidercc_rules_application_resetappsettingsandlogout_js : slidercc_rules_application_resetappsettingsandlogout_js,
	slidercc_rules_logging_loglevels_js : slidercc_rules_logging_loglevels_js,
	slidercc_rules_logging_settracecategories_js : slidercc_rules_logging_settracecategories_js,
	slidercc_rules_logging_setuserloglevel_js : slidercc_rules_logging_setuserloglevel_js,
	slidercc_rules_logging_togglelogging_js : slidercc_rules_logging_togglelogging_js,
	slidercc_rules_logging_tracecategories_js : slidercc_rules_logging_tracecategories_js,
	slidercc_rules_logging_userlogsetting_js : slidercc_rules_logging_userlogsetting_js,
	slidercc_rules_setextensionvalue_js : slidercc_rules_setextensionvalue_js,
	slidercc_styles_styles_css : slidercc_styles_styles_css,
	slidercc_styles_styles_less : slidercc_styles_styles_less,
	slidercc_styles_styles_light_css : slidercc_styles_styles_light_css,
	slidercc_styles_styles_light_json : slidercc_styles_styles_light_json,
	slidercc_styles_styles_light_nss : slidercc_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/SliderCC/Styles/Styles.css":
/*!******************************************************!*\
  !*** ./build.definitions/SliderCC/Styles/Styles.css ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, "",{"version":3,"sources":["webpack://./build.definitions/SliderCC/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/SliderCC/Styles/Styles.less":
/*!*******************************************************!*\
  !*** ./build.definitions/SliderCC/Styles/Styles.less ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, "",{"version":3,"sources":["webpack://./build.definitions/SliderCC/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/SliderCC/Styles/Styles.light.css":
/*!************************************************************!*\
  !*** ./build.definitions/SliderCC/Styles/Styles.light.css ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/SliderCC/Styles/Styles.light.nss":
/*!************************************************************!*\
  !*** ./build.definitions/SliderCC/Styles/Styles.light.nss ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/SliderCC/Pages/Application/About.page":
/*!*****************************************************************!*\
  !*** ./build.definitions/SliderCC/Pages/Application/About.page ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/SliderCC/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/SliderCC/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/SliderCC/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)"},{"Value":"/SliderCC/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SliderCC/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SliderCC/Pages/Application/Support.page":
/*!*******************************************************************!*\
  !*** ./build.definitions/SliderCC/Pages/Application/Support.page ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/SliderCC/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/SliderCC/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/SliderCC/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/SliderCC/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SliderCC/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/SliderCC/Pages/Application/UserActivityLog.page":
/*!***************************************************************************!*\
  !*** ./build.definitions/SliderCC/Pages/Application/UserActivityLog.page ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/SliderCC/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/SliderCC/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/SliderCC/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/SliderCC/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/SliderCC/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/SliderCC/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/SliderCC/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/SliderCC/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/SliderCC/Pages/Main.page":
/*!****************************************************!*\
  !*** ./build.definitions/SliderCC/Pages/Main.page ***!
  \****************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Controls":[{"_Type":"Control.Type.FormCell.Extension","_Name":"MyExtensionControlName","Module":"MySliderModule","Control":"MySliderExtension","Class":"MySliderClass","ExtensionProperties":{"MaxValue":200,"MinValue":10,"Title":"Counter"},"Height":72,"IsVisible":true,"Separator":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"FormCellSimpleProperty0","IsVisible":true,"Separator":true,"Caption":"Manual Entry","PlaceHolder":"Enter number to set the slider ext's value","OnValueChange":"/SliderCC/Rules/SetExtensionValue.js","Enabled":true,"IsEditable":true}],"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SliderCC/Actions/Application/UserMenuPopover.action"},{"_Name":"ActionBarItem1","Caption":"Item","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/SliderCC/Actions/ShowMessage.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"MainPage":"/SliderCC/Pages/Main.page","OnWillUpdate":"/SliderCC/Rules/Application/OnWillUpdate.js","Styles":"/SliderCC/Styles/Styles.css","Localization":"/SliderCC/i18n/i18n.properties","_Name":"SliderCC","_SchemaVersion":"24.7","StyleSheets":{"Styles":{"css":"/SliderCC/Styles/Styles.light.css","ios":"/SliderCC/Styles/Styles.light.nss","android":"/SliderCC/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/SliderCC/Styles/Styles.light.nss","android":"/SliderCC/Styles/Styles.light.json"}}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Application/AppUpdate.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Application/AppUpdate.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/SliderCC/Rules/Application/AppUpdateFailure.js","OnSuccess":"/SliderCC/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Application/AppUpdateFailureMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Application/AppUpdateFailureMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Application/AppUpdateProgressBanner.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Application/AppUpdateProgressBanner.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/SliderCC/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Application/AppUpdateSuccessMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Application/AppUpdateSuccessMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Application/Logout.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Application/Logout.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Application/NavToAbout.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Application/NavToAbout.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/SliderCC/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Application/NavToActivityLog.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Application/NavToActivityLog.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/SliderCC/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Application/NavToSupport.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Application/NavToSupport.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/SliderCC/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Application/OnWillUpdate.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Application/OnWillUpdate.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Application/Reset.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Application/Reset.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Application/ResetMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Application/ResetMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/SliderCC/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Application/UserMenuPopover.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Application/UserMenuPopover.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/SliderCC/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/SliderCC/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/SliderCC/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/SliderCC/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/SliderCC/Actions/Application/Logout.action","Title":"Logout","Visible":"/SliderCC/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/CloseModalPage_Cancel.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/CloseModalPage_Cancel.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/CloseModalPage_Complete.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/CloseModalPage_Complete.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/ClosePage.action":
/*!*************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/ClosePage.action ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/GenericBannerMessage.action":
/*!************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/GenericBannerMessage.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/GenericMessageBox.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/GenericMessageBox.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/GenericNavigation.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/GenericNavigation.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/SliderCC/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/GenericToastMessage.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/GenericToastMessage.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Logging/LogUploadFailure.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Logging/LogUploadFailure.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Logging/LogUploadSuccessful.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Logging/LogUploadSuccessful.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Logging/UploadLog.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Logging/UploadLog.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/SliderCC/Actions/Logging/LogUploadFailure.action","OnSuccess":"/SliderCC/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/Logging/UploadLogProgress.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/Logging/UploadLogProgress.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/SliderCC/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/SliderCC/Actions/ShowMessage.action":
/*!***************************************************************!*\
  !*** ./build.definitions/SliderCC/Actions/ShowMessage.action ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"ShowMessage"},"Message":"#Control:MyExtensionControlName/#Value","Title":"Value of the Slider is:","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/SliderCC/Globals/Application/AppDefinition_Version.global":
/*!*************************************************************************************!*\
  !*** ./build.definitions/SliderCC/Globals/Application/AppDefinition_Version.global ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/SliderCC/Globals/Application/ApplicationName.global":
/*!*******************************************************************************!*\
  !*** ./build.definitions/SliderCC/Globals/Application/ApplicationName.global ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/SliderCC/Globals/Application/SupportEmail.global":
/*!****************************************************************************!*\
  !*** ./build.definitions/SliderCC/Globals/Application/SupportEmail.global ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/SliderCC/Globals/Application/SupportPhone.global":
/*!****************************************************************************!*\
  !*** ./build.definitions/SliderCC/Globals/Application/SupportPhone.global ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderExtension.ts":
/*!********************************************************************************************!*\
  !*** ./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderExtension.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MySliderClass: () => (/* binding */ MySliderClass)
/* harmony export */ });
/* harmony import */ var mdk_core_controls_BaseControl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mdk-core/controls/BaseControl */ "webpack/sharing/consume/default/mdk-core/controls/BaseControl");
/* harmony import */ var mdk_core_controls_BaseControl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mdk_core_controls_BaseControl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MySliderPlugin_MySlider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MySliderPlugin/MySlider */ "./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/MySlider.ts");


class MySliderClass extends mdk_core_controls_BaseControl__WEBPACK_IMPORTED_MODULE_0__.BaseControl {
    constructor() {
        super(...arguments);
        this._minVal = 0;
        this._maxVal = 10000;
    }
    initialize(props) {
        super.initialize(props);
        this.createSlider();
        this.setView(this._slider.getView());
    }
    createSlider() {
        this._slider = new _MySliderPlugin_MySlider__WEBPACK_IMPORTED_MODULE_1__.MySlider(this.androidContext());
        this._slider.initNativeView();
        this._slider.setMinValue(this._minVal);
        this._slider.setMaxValue(this._maxVal);
        let extProps = this.definition().data.ExtensionProperties;
        if (extProps) {
            this.valueResolver().resolveValue(extProps.Title, this.context, true).then(function (title) {
                this._slider.setText(title);
            }.bind(this));
            this.valueResolver().resolveValue(extProps.MinValue, this.context, true).then(function (minVal) {
                if (minVal !== null && minVal !== undefined) {
                    this._minVal = minVal;
                    this._slider.setMinValue(this._minVal);
                }
            }.bind(this));
            this.valueResolver().resolveValue(extProps.MaxValue, this.context, true).then(function (maxVal) {
                if (maxVal !== null && maxVal !== undefined) {
                    this._maxVal = maxVal;
                    this._slider.setMaxValue(this._maxVal);
                }
            }.bind(this));
            this.valueResolver().resolveValue(extProps.Value, this.context, true).then(function (value) {
                this.setValue(value, false, false);
            }.bind(this));
        }
        this._slider.on("OnSliderValueChanged", function (eventData) {
            this.setValue(eventData.value, true, false);
        }.bind(this));
    }
    createObservable() {
        let extProps = this.definition().data.ExtensionProperties;
        if (extProps && extProps.OnValueChange) {
            this.definition().data.OnValueChange = extProps.OnValueChange;
        }
        return super.createObservable();
    }
    setValue(value, notify, isTextValue) {
        if (value != null && value != undefined && !isNaN(value)) {
            if (typeof value == "string" && value.trim() == "") {
                return Promise.reject("Error: Value is not a number");
            }
            let val = Number.parseInt(value);
            val = val < this._minVal ? this._minVal : val;
            val = val > this._maxVal ? this._maxVal : val;
            if (this._slider) {
                this._slider.setValue(val);
            }
            return this.observable().setValue(val, notify, isTextValue);
        }
        else if (isNaN(value)) {
            return Promise.reject("Error: Value is not a number");
        }
        return Promise.resolve();
    }
    viewIsNative() {
        return true;
    }
}


/***/ }),

/***/ "./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/MySlider.ts":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/MySlider.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MySlider: () => (/* binding */ MySlider)
/* harmony export */ });
/* harmony import */ var _nativescript_core_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nativescript/core/application */ "webpack/sharing/consume/default/@nativescript/core/application");
/* harmony import */ var _nativescript_core_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nativescript_core_application__WEBPACK_IMPORTED_MODULE_0__);

let MySlider;
let MySliderModule;
if (!MySlider) {
    if (_nativescript_core_application__WEBPACK_IMPORTED_MODULE_0__.ios) {
        MySliderModule = __webpack_require__(/*! ./ios/MySlider */ "./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/ios/MySlider.ts");
    }
    else {
        MySliderModule = __webpack_require__(/*! ./android/MySlider */ "./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/android/MySlider.ts");
    }
    MySlider = MySliderModule.GetMySliderClass();
}


/***/ }),

/***/ "./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/android/MySlider.ts":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/android/MySlider.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GetMySliderClass: () => (/* binding */ GetMySliderClass)
/* harmony export */ });
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nativescript/core */ "webpack/sharing/consume/default/@nativescript/core");
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nativescript_core__WEBPACK_IMPORTED_MODULE_0__);

function GetMySliderClass() {
    function getPadding() {
        return _nativescript_core__WEBPACK_IMPORTED_MODULE_0__.Device.deviceType === 'Tablet' ? 24 : 16;
    }
    class MySlider extends _nativescript_core__WEBPACK_IMPORTED_MODULE_0__.View {
        updateText() {
            this._label.setText(this._labelText + "(" + this._value + ")");
        }
        constructor(context) {
            super();
            this._labelText = "";
            this._value = 0;
            this._min = 0;
            this._androidcontext = context;
            this.createNativeView();
        }
        createNativeView() {
            this._label = new android.widget.TextView(this._androidcontext);
            const labelBottomPaddingInPx = _nativescript_core__WEBPACK_IMPORTED_MODULE_0__.Utils.layout.round(_nativescript_core__WEBPACK_IMPORTED_MODULE_0__.Utils.layout.toDevicePixels(8));
            this._label.setPadding(0, 0, 0, labelBottomPaddingInPx);
            this._label.setLayoutParams(new android.view.ViewGroup.LayoutParams(-1, -2));
            this._seekbar = new android.widget.SeekBar(this._androidcontext);
            this._seekbar.setLayoutParams(new android.view.ViewGroup.LayoutParams(-1, -2));
            this._layout = new android.widget.LinearLayout(this._androidcontext);
            this._layout.setOrientation(android.widget.LinearLayout.VERTICAL);
            this._layout.setLayoutParams(new android.view.ViewGroup.LayoutParams(-1, -1));
            const hortPaddingInPx = _nativescript_core__WEBPACK_IMPORTED_MODULE_0__.Utils.layout.round(_nativescript_core__WEBPACK_IMPORTED_MODULE_0__.Utils.layout.toDevicePixels(getPadding()));
            const vertPaddingInPx = _nativescript_core__WEBPACK_IMPORTED_MODULE_0__.Utils.layout.round(_nativescript_core__WEBPACK_IMPORTED_MODULE_0__.Utils.layout.toDevicePixels(16));
            this._layout.setPadding(hortPaddingInPx, vertPaddingInPx, hortPaddingInPx, vertPaddingInPx);
            this._layout.addView(this._label);
            this._layout.addView(this._seekbar);
            this.setNativeView(this._layout);
            return this._layout;
        }
        initNativeView() {
            console.log("initNativeView called");
            this._seekbar.owner = this;
            this._layout.owner = this;
            super.initNativeView();
            this._seekbar.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
                onStartTrackingTouch(seekBar) {
                },
                onStopTrackingTouch(seekBar) {
                    var eventData = {
                        eventName: "OnSliderValueChanged",
                        object: seekBar.owner,
                        value: seekBar.owner._value
                    };
                    seekBar.owner.notify(eventData);
                },
                onProgressChanged(seekBar, progress, fromUser) {
                    seekBar.owner._value = progress;
                    seekBar.owner.updateText();
                }
            }));
        }
        disposeNativeView() {
            this._seekbar.owner = null;
            this._layout.owner = null;
        }
        getView() {
            return this._layout;
        }
        setText(newText) {
            if (newText != null && newText != undefined) {
                this._labelText = newText;
                this._label.setText(newText);
            }
        }
        setValue(newVal) {
            if (newVal != null && newVal != undefined) {
                this._value = newVal;
                this.updateText();
                if (this._seekbar.getProgress() < this._min) {
                    this._seekbar.setProgress(this._min);
                }
                else {
                    this._seekbar.setProgress(newVal);
                }
            }
        }
        setMinValue(newMin) {
            if (newMin != null && newMin != undefined) {
                if (_nativescript_core__WEBPACK_IMPORTED_MODULE_0__.Device.sdkVersion >= 26) {
                    this._seekbar.setMin(newMin);
                }
                else {
                    this._min = newMin;
                    if (this._seekbar.getProgress() < this._min) {
                        this._seekbar.setProgress(this._min);
                    }
                }
            }
        }
        setMaxValue(newMax) {
            if (newMax != null && newMax != undefined) {
                this._seekbar.setMax(newMax);
            }
        }
    }
    return MySlider;
}


/***/ }),

/***/ "./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/ios/MySlider.ts":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/SliderCC/Extensions/MySliderModule/controls/MySliderPlugin/ios/MySlider.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GetMySliderClass: () => (/* binding */ GetMySliderClass)
/* harmony export */ });
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nativescript/core */ "webpack/sharing/consume/default/@nativescript/core");
/* harmony import */ var _nativescript_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nativescript_core__WEBPACK_IMPORTED_MODULE_0__);

function GetMySliderClass() {
    var SliderHandler = /** @class */ (function (_super) {
    __extends(SliderHandler, _super);
    function SliderHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //This handler function will be called whenever the slider's value is changed
    // i.e. whenever user drag the slider's handle
    SliderHandler.prototype.valueChanged = function (nativeSlider, nativeEvent) {
        nativeSlider.value = Math.round(nativeSlider.value);
        var owner = nativeSlider.owner;
        if (owner) {
            owner.setValue(nativeSlider.value);
        }
    };
    //This handler function will be called when user let go of the handle
    // This is where you will trigger an event called "OnSliderValueChanged" to the MDK Extension Class
    SliderHandler.prototype.afterValueChanged = function (nativeSlider, nativeEvent) {
        nativeSlider.value = Math.round(nativeSlider.value);
        var owner = nativeSlider.owner;
        if (owner) {
            owner.setValue(nativeSlider.value);
            var eventData = {
                eventName: "OnSliderValueChanged",
                object: owner,
                value: nativeSlider.value
            };
            owner.notify(eventData);
        }
    };
    SliderHandler.ObjCExposedMethods = {
        "valueChanged": { returns: interop.types.void, params: [interop.types.id, interop.types.id] },
        "afterValueChanged": { returns: interop.types.void, params: [interop.types.id, interop.types.id] }
    };
    return SliderHandler;
}(NSObject));
    const handler = SliderHandler.new();
    class MySlider extends _nativescript_core__WEBPACK_IMPORTED_MODULE_0__.View {
        updateText() {
            this._label.text = this._labelText + "(" + this._value + ")";
        }
        constructor(context) {
            super();
            this._labelText = "";
            this._value = 0;
            this.createNativeView();
        }
        createNativeView() {
            this._layout = UIStackView.new();
            this._layout.autoresizingMask = [UIViewAutoresizing.FlexibleHeight, UIViewAutoresizing.FlexibleWidth];
            this._layout.layoutMarginsRelativeArrangement = true;
            let inset = new NSDirectionalEdgeInsets();
            inset.top = 8;
            inset.leading = 16;
            inset.bottom = 8;
            inset.trailing = 16;
            this._layout.directionalLayoutMargins = inset;
            this._layout.axis = UILayoutConstraintAxis.Vertical;
            this._label = UILabel.new();
            this._label.font = this._label.font.fontWithSize(15);
            this._label.textColor = UIColor.colorWithRedGreenBlueAlpha(106 / 255, 109 / 255, 112 / 255, 1.0);
            this._layout.setCustomSpacingAfterView(4, this._label);
            this._slider = UISlider.new();
            this._slider.addTargetActionForControlEvents(handler, "valueChanged", UIControlEvents.ValueChanged);
            this._slider.addTargetActionForControlEvents(handler, "afterValueChanged", UIControlEvents.TouchUpInside | UIControlEvents.TouchUpOutside);
            this._layout.addArrangedSubview(this._label);
            this._layout.addArrangedSubview(this._slider);
            this.setNativeView(this._layout);
            return this._layout;
        }
        initNativeView() {
            this._slider.owner = this;
            this._layout.owner = this;
            super.initNativeView();
        }
        disposeNativeView() {
            this._slider.owner = null;
            this._layout.owner = null;
        }
        getView() {
            return this._layout;
        }
        setText(newText) {
            if (newText != null && newText != undefined) {
                this._labelText = newText;
                this._label.text = newText;
            }
        }
        setValue(newVal) {
            if (newVal != null && newVal != undefined) {
                this._value = newVal;
                this.updateText();
                this._slider.value = newVal;
            }
        }
        setMinValue(newMin) {
            if (newMin != null && newMin != undefined) {
                this._slider.minimumValue = newMin;
            }
        }
        setMaxValue(newMax) {
            if (newMax != null && newMax != undefined) {
                this._slider.maximumValue = newMax;
            }
        }
    }
    return MySlider;
}


/***/ }),

/***/ "./build.definitions/SliderCC/Images/slider.png":
/*!******************************************************!*\
  !*** ./build.definitions/SliderCC/Images/slider.png ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "webpack/container/entry/bundle.js":
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var moduleMap = {
	".": () => {
		return Promise.resolve().then(() => (() => ((__webpack_require__(/*! ./build.definitions/application-index.js */ "./build.definitions/application-index.js")))));
	}
};
var get = (module, getScope) => {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(() => {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = (shareScope, initScope) => {
	if (!__webpack_require__.S) return;
	var name = "default"
	var oldScope = __webpack_require__.S[name];
	if(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
	__webpack_require__.S[name] = shareScope;
	return __webpack_require__.I(name, initScope);
};

// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: () => (get),
	init: () => (init)
});

/***/ }),

/***/ "./build.definitions/SliderCC/Styles/Styles.light.json":
/*!*************************************************************!*\
  !*** ./build.definitions/SliderCC/Styles/Styles.light.json ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/SliderCC/jsconfig.json":
/*!**************************************************!*\
  !*** ./build.definitions/SliderCC/jsconfig.json ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"module":"esnext","target":"es2019","moduleResolution":"node","lib":["esnext","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/sharing */
/******/ 	(() => {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = (name, initScope) => {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = (msg) => {
/******/ 				if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 			};
/******/ 			var uniqueName = undefined;
/******/ 			var register = (name, version, factory, eager) => {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = (id) => {
/******/ 				var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/consumes */
/******/ 	(() => {
/******/ 		var parseVersion = (str) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var p=p=>{return p.split(".").map((p=>{return+p==p?+p:p}))},n=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(str),r=n[1]?p(n[1]):[];return n[2]&&(r.length++,r.push.apply(r,p(n[2]))),n[3]&&(r.push([]),r.push.apply(r,p(n[3]))),r;
/******/ 		}
/******/ 		var versionLt = (a, b) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			a=parseVersion(a),b=parseVersion(b);for(var r=0;;){if(r>=a.length)return r<b.length&&"u"!=(typeof b[r])[0];var e=a[r],n=(typeof e)[0];if(r>=b.length)return"u"==n;var t=b[r],f=(typeof t)[0];if(n!=f)return"o"==n&&"n"==f||("s"==f||"u"==n);if("o"!=n&&"u"!=n&&e!=t)return e<t;r++}
/******/ 		}
/******/ 		var rangeToString = (range) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			var r=range[0],n="";if(1===range.length)return"*";if(r+.5){n+=0==r?">=":-1==r?"<":1==r?"^":2==r?"~":r>0?"=":"!=";for(var e=1,a=1;a<range.length;a++){e--,n+="u"==(typeof(t=range[a]))[0]?"-":(e>0?".":"")+(e=2,t)}return n}var g=[];for(a=1;a<range.length;a++){var t=range[a];g.push(0===t?"not("+o()+")":1===t?"("+o()+" || "+o()+")":2===t?g.pop()+" "+g.pop():rangeToString(t))}return o();function o(){return g.pop().replace(/^\((.+)\)$/,"$1")}
/******/ 		}
/******/ 		var satisfy = (range, version) => {
/******/ 			// see webpack/lib/util/semver.js for original code
/******/ 			if(0 in range){version=parseVersion(version);var e=range[0],r=e<0;r&&(e=-e-1);for(var n=0,i=1,a=!0;;i++,n++){var f,s,g=i<range.length?(typeof range[i])[0]:"";if(n>=version.length||"o"==(s=(typeof(f=version[n]))[0]))return!a||("u"==g?i>e&&!r:""==g!=r);if("u"==s){if(!a||"u"!=g)return!1}else if(a)if(g==s)if(i<=e){if(f!=range[i])return!1}else{if(r?f>range[i]:f<range[i])return!1;f!=range[i]&&(a=!1)}else if("s"!=g&&"n"!=g){if(r||i<=e)return!1;a=!1,i--}else{if(i<=e||s<g!=r)return!1;a=!1}else"s"!=g&&"n"!=g&&(a=!1,i--)}}var t=[],o=t.pop.bind(t);for(n=1;n<range.length;n++){var u=range[n];t.push(1==u?o()|o():2==u?o()&o():u?satisfy(u,version):!o())}return!!o();
/******/ 		}
/******/ 		var ensureExistence = (scopeName, key) => {
/******/ 			var scope = __webpack_require__.S[scopeName];
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) throw new Error("Shared module " + key + " doesn't exist in shared scope " + scopeName);
/******/ 			return scope;
/******/ 		};
/******/ 		var findVersion = (scope, key) => {
/******/ 			var versions = scope[key];
/******/ 			var key = Object.keys(versions).reduce((a, b) => {
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key]
/******/ 		};
/******/ 		var findSingletonVersionKey = (scope, key) => {
/******/ 			var versions = scope[key];
/******/ 			return Object.keys(versions).reduce((a, b) => {
/******/ 				return !a || (!versions[a].loaded && versionLt(a, b)) ? b : a;
/******/ 			}, 0);
/******/ 		};
/******/ 		var getInvalidSingletonVersionMessage = (scope, key, version, requiredVersion) => {
/******/ 			return "Unsatisfied version " + version + " from " + (version && scope[key][version].from) + " of shared singleton module " + key + " (required " + rangeToString(requiredVersion) + ")"
/******/ 		};
/******/ 		var getSingleton = (scope, scopeName, key, requiredVersion) => {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var getSingletonVersion = (scope, scopeName, key, requiredVersion) => {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			if (!satisfy(requiredVersion, version)) warn(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var getStrictSingletonVersion = (scope, scopeName, key, requiredVersion) => {
/******/ 			var version = findSingletonVersionKey(scope, key);
/******/ 			if (!satisfy(requiredVersion, version)) throw new Error(getInvalidSingletonVersionMessage(scope, key, version, requiredVersion));
/******/ 			return get(scope[key][version]);
/******/ 		};
/******/ 		var findValidVersion = (scope, key, requiredVersion) => {
/******/ 			var versions = scope[key];
/******/ 			var key = Object.keys(versions).reduce((a, b) => {
/******/ 				if (!satisfy(requiredVersion, b)) return a;
/******/ 				return !a || versionLt(a, b) ? b : a;
/******/ 			}, 0);
/******/ 			return key && versions[key]
/******/ 		};
/******/ 		var getInvalidVersionMessage = (scope, scopeName, key, requiredVersion) => {
/******/ 			var versions = scope[key];
/******/ 			return "No satisfying version (" + rangeToString(requiredVersion) + ") of shared module " + key + " found in shared scope " + scopeName + ".\n" +
/******/ 				"Available versions: " + Object.keys(versions).map((key) => {
/******/ 				return key + " from " + versions[key].from;
/******/ 			}).join(", ");
/******/ 		};
/******/ 		var getValidVersion = (scope, scopeName, key, requiredVersion) => {
/******/ 			var entry = findValidVersion(scope, key, requiredVersion);
/******/ 			if(entry) return get(entry);
/******/ 			throw new Error(getInvalidVersionMessage(scope, scopeName, key, requiredVersion));
/******/ 		};
/******/ 		var warn = (msg) => {
/******/ 			if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 		};
/******/ 		var warnInvalidVersion = (scope, scopeName, key, requiredVersion) => {
/******/ 			warn(getInvalidVersionMessage(scope, scopeName, key, requiredVersion));
/******/ 		};
/******/ 		var get = (entry) => {
/******/ 			entry.loaded = 1;
/******/ 			return entry.get()
/******/ 		};
/******/ 		var init = (fn) => (function(scopeName, a, b, c) {
/******/ 			var promise = __webpack_require__.I(scopeName);
/******/ 			if (promise && promise.then) return promise.then(fn.bind(fn, scopeName, __webpack_require__.S[scopeName], a, b, c));
/******/ 			return fn(scopeName, __webpack_require__.S[scopeName], a, b, c);
/******/ 		});
/******/ 		
/******/ 		var load = /*#__PURE__*/ init((scopeName, scope, key) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return get(findVersion(scope, key));
/******/ 		});
/******/ 		var loadFallback = /*#__PURE__*/ init((scopeName, scope, key, fallback) => {
/******/ 			return scope && __webpack_require__.o(scope, key) ? get(findVersion(scope, key)) : fallback();
/******/ 		});
/******/ 		var loadVersionCheck = /*#__PURE__*/ init((scopeName, scope, key, version) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return get(findValidVersion(scope, key, version) || warnInvalidVersion(scope, scopeName, key, version) || findVersion(scope, key));
/******/ 		});
/******/ 		var loadSingleton = /*#__PURE__*/ init((scopeName, scope, key) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getSingleton(scope, scopeName, key);
/******/ 		});
/******/ 		var loadSingletonVersionCheck = /*#__PURE__*/ init((scopeName, scope, key, version) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictVersionCheck = /*#__PURE__*/ init((scopeName, scope, key, version) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getValidVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictSingletonVersionCheck = /*#__PURE__*/ init((scopeName, scope, key, version) => {
/******/ 			ensureExistence(scopeName, key);
/******/ 			return getStrictSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadVersionCheckFallback = /*#__PURE__*/ init((scopeName, scope, key, version, fallback) => {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return get(findValidVersion(scope, key, version) || warnInvalidVersion(scope, scopeName, key, version) || findVersion(scope, key));
/******/ 		});
/******/ 		var loadSingletonFallback = /*#__PURE__*/ init((scopeName, scope, key, fallback) => {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getSingleton(scope, scopeName, key);
/******/ 		});
/******/ 		var loadSingletonVersionCheckFallback = /*#__PURE__*/ init((scopeName, scope, key, version, fallback) => {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var loadStrictVersionCheckFallback = /*#__PURE__*/ init((scopeName, scope, key, version, fallback) => {
/******/ 			var entry = scope && __webpack_require__.o(scope, key) && findValidVersion(scope, key, version);
/******/ 			return entry ? get(entry) : fallback();
/******/ 		});
/******/ 		var loadStrictSingletonVersionCheckFallback = /*#__PURE__*/ init((scopeName, scope, key, version, fallback) => {
/******/ 			if(!scope || !__webpack_require__.o(scope, key)) return fallback();
/******/ 			return getStrictSingletonVersion(scope, scopeName, key, version);
/******/ 		});
/******/ 		var installedModules = {};
/******/ 		var moduleToHandlerMapping = {
/******/ 			"webpack/sharing/consume/default/mdk-core/controls/BaseControl": () => (loadSingletonVersionCheck("default", "mdk-core/controls/BaseControl", [0])),
/******/ 			"webpack/sharing/consume/default/@nativescript/core/application": () => (loadSingletonVersionCheck("default", "@nativescript/core/application", [0])),
/******/ 			"webpack/sharing/consume/default/@nativescript/core": () => (loadSingletonVersionCheck("default", "@nativescript/core", [0]))
/******/ 		};
/******/ 		var initialConsumes = ["webpack/sharing/consume/default/mdk-core/controls/BaseControl","webpack/sharing/consume/default/@nativescript/core/application","webpack/sharing/consume/default/@nativescript/core"];
/******/ 		initialConsumes.forEach((id) => {
/******/ 			__webpack_require__.m[id] = (module) => {
/******/ 				// Handle case when module is used sync
/******/ 				installedModules[id] = 0;
/******/ 				delete __webpack_require__.c[id];
/******/ 				var factory = moduleToHandlerMapping[id]();
/******/ 				if(typeof factory !== "function") throw new Error("Shared module is not available for eager consumption: " + id);
/******/ 				module.exports = factory();
/******/ 			}
/******/ 		});
/******/ 		// no chunk loading of consumes
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("webpack/container/entry/bundle.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map