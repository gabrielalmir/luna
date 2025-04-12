import type { ChatInputCommandInteraction } from "discord.js";
import { Command, type CommandCreateCommand } from "./command";

export class PlayCommand extends Command {
    name: string;
    description: string;

    constructor(props: CommandCreateCommand) {
        super();
        this.name = props.name;
        this.description = props.description;
    }

    execute(ctx: ChatInputCommandInteraction): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
