var DataTypes = require("sequelize").DataTypes;
var _conversations = require("./conversations");
var _messages = require("./messages");
var _participants = require("./participants");
var _users = require("./users");

function initModels(sequelize) {
  var conversations = _conversations(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);
  var participants = _participants(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  messages.belongsTo(conversations, { as: "conversation", foreignKey: "conversation_id"});
  conversations.hasMany(messages, { as: "messages", foreignKey: "conversation_id"});
  conversations.belongsTo(users, { as: "created_by_user", foreignKey: "created_by"});
  users.hasMany(conversations, { as: "conversations", foreignKey: "created_by"});
  
  
  return {
    conversations,
    messages,
    participants,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
