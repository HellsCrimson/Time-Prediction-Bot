const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prediction')
		.setDescription('Propose a prediction')
		.addIntegerOption(option =>
			option.setName('minutes')
				.setDescription('Time until arrival in minutes')
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('seconds')
				.setDescription('Time until arrival in seconds')
				.setRequired(false)),
	async execute(interaction) {
		if (!process_prediction.predictionGoing)
		{
			await interaction.reply({content: 'There is no prediction curently ongoing', ephemeral: true})
		}
		else
		{
			if (process_prediction.prediction.find(predic => predic[0] == interaction.user))
			{
				await interaction.reply({content: `You already have a prediction for ${process_prediction.name}`, ephemeral: true});
			}
			else 
			{
				const minutesSelected = interaction.options.getInteger('minutes');
				if (minutesSelected === null) 
				{
					await interaction.reply({content: "You need to enter an integer", ephemeral: true})
				}
				else
				{
					const secondsSelected = interaction.options.getInteger('seconds');

					if (secondsSelected === null)
						const time = Date.now() + (minutesSelected * 60000);
					else 
						const time = Date.now() + (minutesSelected * 60000) + (secondsSelected * 1000);
					
					process_prediction.prediction.push([interaction.user, time]);
					var myDate = new Date(time);

					let hours = myDate.getHours();
					let minutes = myDate.getMinutes();
					let seconds = myDate.getSeconds();

					if (secondsSelected === null)
						await interaction.reply(`Prediction ${minutesSelected}min registred for ${process_prediction.name}. Predicted time: ${hours}:${minutes}:${seconds}`);
					else
						await interaction.reply(`Prediction ${minutesSelected}min ${secondsSelected}s registred for ${process_prediction.name}. Predicted time: ${hours}:${minutes}:${seconds}`);
				}
			}
		}
	},
};