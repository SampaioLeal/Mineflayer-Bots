const { goals } = require("mineflayer-pathfinder");
const { GoalNear } = goals;

function isFull(inventory) {
  if (inventory.emptySlotCount() === 0) {
    return true;
  } else {
    return false;
  }
}

function store(bot, chest, mcData) {
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  return new Promise((resolve) => {
    bot.pathfinder.setGoal(
      new GoalNear(chest.position.x, chest.position.y + 1, chest.position.z, 2)
    );

    bot.once("goal_reached", () => {
      const bau = bot.openChest(chest);

      bau.once("open", async () => {
        const items = [
          ...new Set(bot.inventory.items().map((item) => item.type)),
        ];

        for (let i = 0; i < items.length; i++) {
          try {
            bau.deposit(items[i], 0, bot.inventory.count(items[i], 0));
          } catch (err) {
            console.log(err);
          }
          await sleep(1000);
        }

        bau.withdraw(mcData.itemsByName.fishing_rod.id, 0, null);

        console.log("Fechando baú!");
        await sleep(1000);

        bau.close();
        resolve();
      });
    });
  });
}

module.exports = {
  isFull,
  store,
};
