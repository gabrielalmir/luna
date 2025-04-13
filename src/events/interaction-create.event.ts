import { useMainPlayer } from "discord-player";
import { type CacheType, type Interaction } from "discord.js";
import { tryCatchAsync } from "resulta";
import { discordCommandManager } from "../config/deps";

export default {
    execute: async (ctx: Interaction<CacheType>) => {
        if (!ctx.isChatInputCommand()) return;

        const command = discordCommandManager.getCommand(ctx.commandName);
        const player = useMainPlayer();

        if (!command) {
            console.error(`Command ${ctx.commandName} not found`);
            return;
        }

        console.log(`Executing command: ${ctx.commandName}`);

        await player.context.provide({ guild: ctx.guild! }, async () => {
            const executionOutcome = await tryCatchAsync(async () => {
                await command.execute(ctx);
            });

            if (!executionOutcome.ok) {
                console.error(`Error executing command ${ctx.commandName}:`, executionOutcome.error);
                await ctx.reply("An error occurred while executing the command.");
            }
        })
    }
}
