import { Events } from "discord.js";
import { discordCommandManager } from "./config/deps";
import { env } from "./config/env";
import clientReadyEvent from "./events/client-ready.event";
import interactionCreateEvent from "./events/interaction-create.event";
import { client } from "./lib/discord";

async function main() {
    console.log("Deleting all previous commands...");
    const commandsDeletionOutcome = await discordCommandManager.deleteAllPreviousCommands();

    if (!commandsDeletionOutcome.ok) {
        console.error("Failed to delete previous commands", commandsDeletionOutcome.error);
        process.exit(1);
    }

    client.on(Events.ClientReady, clientReadyEvent.execute);
    client.on(Events.InteractionCreate, interactionCreateEvent.execute);

    client.login(env.DISCORD_TOKEN);
}

main();
