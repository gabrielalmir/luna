import type { ChatInputCommandInteraction } from "discord.js";
import type { Command, CommandCreateCommand } from "./command";

export class HiCommand implements Command {
    name: string;
    description: string;

    constructor(props: CommandCreateCommand) {
        this.name = props.name;
        this.description = props.description;
    }

    async execute(ctx: ChatInputCommandInteraction) {
        await ctx.reply("Hello!");
    }
}
