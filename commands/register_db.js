const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');
const { Scoreboard } = require('../database.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Register in the Database'),
	async execute(interaction) {
		const score = await Scoreboard.findOne({ where: { name: interaction.user.id } });

        if (!score)
        {
            Scoreboard.create({
                name: interaction.user.id,
                top1: 0,
                top2: 0,
                top3: 0,
                total: 0,
            });
            await interaction.reply({content: "You have been added to the database", ephemeral: true});
        }
        else
        {
            await interaction.reply({content: `You are already in the database`, ephemeral: true});
        }
	},
};