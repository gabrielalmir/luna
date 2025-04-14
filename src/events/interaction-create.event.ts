import { type CacheType, type Interaction } from "discord.js";
import { tryCatchAsync } from "resulta";
import { discordCommandManager, player } from "../config/deps";

export default {
    execute: async (ctx: Interaction<CacheType>) => {
        if (!ctx.isChatInputCommand()) return;

        const command = discordCommandManager.getCommand(ctx.commandName);

        if (!command) {
            console.error(`Command ${ctx.commandName} not found`);
            return;
        }

        console.log(`Executing command: ${ctx.commandName}`);

        await player.context.provide({ guild: ctx.guild! }, async () => {
            const result = await tryCatchAsync(async () => await command.execute(ctx));
            if (!result.ok) {
                console.error(`Failed to execute command ${ctx.commandName}`, result.error);
                await ctx.reply("An error occurred while executing the command.");
                return;
            }
        });
    }
}
