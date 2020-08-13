const { goals } = require("mineflayer-pathfinder");
const { GoalNear } = goals;

function vemk(bot, username) {
  const target = bot.players[username] ? bot.players[username].entity : null;

  if (target) {
    bot.pathfinder.setGoal(
      new GoalNear(target.position.x, target.position.y, target.position.z, 1)
    );
  } else {
    bot.chat("n to te vendo");
  }
}

module.exports = vemk;
