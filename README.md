# Prediction Bot
This is a Discord Bot made for prediction.<br>
It is curently composed of six commands:<br>
  - Create -> create the prediction (need a name)
  - Predict -> predict with an integer
  - For Other -> predict for someone else
  - Delete -> Delete your prediction
  - See -> see all thoses who have predicted and their prediction
  - End -> end the prediction and find the closest one (even passed one)
  - Help -> list all commands with their description
  
## Setup
First go to the main directory and run `npm install`<br>
Then you need to create a file named config.json.
The content should be in this form
```
{
  "token": "Your app token",
  "guildId": "The id of the guild",
  "userId": "The id of your bot"
}
```