import type { ChatInputCommandInteraction } from "discord.js";
import type { Command, CommandCreateCommand } from "./command";

export class HiCommand implements Command {
    private readonly name: string;
    private readonly description: string;

    constructor(props: CommandCreateCommand) {
        this.name = props.name;
        this.description = props.description;
    }
    toDiscordCommand?() {
        throw new Error("Method not implemented.");
    }

    async execute(ctx: ChatInputCommandInteraction): Promise<void> {
        await ctx.reply("Hello!");
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }
}
