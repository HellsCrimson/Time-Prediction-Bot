const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prediction')
		.setDescription('Propose a prediction')
		.addIntegerOption(option =>
			option.setName('selection')
				.setDescription('Time until arrival in minutes')
				.setRequired(true)),
	async execute(interaction) {
		if (!process_prediction.predictionGoing)
		{
			await interaction.reply({content: 'There is no prediction curently ongoing', ephemeral: true})
		}
		else
		{
			if (process_prediction.prediction.find(predic => predic[0] == interaction.user))
			{
				await interaction.reply({content: 'You already have a prediction', ephemeral: true});
			}
			else 
			{
				const selected = interaction.options.getInteger('selection');
				if (selected === null) 
				{
					await interaction.reply({content: "You need to enter an integer", ephemeral: true})
				}
				else
				{
					const time = Date.now() + (selected * 60000);
					process_prediction.prediction.push([interaction.user, time]);
					var myDate = new Date(time);

					let hours = myDate.getHours();
					let minutes = myDate.getMinutes();
					let seconds = myDate.getSeconds();

					await interaction.reply(`Prediction ${selected}min registred. Predicted time: ${hours}:${minutes}:${seconds}`);
				}
			}
		}
	},
};