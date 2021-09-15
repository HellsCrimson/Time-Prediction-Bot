const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('see')
		.setDescription('See all prediction'),
	async execute(interaction) {
		var predictions = 'Here are the predictions:\n';
		process_prediction.prediction.forEach(prediction => predictions += [prediction[0]] + ", " + process_prediction.get_date(prediction[1]) + "\n");
		await interaction.reply({content: predictions, ephemeral: true});
	},
};