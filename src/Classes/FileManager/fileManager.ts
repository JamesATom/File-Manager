import process from 'node:process';
import * as readline from 'node:readline';
import * as os from 'node:os';
// import * as repl from 'node:repl';

export class FileManager {
    username;
    greeting;
    goodbye;
    rl;

    constructor(username: string) {
        this.username = username;
        this.greeting = 'Welcome to the File Manager, ' + username + '!'; 
        this.goodbye = 'Thank you for using File Manager, ' + username + ' goodbye!';
        this.rl = readline.createInterface({
            prompt: '> ',
            input: process.stdin, 
            output: process.stdout
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
            const listOfCmds = cmd.trim().split(' ');
            // this.handleUserCommand(listOfCmds);
            this.rl.prompt();
        });
    }

    printCwd() {
        console.log('You are currently in', process.cwd());
    }

    handleUserCommand(cmd: string[]) {

    }
}