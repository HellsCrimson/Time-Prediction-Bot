const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('../process-prediction.js');
const { Scoreboard } = require('../database.js')

module.exports = {
    /*add_db: function(interaction) {
        const score = await Scoreboard.findOne({ where: { name: interaction.user.id } });

        if (!score)
        {
            Scoreboard.create({
                name: interaction.user.id,
                top1: 0,
                top2: 0,
                top3: 0,
                total: 0,
            });
        }
    },*/
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Add to db'),
	async execute(interaction) {
            const score = await Scoreboard.findOne({ where: { name: interaction.user.id } });

            if (!score)
            {
                Scoreboard.create({
                    name: interaction.user.id,
                    top1: 0,
                    top2: 0,
                    top3: 0,
                });
                return interaction.reply(`Added in ${Scoreboard.name}.`);
            }
            else
            {
                return interaction.reply(`You were already in.`);
            }
	},
};