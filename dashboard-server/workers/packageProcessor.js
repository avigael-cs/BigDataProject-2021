const { redis } = require("../redis");

const processPackage = (message) => {
  console.log("Id: %s. Data: %O", message[0], message[1]);
  let newPackage;
  try {
    newPackage = JSON.parse(message[1][1]);

    //Code that pushes into firebase here

  } catch (e) {
    console.log(`Failed to process package: ${e}`)
  }
};

async function listenForPackages(lastId = "$") {
  // `results` is an array, each element of which corresponds to a key.
  // Because we only listen to one key (mystream) here, `results` only contains
  // a single element. See more: https://redis.io/commands/xread#return-value
  const results = await redis.xread("block", 0, "STREAMS", "sendPackages", lastId);
  const [key, messages] = results[0];

  messages.forEach(processPackage);

  // Pass the last id of the results to the next round.
  await listenForPackages(messages[messages.length - 1][0]);
}

module.exports = {
  listenForPackages
}