import { useMainPlayer } from "discord-player";
import type { ChatInputCommandInteraction, GuildMember } from "discord.js";
import { SlashCommandBuilder } from "discord.js";
import type { Command, CommandCreateCommand } from "./command";

export class PlayCommand implements Command {
    name: string;
    description: string;

    constructor(props: CommandCreateCommand) {
        this.name = props.name;
        this.description = props.description;
    }

    toDiscordCommand() {
        return new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption(option =>
                option
                    .setName('query')
                    .setDescription('URL ou termo de busca do YouTube')
                    .setRequired(true)
            )
            .toJSON();
    }

    async execute(ctx: ChatInputCommandInteraction) {
        await ctx.deferReply();

        const guild = ctx.guild;
        if (!guild) {
            await ctx.followUp('Este comando só pode ser usado em servidores.');
            return;
        }

        const member = guild.members.cache.get(ctx.user.id);
        if (!member) {
            await ctx.followUp('Você não está em um servidor.');
            return;
        }

        const channel = member.voice.channel;
        if (!channel) {
            await ctx.followUp('Você precisa estar em um canal de voz para usar este comando.');
            return;
        }

        const player = useMainPlayer();
        const query = ctx.options.getString('query');

        if (!query) {
            await ctx.followUp('Por favor, forneça uma URL ou termo de busca.');
            return;
        }

        const searchResult = await player.search(query, {
            requestedBy: ctx.user,
        });

        if (!searchResult || !searchResult.tracks.length) {
            await ctx.followUp('Nenhum resultado encontrado para a busca.');
            return;
        }

        const track = searchResult.tracks[0]!;
        const queue = player.nodes.create(ctx.guild!, {
            metadata: {
                channel: ctx.channel,
            },
        });

        try {
            if (!queue.connection) {
                const guildMember = ctx.member as GuildMember;
                await queue.connect(guildMember.voice.channel!);
            }
        } catch {
            queue.delete();
            await ctx.followUp('Não foi possível entrar no canal de voz.');
            return;
        }

        queue.addTrack(track);
        if (!queue.isPlaying()) await queue.play(track);

        await ctx.followUp(`Adicionado à fila: **${track.title}**`);
    }
}
