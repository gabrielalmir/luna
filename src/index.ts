import { Events } from "discord.js";
import { discordCommandManager } from "./config/deps";
import { env } from "./config/env";
import clientReadyEvent from "./events/client-ready.event";
import interactionCreateEvent from "./events/interaction-create.event";
import { client } from "./lib/discord";

console.log("Deleting all previous commands...");
await discordCommandManager.deleteAllPreviousCommands();

client.on(Events.ClientReady, clientReadyEvent.execute);
client.on(Events.InteractionCreate, interactionCreateEvent.execute);

client.login(env.DISCORD_TOKEN);
