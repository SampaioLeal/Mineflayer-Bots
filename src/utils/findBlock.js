const vec3 = require("vec3");

function findBlock(type, size, point, bot) {
  let block = null;
  let shortest = null;

  const x1 = Math.floor(point.x - size);
  const x2 = Math.floor(point.x + size);
  const y1 = Math.floor(point.y - size);
  const y2 = Math.floor(point.y + size);
  const z1 = Math.floor(point.z - size);
  const z2 = Math.floor(point.z + size);

  for (let x = x1; x < x2; x++) {
    for (let y = y1; y < y2; y++) {
      for (let z = z1; z < z2; z++) {
        const cPoint = vec3({ x, y, z });
        const cBlock = bot.blockAt(cPoint);

        if (cBlock) {
          if (cBlock.name == type) {
            if (!shortest || shortest > cPoint.distanceTo(point)) {
              shortest = cPoint.distanceTo(point);
              block = cBlock;
            }
          }
        }
      }
    }
  }

  return block;
}

module.exports = findBlock;
