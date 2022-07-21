# Prediction Bot
This is a Discord Bot made for prediction.<br>
It is curently composed of seven commands:<br>
  - Create -> create the prediction (need a name) (auto register)
  - Predict -> predict with an integer
  - For Other -> predict for someone else (auto register)
  - Delete -> Delete your prediction
  - See -> see all thoses who have predicted and their prediction
  - End -> end the prediction and find the closest one (even passed one)
  - Help -> list all commands with their description
  - Register -> register in th database
  - Scoreboard -> see the score of every registered person
  - Score -> see only your score

The bot's activity also change when it is either waiting for a prediction, or when a prediction is going.

## Setup
First go to the main directory and run `npm install`<br>
Then you need to create a file named config.json.
The content should be in this form
```
{
  "token": "Your app token",
  "guildId": "The id of the guild",
  "clientId": "The id of your bot"
}
```

## Docker
Run `docker build --tag time_prediction .` to build the image. <br>
Or use the precompiled image at `hellscrimson/timeprediction:latest`