import type { ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";

export interface CommandCreateCommand {
    name: string;
    description: string;
}

export abstract class Command {
    abstract name: string;
    abstract description: string;

    abstract execute(ctx: ChatInputCommandInteraction): Promise<void>;

    toJSON() {
        return {
            name: this.name,
            description: this.description,
        } as RESTPostAPIChatInputApplicationCommandsJSONBody;
    }
}

