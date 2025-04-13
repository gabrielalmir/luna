import { useMainPlayer } from "discord-player";
import { type CacheType, type Interaction } from "discord.js";
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
            await command.execute(ctx);
        })
    }
}
