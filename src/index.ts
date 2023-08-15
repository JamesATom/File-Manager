import { FileManager } from "./Classes/FileManager/fileManager";

export const curUser = (process.argv[2] == undefined ? 'Anonymous' : process.argv[2].split('=')[1]);

const manager = new FileManager(curUser);

const startAndFinish = () => {
    console.clear();
    console.log(manager.greeting);
    manager.start();
    // console.log(manager.goodbye);
}

startAndFinish();