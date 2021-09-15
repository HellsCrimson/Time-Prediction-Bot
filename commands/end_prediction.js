const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('end')
		.setDescription('End a prediction'),
	async execute(interaction) {
		if (!process_prediction.predictionGoing)
		{
			await interaction.reply({content: 'There is no prediction', ephemeral: true});
		}
		else if (process_prediction.prediction.length == 0)
		{
			process_prediction.predictionGoing = false;
			process_prediction.prediction = [];
			await interaction.reply("No one won <:sadcat:887788315078717481>");
		}
		else
		{
			process_prediction.predictionGoing = false;
            const endTime = Date.now();
            const winner = process_prediction.find_closer(interaction.user, process_prediction.prediction, endTime, endTime + 120000);
            process_prediction.prediction = [];
			await interaction.reply(`${winner[0]} won with ${Math.round(Math.abs(winner[1] - endTime) / 60000)}min time difference`);
		}
	},
};