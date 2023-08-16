import process from 'node:process';
import * as readline from 'node:readline';
import * as os from 'node:os';
import { NavigationHandler } from '../Navigation/navigation';
import { validCommands } from '../Commands/commands';
import { FileHandler } from '../FileHandler/fileHandler';
import { ArchiveHandler } from '../ArchiveHandler/archiveHandler';
import { HashHandler } from '../HashHandler/hashHandler';
import { OSHandler } from '../OsHandler/osHandler';
import { ErrorOne } from '../../Messages/Error/error';

export class FileManager {
    username;
    greeting;
    goodbye;
    rl;
    navigationHandler;
    fileHandler;
    archiveHandler;
    hashHandler;
    osHandler;

    constructor(username: string) {
        this.username = username;
        this.greeting = 'Welcome to the File Manager, ' + username + '!'; 
        this.goodbye = 'Thank you for using File Manager, ' + username + ' goodbye!';
        this.navigationHandler = new NavigationHandler();
        this.fileHandler = new FileHandler();
        this.archiveHandler = new ArchiveHandler();
        this.hashHandler = new HashHandler();
        this.osHandler = new OSHandler();

        this.rl = readline.createInterface({
            prompt: '> ',
            input: process.stdin, 
            output: process.stdout,
            completer: this.autoCompleter
        });
    }

    start() {
        process.chdir(os.homedir());
        this.printCwd();
        this.rl.prompt();
        this.listen();
    }

    listen() {
        this.rl.on('line', (cmd) => {
            const listOfCmds = cmd.trim();
            if (listOfCmds) {
                this.handleUserCommand(listOfCmds)
                .catch((error) => console.log(error.message))
                .finally(() => {
                    console.log(`You are currently in ${process.cwd()}`);
                });
                setTimeout(() => {
                    this.rl.prompt();
                }, 1000);
            }
        });
    }

    printCwd() {
        console.log('You are currently in', process.cwd());
    }

    async handleUserCommand(cmd: string) {
        const [operation, ...rest] = cmd.split(/(?<!\\) /);
        const args = rest.filter(Boolean).map(arg => arg.replaceAll("\\ ", " "));
        try {
            switch (operation) {
                case "up": {
                    this.validateNumberOfArgs(args, 0);
                    this.navigationHandler.up();
                    break;
                }
                case "ls": {
                    this.validateNumberOfArgs(args, 0);
                    await this.navigationHandler.ls();
                    break;
                }
                case "cd": {
                    this.validateNumberOfArgs(args, 1);
                    const [targetDir] = args;
                    this.navigationHandler.cd(targetDir);
                    break;
                }
                case "cat": {
                    this.validateNumberOfArgs(args, 1);
                    const [pathToFile] = args;
                    await this.fileHandler.cat(pathToFile);
                    break;
                }
                case "add": {
                    this.validateNumberOfArgs(args, 1);
                    const [pathToFile] = args;
                    await this.fileHandler.add(pathToFile);
                    break;
                }
                case "rn": {
                    this.validateNumberOfArgs(args, 2);
                    const [pathToFile, newFileName] = args;
                    await this.fileHandler.rn(pathToFile, newFileName);
                    break;
                }
                case "cp": {
                    this.validateNumberOfArgs(args, 2);
                    const [pathToFile, pathToDirectory] = args;
                    await this.fileHandler.cp(pathToFile, pathToDirectory);
                    break;
                }
                case "mv": {
                    this.validateNumberOfArgs(args, 2);
                    const [pathToFile, pathToDirectory] = args;
                    await this.fileHandler.mv(pathToFile, pathToDirectory);
                    break;
                }
                case "rm": {
                    this.validateNumberOfArgs(args, 1);
                    const [pathToFile] = args;
                    await this.fileHandler.rm(pathToFile);
                    break;
                }
                case "os": {
                    this.validateNumberOfArgs(args, 1);
                    const [flag] = args;
                    this.osHandler.handleFlag(flag);
                    break;
                }
                case "hash": {
                    this.validateNumberOfArgs(args, 1);
                    const [pathToFile] = args;
                    await this.hashHandler.calcHash(pathToFile);
                    break;
                }
                case "compress":
                case "decompress": {
                    this.validateNumberOfArgs(args, 2);
                    const [pathToInputFile, pathToOutputFile] = args;
                    await this.archiveHandler.archive(pathToInputFile, pathToOutputFile, operation === "decompress");
                    break;
                }
                case ".exit": {
                    process.exit();
                }
                case ".cls": {
                    console.clear();
                    break;
                }
                default: {
                    throw new Error(ErrorOne.INVALID_INPUT);
                }
            }
          } catch (error: any) {
                if (error?.message === ErrorOne.INVALID_INPUT){
                    throw new Error(ErrorOne.INVALID_INPUT);
                };
                throw new Error(ErrorOne.OPERATION_FAILURE);
            }
        }

    autoCompleter(line: string) {
        const hits = validCommands.filter((c) => c.startsWith(line));
        return [hits.length ? hits : validCommands, line];
    }
    
    validateNumberOfArgs(args: string[], number: number) {
        if (args.length !== number) {
          throw new Error(ErrorOne.INVALID_INPUT);
        }
    }
}