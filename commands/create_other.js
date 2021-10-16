const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');
const add_db = require('../add_to_db.js');
const { Scoreboard } = require('../database.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('forother')
		.setDescription('Propose a prediction for someone else')
        .addUserOption(options =>
            options.setName('person')
            .setDescription('Person you predict for')
            .setRequired(true))
		.addIntegerOption(option =>
			option.setName('time')
				.setDescription('Time until arrival in minutes')
				.setRequired(true)),
	async execute(interaction) {
		if (!process_prediction.predictionGoing)
		{
			await interaction.reply({content: 'There is no prediction curently ongoing', ephemeral: true})
		}
		else
		{
            const voting_person = interaction.options.getUser('person');
			if (process_prediction.prediction.find(predic => predic[0] == voting_person))
			{
				await interaction.reply({content: 'He already have a prediction', ephemeral: true});
			}
			else 
			{
				const selected = interaction.options.getInteger('time');
				if (selected === null) 
				{
					await interaction.reply({content: "You need to enter an integer", ephemeral: true})
				}
				else
				{
					const score = await Scoreboard.findOne({ where: { name: voting_person.id } });
					if (!score)
					{
						Scoreboard.create({
						name: voting_person.id,
						top1: 0,
						top2: 0,
						top3: 0,
						total: 0,
						});
					}

					const time = Date.now() + (selected * 60000);
					process_prediction.prediction.push([voting_person, time]);
					var myDate = new Date(time);

					let hours = myDate.getHours();
					let minutes = myDate.getMinutes();
					let seconds = myDate.getSeconds();

					await interaction.reply(`Prediction ${selected}min registred for ${voting_person}. Predicted time: ${hours}:${minutes}:${seconds}`);
				}
			}
		}
	},
};