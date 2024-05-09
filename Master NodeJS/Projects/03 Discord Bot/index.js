import { Client, GatewayIntentBits } from "discord.js";
const client = new Client({
    // intents --> permission
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith("create")) {
        const url = message.content.split("create")[1];
        return message.reply({
            content: "Generating Short ID for " + url,
        });
    }
    message.reply(
        `Hello ${message.author.username} Welcome to our server! I'm Cyclone your personal bot.`
    );
    // console.log(message);
});

client.on("interactionCreate", (interaction) => {
    // console.log(interaction);
    interaction.reply("Pong!!");
});

client.login(
    "MTIzODAwMjgzOTM2ODc2NTUzMQ.GnIU40.tKv5j2TpSX3nA2_qf3qlH8VAzNco1VICgNSi_s"
);
