"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OSHandler = void 0;
var os_1 = require("os");
var error_1 = require("../../Messages/Error/error");
var OSHandler = /** @class */ (function () {
    function OSHandler() {
    }
    OSHandler.prototype.handleFlag = function (flag) {
        switch (flag) {
            case "--EOL": {
                console.log(JSON.stringify(os_1.EOL));
                break;
            }
            case "--cpus": {
                var cpus = (0, os_1.cpus)().map(function (_a) {
                    var model = _a.model, speed = _a.speed;
                    return ({ model: model, speed: speed });
                });
                console.log("Number of CPUs: ".concat(cpus.length));
                console.table(cpus);
                break;
            }
            case "--homedir": {
                console.log((0, os_1.homedir)());
                break;
            }
            case "--username": {
                var username = (0, os_1.userInfo)().username;
                console.log(username);
                break;
            }
            case "--architecture": {
                console.log((0, os_1.arch)());
                break;
            }
            default: {
                throw new Error(error_1.ErrorOne.INVALID_INPUT);
            }
        }
    };
    ;
    return OSHandler;
}());
exports.OSHandler = OSHandler;
