const { SlashCommandBuilder } = require('@discordjs/builders');
const process_prediction = require('./process-prediction.js');
const { Scoreboard } = require('./database.js')

module.exports = {
    add_db: function(interaction, score) {
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
    },
};