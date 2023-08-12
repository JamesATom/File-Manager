

export class FileManager {
    username;
    greeting;
    goodbye;
    
    constructor(username: string) {
        this.username = username;
        this.greeting = 'Welcome to the File Manager, ' + username + '!'; 
        this.goodbye = 'Thank you for using File Manager, ' + username + ' goodbye!';
    }
}