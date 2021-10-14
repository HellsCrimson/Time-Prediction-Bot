const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');
const { Scoreboard } = require('../database.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('score')
		.setDescription('See your score'),
	async execute(interaction) {
		const score = await Scoreboard.findOne({ where: { name: interaction.user.id } });

        if (score) {
            const top1 = score.get('top1').toString();
            const top2 = score.get('top2').toString();
            const top3 = score.get('top3').toString();
            const total = score.get('total').toString();
            return interaction.reply(`Number of top 1 : ${top1}\n` + 
            `Number of top 2 : ${top2}\n` + 
            `Number of top 3 : ${top3}\n` +
            `Total : ${total}\n`);
        }
        return interaction.reply(`Could not find user by id: ${interaction.user.id}`);
	},
};