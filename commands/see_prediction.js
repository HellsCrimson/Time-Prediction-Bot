const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('see')
		.setDescription('See all prediction'),
	async execute(interaction) {
		if(process_prediction.prediction.length == 0)
		{
			await interaction.reply({content:"There are no prediction", ephemeral: true});
		}
		else 
		{
			var predictions = 'Here are the predictions:\n';
			process_prediction.prediction.forEach(prediction => predictions += [prediction[0]] + ", " + process_prediction.get_date(prediction[1]) + "\n");
			await interaction.reply({content: predictions, ephemeral: true});	
		}
	},
};