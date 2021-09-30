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
        var secondMinTime = minimum_time;
        var second = (bot, secondMinTime);
        var thirdMinTime = minimum_time;
        var third = (bot, thirdMinTime);
        for (var i = 0; i < prediction.length; i++)
        {
            if (Math.abs(end_time - prediction[i][1]) < minimum_time) // new winner
            {
                third = second;
                thirdMinTime = secondMinTime;

                second = winner;
                secondMinTime = minimum_time;

                winner = prediction[i];
                minimum_time = Math.abs(end_time - prediction[i][1]);
            }
            else if (Math.abs(end_time - prediction[i][1]) < secondMinTime) // new second
            {
                third = second;
                thirdMinTime = secondMinTime;

                second = prediction[i];
                secondMinTime = Math.abs(end_time - prediction[i][1]);
            }
            else if (Math.abs(end_time - prediction[i][1]) < thirdMinTime) // new third
            {
                third = prediction[i];
                thirdMinTime = Math.abs(end_time - prediction[i][1]);
            }
        }
        return [winner, second, third];
    }
}