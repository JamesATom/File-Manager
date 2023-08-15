"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curUser = void 0;
var fileManager_1 = require("./Classes/FileManager/fileManager");
exports.curUser = (process.argv[2] == undefined ? 'Anonymous' : process.argv[2].split('=')[1]);
var manager = new fileManager_1.FileManager(exports.curUser);
var startAndFinish = function () {
    console.clear();
    console.log(manager.greeting);
    manager.start();
    // console.log(manager.goodbye);
};
startAndFinish();
