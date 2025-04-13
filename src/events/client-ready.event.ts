import { type Client } from "discord.js";
import { discordCommandManager } from "../config/deps";

export default {
    async execute(ctx: Client<true>) {
        console.log(`Logged in as ${ctx.user.tag} (${ctx.user.id})`);

        const registeredCommands = await discordCommandManager.registerCommands();

        if (!registeredCommands.ok) {
            console.error("Failed to register commands", registeredCommands.error);
            process.exit(1);
        }

        console.log("Commands registered successfully");
    },
}
