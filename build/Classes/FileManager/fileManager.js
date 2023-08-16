"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = void 0;
var node_process_1 = __importDefault(require("node:process"));
var readline = __importStar(require("node:readline"));
var os = __importStar(require("node:os"));
var navigation_1 = require("../Navigation/navigation");
var commands_1 = require("../Commands/commands");
var fileHandler_1 = require("../FileHandler/fileHandler");
var archiveHandler_1 = require("../ArchiveHandler/archiveHandler");
var hashHandler_1 = require("../HashHandler/hashHandler");
var osHandler_1 = require("../OsHandler/osHandler");
var error_1 = require("../../Messages/Error/error");
var FileManager = /** @class */ (function () {
    function FileManager(username) {
        this.username = username;
        this.greeting = 'Welcome to the File Manager, ' + username + '!';
        this.goodbye = 'Thank you for using File Manager, ' + username + ' goodbye!';
        this.navigationHandler = new navigation_1.NavigationHandler();
        this.fileHandler = new fileHandler_1.FileHandler();
        this.archiveHandler = new archiveHandler_1.ArchiveHandler();
        this.hashHandler = new hashHandler_1.HashHandler();
        this.osHandler = new osHandler_1.OSHandler();
        this.rl = readline.createInterface({
            prompt: '> ',
            input: node_process_1.default.stdin,
            output: node_process_1.default.stdout,
            completer: this.autoCompleter
        });
    }
    FileManager.prototype.start = function () {
        node_process_1.default.chdir(os.homedir());
        this.printCwd();
        this.rl.prompt();
        this.listen();
    };
    FileManager.prototype.listen = function () {
        var _this = this;
        this.rl.on('line', function (cmd) {
            var listOfCmds = cmd.trim();
            _this.rl.prompt();
            if (listOfCmds) {
                _this.handleUserCommand(listOfCmds)
                    .catch(function (error) { return console.log(error.message); })
                    .finally(function () { return console.log("You are currently in ".concat(node_process_1.default.cwd())); });
            }
        });
    };
    FileManager.prototype.printCwd = function () {
        console.log('You are currently in', node_process_1.default.cwd());
    };
    FileManager.prototype.handleUserCommand = function (cmd) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, operation, rest, args, _b, targetDir, pathToFile, pathToFile, pathToFile, newFileName, pathToFile, pathToDirectory, pathToFile, pathToDirectory, pathToFile, flag, pathToFile, pathToInputFile, pathToOutputFile, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = cmd.split(/(?<!\\) /), operation = _a[0], rest = _a.slice(1);
                        args = rest.filter(Boolean).map(function (arg) { return arg.replaceAll("\\ ", " "); });
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 27, , 28]);
                        _b = operation;
                        switch (_b) {
                            case "up": return [3 /*break*/, 2];
                            case "ls": return [3 /*break*/, 3];
                            case "cd": return [3 /*break*/, 5];
                            case "cat": return [3 /*break*/, 6];
                            case "add": return [3 /*break*/, 8];
                            case "rn": return [3 /*break*/, 10];
                            case "cp": return [3 /*break*/, 12];
                            case "mv": return [3 /*break*/, 14];
                            case "rm": return [3 /*break*/, 16];
                            case "os": return [3 /*break*/, 18];
                            case "hash": return [3 /*break*/, 19];
                            case "compress": return [3 /*break*/, 21];
                            case "decompress": return [3 /*break*/, 21];
                            case ".exit": return [3 /*break*/, 23];
                            case ".cls": return [3 /*break*/, 24];
                        }
                        return [3 /*break*/, 25];
                    case 2:
                        {
                            this.validateNumberOfArgs(args, 0);
                            this.navigationHandler.up();
                            return [3 /*break*/, 26];
                        }
                        _c.label = 3;
                    case 3:
                        this.validateNumberOfArgs(args, 0);
                        return [4 /*yield*/, this.navigationHandler.ls()];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 26];
                    case 5:
                        {
                            this.validateNumberOfArgs(args, 1);
                            targetDir = args[0];
                            this.navigationHandler.cd(targetDir);
                            return [3 /*break*/, 26];
                        }
                        _c.label = 6;
                    case 6:
                        this.validateNumberOfArgs(args, 1);
                        pathToFile = args[0];
                        return [4 /*yield*/, this.fileHandler.cat(pathToFile)];
                    case 7:
                        _c.sent();
                        return [3 /*break*/, 26];
                    case 8:
                        this.validateNumberOfArgs(args, 1);
                        pathToFile = args[0];
                        return [4 /*yield*/, this.fileHandler.add(pathToFile)];
                    case 9:
                        _c.sent();
                        return [3 /*break*/, 26];
                    case 10:
                        this.validateNumberOfArgs(args, 2);
                        pathToFile = args[0], newFileName = args[1];
                        return [4 /*yield*/, this.fileHandler.rn(pathToFile, newFileName)];
                    case 11:
                        _c.sent();
                        return [3 /*break*/, 26];
                    case 12:
                        this.validateNumberOfArgs(args, 2);
                        pathToFile = args[0], pathToDirectory = args[1];
                        return [4 /*yield*/, this.fileHandler.cp(pathToFile, pathToDirectory)];
                    case 13:
                        _c.sent();
                        return [3 /*break*/, 26];
                    case 14:
                        this.validateNumberOfArgs(args, 2);
                        pathToFile = args[0], pathToDirectory = args[1];
                        return [4 /*yield*/, this.fileHandler.mv(pathToFile, pathToDirectory)];
                    case 15:
                        _c.sent();
                        return [3 /*break*/, 26];
                    case 16:
                        this.validateNumberOfArgs(args, 1);
                        pathToFile = args[0];
                        return [4 /*yield*/, this.fileHandler.rm(pathToFile)];
                    case 17:
                        _c.sent();
                        return [3 /*break*/, 26];
                    case 18:
                        {
                            this.validateNumberOfArgs(args, 1);
                            flag = args[0];
                            this.osHandler.handleFlag(flag);
                            return [3 /*break*/, 26];
                        }
                        _c.label = 19;
                    case 19:
                        this.validateNumberOfArgs(args, 1);
                        pathToFile = args[0];
                        return [4 /*yield*/, this.hashHandler.calcHash(pathToFile)];
                    case 20:
                        _c.sent();
                        return [3 /*break*/, 26];
                    case 21:
                        this.validateNumberOfArgs(args, 2);
                        pathToInputFile = args[0], pathToOutputFile = args[1];
                        return [4 /*yield*/, this.archiveHandler.archive(pathToInputFile, pathToOutputFile, operation === "decompress")];
                    case 22:
                        _c.sent();
                        return [3 /*break*/, 26];
                    case 23:
                        {
                            node_process_1.default.exit();
                        }
                        _c.label = 24;
                    case 24:
                        {
                            console.clear();
                            return [3 /*break*/, 26];
                        }
                        _c.label = 25;
                    case 25:
                        {
                            throw new Error(error_1.ErrorOne.INVALID_INPUT);
                        }
                        _c.label = 26;
                    case 26: return [3 /*break*/, 28];
                    case 27:
                        error_2 = _c.sent();
                        if ((error_2 === null || error_2 === void 0 ? void 0 : error_2.message) === error_1.ErrorOne.INVALID_INPUT) {
                            throw new Error(error_1.ErrorOne.INVALID_INPUT);
                        }
                        ;
                        throw new Error(error_1.ErrorOne.OPERATION_FAILURE);
                    case 28: return [2 /*return*/];
                }
            });
        });
    };
    FileManager.prototype.autoCompleter = function (line) {
        var hits = commands_1.validCommands.filter(function (c) { return c.startsWith(line); });
        return [hits.length ? hits : commands_1.validCommands, line];
    };
    FileManager.prototype.validateNumberOfArgs = function (args, number) {
        if (args.length !== number) {
            throw new Error(error_1.ErrorOne.INVALID_INPUT);
        }
    };
    return FileManager;
}());
exports.FileManager = FileManager;
