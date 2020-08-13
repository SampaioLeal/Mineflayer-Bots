const findBlock = require("./findBlock");

function dormir(bot) {
  return new Promise((resolve) => {
    const bed = findBlock("cyan_bed", 10, bot.entity.position, bot);
    if (bed) {
      bot.sleep(bed, (err) => {
        if (err) {
          bot.chat(`n consigo: ${err.message}`);
          resolve();
        } else {
          bot.chat("zzzzzzzzz");
          bot.once("wake", resolve);
        }
      });
    } else {
      bot.chat("kd a cama??");
      resolve();
    }
  });
}

module.exports = dormir;
