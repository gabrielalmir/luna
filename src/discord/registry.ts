import type { Command } from "./command/command";

export class CommandRegistry {
    private readonly commandMap: Map<string, Command>;

    constructor(commands: Command[]) {
        this.commandMap = new Map(commands.map((command) => [command.name, command]));
    }

    public find(name: string): Command | undefined {
        return this.commandMap.get(name);
    }

    public serialize() {
        return Array.from(this.commandMap.values()).map((command) => command.toJSON());
    }
}
