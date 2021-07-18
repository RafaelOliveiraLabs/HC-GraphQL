import { readFile, writeFile } from "fs";
import { resolve } from "path";

export default function createRepository(name) {
  const path = resolve(__dirname, `../../data/${name}.json`);

  return {
    read: () =>
      new Promisse((resolve, reject) => {
        readFile(path, (error, data) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(JSON.parse(data));
        });
      }),

    write: (data) =>
      new Promisse((resolve, reject) => {
        writeFile(path, JSON.stringify(data), (error, data) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      }),
  };
}
