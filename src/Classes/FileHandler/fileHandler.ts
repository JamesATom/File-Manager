import { rm, writeFile, rename } from "fs/promises";
import { join } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";

export class FileHandler {
  cat(pathToFile: string) {
    return new Promise((resolve, reject) => {
      const readStream = createReadStream(pathToFile);
      readStream.on("error", reject);
      readStream.on("data", (data) => console.log(data.toString()));
      readStream.on("end", resolve);
    });
  };

  async add(pathToFile: string) {
    await writeFile(pathToFile, "", { flag: "wx" });
  };

  async rn(pathToFile: string, newFileName: string) {
    await rename(pathToFile, newFileName);
  };

  async cp(pathToSourceFile: string, pathToTargetDirectory: string) {
    const pathToTargetFile = join(pathToTargetDirectory, pathToSourceFile);
    const readStream = createReadStream(pathToSourceFile);
    const writeStream = createWriteStream(pathToTargetFile, { flags: "wx" });
    await pipeline(readStream, writeStream);
  };

  async mv(pathToSourceFile: string, pathToTargetDirectory: string) {
    await this.cp(pathToSourceFile, pathToTargetDirectory);
    // await this.rm(pathToFile);
  };

  async rm(pathToFile: string) {
    await rm(pathToFile);
  };
}