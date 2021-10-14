const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');
const { Scoreboard } = require('../database.js');
const { client } = require('../client_instance.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scoreboard')
		.setDescription('See all the scores'),
	async execute(interaction) {
		const scoreList = await Scoreboard.findAll({});
        scoreList.sort((a, b) => parseInt(b.total) - parseInt(a.total));
        var scoreboard = "Scoreboard:\n";
        for (const score of scoreList)
        {
            scoreboard += [client.users.cache.get(score.name)]
            + ", Top 1 = " + score.top1 
            + ", Top 2 = " + score.top2 
            + ", Top 3 = " + score.top3 
            + ", Total points = " + score.total + "\n";
        }
        return interaction.reply({content: `${scoreboard}`, ephemeral: true});
	},
};