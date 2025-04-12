import { existsSync, readFileSync, writeFileSync } from "fs";
import { err, ok } from "resulta";

export class CommandCache {
    constructor(private readonly path: string) { }

    public async load() {
        if (!existsSync(this.path)) return err("Commands cache not found");

        const content = readFileSync(this.path, "utf-8");
        return ok(JSON.parse(content));
    }

    public async save(commands: unknown): Promise<void> {
        writeFileSync(this.path, JSON.stringify(commands, null, 2));
    }
}
