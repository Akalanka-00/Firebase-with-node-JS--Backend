
const db = require("../service/initialization")

module.exports = async function getNotification(req,res){

      const snapshot = await db.collection("NotificationCollection")
      .orderBy("pushed_date")
      .startAt(0)
      .limit(10)
      .get();

      const list = snapshot.docs.map((doc)=>({id: doc.id, ...doc.data()}));
      res.send(list)

    console.log(req.body)

}