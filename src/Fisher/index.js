const mineflayer = require("mineflayer");
const { Movements, pathfinder } = require("mineflayer-pathfinder");
const MinecraftData = require("minecraft-data");
const botEssentials = require("../listeners/essentials.js");
const findBlock = require("../utils/findBlock.js");
const { goals } = require("mineflayer-pathfinder");
const { store } = require("../utils/inventory");
const dormir = require("../utils/dormir.js");
const { GoalNear } = goals;

function fisherBot(username, id) {
  let chest = null;
  let pos = null;

  const bot = mineflayer.createBot({
    username,
    port: process.env.PORT ? parseInt(process.env.PORT) : 25565,
    host: process.env.HOST,
    version: "1.16.1",
  });
  const mcData = MinecraftData(bot.version);
  const defaultMove = new Movements(bot, mcData);

  bot.loadPlugin(pathfinder);
  bot.pathfinder.setMovements(defaultMove);

  botEssentials(bot, id);

  bot.on("chat", (username, message) => {
    if (username == bot.username) return;

    const comando = message.split(" ")[0];
    const args = message.split(" ").slice(1, message.split(" ").length);

    if (comando === "!bot" && args[0] === id) {
      if (args[1] === "guardar") {
        store(bot, chest, mcData);
      }

      if (args[1] === "set") {
        if (args[2] === "bau") {
          const position = bot.players[username].entity.position;

          chest = findBlock("chest", 4, position, bot);
        } else if (args[2] === "pos") {
          const position = bot.players[username].entity.position;
          const yaw = bot.players[username].entity.yaw;

          pos = {
            x: position.x,
            y: position.y,
            z: position.z,
            yaw,
          };

          const pescar = () => {
            bot.pathfinder.setGoal(new GoalNear(pos.x, pos.y, pos.z, 1));

            bot.once("goal_reached", () => {
              const vara = bot.inventory.findInventoryItem(
                mcData.itemsByName.fishing_rod.id,
                null,
                false
              );
              if (vara) {
                bot.equip(vara, "hand");
                bot.look(pos.yaw, 0, false, () => {
                  setTimeout(() => {
                    bot.fish((err) => {
                      if (!err) {
                        store(bot, chest, mcData).then(() => {
                          if (bot.time.isDay) {
                            pescar();
                          } else {
                            dormir(bot).then(() => {
                              pescar();
                            });
                          }
                        });
                      } else {
                        console.log(err);
                      }
                    });
                  }, 600);
                });
              } else {
                bot.chat("to sem vara bro");
              }
            });
          };

          if (chest) {
            pescar();
          } else {
            bot.chat("define o baú primeiro krl");
          }
        }
      }
    }
  });

  return bot;
}

module.exports = fisherBot;
