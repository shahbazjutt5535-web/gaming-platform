const PlatformSettings = require("../models/PlatformSettings");

async function generateResult() {

  const settings = await PlatformSettings.findOne();

  const winChance = settings ? settings.winProbability : 0.48;

  const random = Math.random();

  if (random < winChance) {
    return "win";
  }

  return "lose";
}
