import { DefaultExtractors } from "@discord-player/extractor";
import { Player } from "discord-player";
import { HiCommand } from "../discord/command/hi.command";
import { PlayCommand } from "../discord/command/play.command";
import { DiscordCommandManager } from "../discord/manager";
import { client } from "../lib/discord";

// commands
const hiCommand = new HiCommand({ name: "hi", description: "Replies with hi!" });
const playCommand = new PlayCommand({ name: "play", description: "Plays a song!" });

// discord
export const discordCommandManager = new DiscordCommandManager([
    hiCommand,
    playCommand,
]);

// Inicializando o Player com o cliente do Discord
export const player = new Player(client);
player.extractors.loadMulti(DefaultExtractors);

player.events.on('error', (queue, error) => {
    console.error(`Erro na fila: ${error.message}`);
});

player.events.on('playerError', (queue, error) => {
    console.error(`Erro no player: ${error.message}`);
});

player.events.on('playerStart', (queue, track) => {
    console.log(`Tocando agora: ${track.title}`);
})
