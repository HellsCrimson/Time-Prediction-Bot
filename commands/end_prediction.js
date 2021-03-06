const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');
const { Scoreboard } = require('../database.js')
const { client } = require('../client_instance.js');

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
			process_prediction.name = "";
			process_prediction.predictionGoing = false;
			client.user.setActivity("Waiting for a prediction");
			process_prediction.prediction = [];
			await interaction.reply("No one won <:sadcat:887788315078717481>");
		}
		else
		{
			process_prediction.name = "";
			process_prediction.predictionGoing = false;
			client.user.setActivity("Waiting for a prediction");
            const endTime = Date.now();
            const winners = process_prediction.find_closer(interaction.user, process_prediction.prediction, endTime, endTime + 120000);
			if (process_prediction.prediction.length == 1)
			{
				process_prediction.prediction = [];

				const winner = await Scoreboard.findOne({ where: { name: winners[0][0].id } });
				if (winner) {
					winner.increment('top1');
					winner.increment('total', {by: 3});
				}

				await interaction.reply(`${winners[0][0]} won with ${Math.round(Math.abs(winners[0][1] - endTime) / 60000)}min time difference (${winners[0][1] - endTime}ms)`);
			}
			else if (process_prediction.prediction.length == 2)
			{
				process_prediction.prediction = [];

				const winner = await Scoreboard.findOne({ where: { name: winners[0][0].id } });
				if (winner) {
					winner.increment('top1');
					winner.increment('total', {by: 3});
				}
				const second = await Scoreboard.findOne({ where: { name: winners[1][0].id } });
				if (second) {
					second.increment('top2');
					second.increment('total', {by: 2});
				}

				await interaction.reply(`${winners[0][0]} won with ${Math.round(Math.abs(winners[0][1] - endTime) / 60000)}min time difference (${winners[0][1] - endTime}ms)\n` + 
				`${winners[1][0]} was second with ${Math.round(Math.abs(winners[1][1] - endTime) / 60000)}min time difference (${winners[1][1] - endTime}ms)`);
			}
			else
			{
				process_prediction.prediction = [];

				const winner = await Scoreboard.findOne({ where: { name: winners[0][0].id } });
				if (winner) {
					winner.increment('top1');
					winner.increment('total', {by: 3});
				}
				const second = await Scoreboard.findOne({ where: { name: winners[1][0].id } });
				if (second) {
					second.increment('top2');
					second.increment('total', {by: 2});
				}
				const third = await Scoreboard.findOne({ where: { name: winners[2][0].id } });
				if (third) {
					third.increment('top3');
					third.increment('total', {by: 1});
				}

				await interaction.reply(`${winners[0][0]} won with ${Math.round(Math.abs(winners[0][1] - endTime) / 60000)}min time difference (${winners[0][1] - endTime}ms)\n` + 
				`${winners[1][0]} was second with ${Math.round(Math.abs(winners[1][1] - endTime) / 60000)}min time difference (${winners[1][1] - endTime}ms)\n` + 
				`${winners[2][0]} was third with ${Math.round(Math.abs(winners[2][1] - endTime) / 60000)}min time difference (${winners[2][1] - endTime}ms)`);
			}
		}
	},
};