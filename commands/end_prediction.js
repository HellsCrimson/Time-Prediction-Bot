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
            const winners = process_prediction.find_closer(interaction.user, process_prediction.prediction, endTime, endTime + 120000);
			if (process_prediction.prediction.length == 1)
			{
				process_prediction.prediction = [];
				await interaction.reply(`${winners[0][0]} won with ${Math.round(Math.abs(winners[0][1] - endTime) / 60000)}min time difference`);
			}
			else if (process_prediction.prediction.length == 2)
			{
				process_prediction.prediction = [];
				await interaction.reply(`${winners[0][0]} won with ${Math.round(Math.abs(winners[0][1] - endTime) / 60000)}min time difference\n${winners[1][0]} was second with ${Math.round(Math.abs(winners[1][1] - endTime) / 60000)}min time difference`);
			}
			else
			{
				process_prediction.prediction = [];
				await interaction.reply(`${winners[0][0]} won with ${Math.round(Math.abs(winners[0][1] - endTime) / 60000)}min time difference\n${winners[1][0]} was second with ${Math.round(Math.abs(winners[1][1] - endTime) / 60000)}min time difference\n${winners[2][0]} was third with ${Math.round(Math.abs(winners[2][1] - endTime) / 60000)}min time difference`);
			}
		}
	},
};