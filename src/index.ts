import { Events } from "discord.js";
import { env } from "./config/env";
import clientReadyEvent from "./events/client-ready.event";
import interactionCreateEvent from "./events/interaction-create.event";
import { client } from "./lib/discord";

client.on(Events.ClientReady, clientReadyEvent.execute);
client.on(Events.InteractionCreate, interactionCreateEvent.execute);

client.login(env.DISCORD_TOKEN);
