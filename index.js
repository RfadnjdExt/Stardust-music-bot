const config = require("./config.js");

if (config.shardManager.shardStatus == true) {
  const { ShardingManager } = require("discord.js");
  // const { ClusterManager } = require("discord-hybrid-sharding")
  const manager = new ShardingManager("./bot.js", {
    totalShards: "auto",
    token: config.TOKEN || process.env.TOKEN,
    timeout: -1,
    respawn: true
  });
  manager.on("shardCreate", (shard) =>
    console.log(`Launched shard ${shard.id}`)
  );
  manager.spawn({ amount: 'auto', delay:5500, timeout: 30000 }).catch(e => console.log(e))
  // manager.spawn();
} else {
  require("./bot.js");
}
