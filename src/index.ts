import { FileManager } from "./Classes/FileManager/fileManager";

export const curUser = (process.argv[2] == undefined ? 'Anonymous' : process.argv[2].split('=')[1]);

const manager = new FileManager(curUser);

console.log(manager.greeting);

console.log(manager.goodbye);