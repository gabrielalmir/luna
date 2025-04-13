import { DefaultExtractors } from "@discord-player/extractor";
import type { Player } from "discord-player";

export class DiscordPlayer {
    constructor(private readonly player: Player) { }

    configure(): this {
        this.loadExtractors();
        this.registerEventHandlers();
        return this;
    }

    private loadExtractors(): void {
        this.player.extractors.loadMulti(DefaultExtractors);
    }

    private registerEventHandlers(): void {
        this.player.events.on("error", this.handleQueueError);
        this.player.events.on("playerError", this.handlePlayerError);
        this.player.events.on("playerStart", this.handlePlayerStart);
    }

    private handleQueueError(queue: unknown, error: Error): void {
        console.error(`Erro na fila: ${error.message}`);
    }

    private handlePlayerError(queue: unknown, error: Error): void {
        console.error(`Erro no player: ${error.message}`);
    }

    private handlePlayerStart(queue: unknown, track: { title: string }): void {
        console.log(`Tocando agora: ${track.title}`);
    }

    getPlayer(): Player {
        return this.player;
    }
}
