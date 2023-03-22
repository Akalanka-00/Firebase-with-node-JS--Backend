const db = require("../service/initialization");

module.exports = async function pushNotification(req, res) {
  await db.collection("NotificationCollection").add(req.body);
  res.send({msg: "User addded successfully"});

 // res.send("notification push successful.");
};
