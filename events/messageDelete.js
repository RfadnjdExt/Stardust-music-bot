const db = require("../mongoDB");

module.exports = async (client, message) => {
    await db.snipe.create({ messageContent: message.content });
};
