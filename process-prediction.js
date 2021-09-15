module.exports = {
    predictionGoing: false,
    prediction: [],
    about: "",
    get_date: function(myDate) {
        const date = new Date(myDate)
        const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
        const time_string = hours + ":" + minutes + ":" + seconds;
        return time_string;
    },
    find_closer: function(bot, prediction, end_time, minimum_time) {
        var winner = (bot, minimum_time);
        for (var i = 0; i < prediction.length; i++)
        {
            if (Math.abs(end_time - prediction[i][1]) < minimum_time)
            {
                winner = prediction[i];
                minimum_time = Math.abs(end_time - prediction[i][1])
            }
        }
        return winner;
    }
}