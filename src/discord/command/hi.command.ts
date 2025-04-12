import type { ChatInputCommandInteraction } from "discord.js";
import { Command, type CommandCreateCommand } from "./command";

export class HiCommand extends Command {
    name: string;
    description: string;

    constructor(props: CommandCreateCommand) {
        super();
        this.name = props.name;
        this.description = props.description;
    }

    async execute(ctx: ChatInputCommandInteraction) {
        await ctx.reply("Hello!");
    }
}
