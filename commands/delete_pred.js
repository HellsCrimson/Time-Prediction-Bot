const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Delete your prediction'),
	async execute(interaction) {
		if (!process_prediction.predictionGoing)
		{
			await interaction.reply({content: 'There is no prediction curently ongoing', ephemeral: true})
		}
		else
		{
			if (process_prediction.prediction.find(predic => predic[0] == interaction.user))
			{
                process_prediction.prediction = process_prediction.prediction.filter(predic => !(predic[0] == interaction.user));
				await interaction.reply({content: 'Your prediction have been deleted', ephemeral: true});
			}
			else 
			{
                await interaction.reply({content: "You don't have a prediction", ephemeral: true});
			}
		}
	},
};