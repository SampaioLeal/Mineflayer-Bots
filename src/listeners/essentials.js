const dormir = require("../utils/dormir");
const vemk = require("../utils/vemk");

function botEssentials(bot, id) {
  console.log("Bot Essentials starting for BOT " + id);
  bot.on("chat", (username, message) => {
    if (username == bot.username) return;

    const comando = message.split(" ")[0];
    const args = message.split(" ").slice(1, message.split(" ").length);

    if (comando === "!bot" && args[0] === id) {
      if (args[1] === "vemk") {
        vemk(bot, username);
      }

      if (args[1] === "dormir") {
        dormir(bot);
      }
    }
  });
}

module.exports = botEssentials;
