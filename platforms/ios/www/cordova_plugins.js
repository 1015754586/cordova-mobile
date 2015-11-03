cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/aerogear-cordova-push/www/aerogear.ajax.js",
        "id": "aerogear-cordova-push.AeroGear.ajax",
        "clobbers": [
            "ajax"
        ]
    },
    {
        "file": "plugins/aerogear-cordova-push/www/aerogear-push.js",
        "id": "aerogear-cordova-push.AeroGear.UnifiedPush",
        "clobbers": [
            "push"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "id": "cordova-plugin-console.logger",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "id": "cordova-plugin-console.console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/network.js",
        "id": "org.apache.cordova.network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.network-information/www/Connection.js",
        "id": "org.apache.cordova.network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/es6-promise-plugin/www/promise.js",
        "id": "es6-promise-plugin.Promise",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "aerogear-cordova-push": "2.0.3",
    "cordova-plugin-console": "1.0.1",
    "cordova-plugin-device": "1.0.1",
    "cordova-plugin-splashscreen": "2.1.0",
    "cordova-plugin-transport-security": "0.1.1",
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-sqlite-storage": "0.7.11",
    "org.apache.cordova.network-information": "0.2.15",
    "es6-promise-plugin": "3.0.2"
}
// BOTTOM OF METADATA
});