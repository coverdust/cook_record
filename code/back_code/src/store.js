import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { randomUUID } from "node:crypto";
import { seedData } from "./seed.js";

export class JsonStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.writeQueue = Promise.resolve();
  }

  async init() {
    await mkdir(dirname(this.filePath), { recursive: true });

    try {
      await readFile(this.filePath, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      await this.write(structuredClone(seedData));
    }
  }

  async read() {
    const raw = await readFile(this.filePath, "utf8");
    return JSON.parse(raw);
  }

  async write(data) {
    const tempPath = `${this.filePath}.${randomUUID()}.tmp`;
    const payload = `${JSON.stringify(data, null, 2)}\n`;
    await writeFile(tempPath, payload, "utf8");
    await rename(tempPath, this.filePath);
  }

  async update(mutator) {
    const nextWrite = this.writeQueue.catch(() => undefined).then(async () => {
      const data = await this.read();
      const result = await mutator(data);
      await this.write(data);
      return result;
    });

    this.writeQueue = nextWrite.catch(() => undefined);
    return nextWrite;
  }
}
