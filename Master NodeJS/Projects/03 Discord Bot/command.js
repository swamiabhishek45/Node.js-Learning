import { REST, Routes } from "discord.js";

const TOKEN =
    "MTIzODAwMjgzOTM2ODc2NTUzMQ.GnIU40.tKv5j2TpSX3nA2_qf3qlH8VAzNco1VICgNSi_s";

const CLIENT_ID = "1238002839368765531";

const commands = [
    {
        name: "create",
        description: "Creates Short URL",
    },
];

const rest = new REST({ version: "10" }).setToken(TOKEN);

try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
} catch (error) {
    console.error(error);
}
