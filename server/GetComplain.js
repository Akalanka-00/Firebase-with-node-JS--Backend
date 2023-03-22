import admin from "firebase-admin";

import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
db.collection("NotificationCollection")
  .orderBy("pushed_date")
  .startAt(0)
  .limit(10)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((element) => {
      const st = element.data.Status;

      // if(st === "Reviewed"){
      console.log("---------------------------------\n");
      console.log(element.data().title);
      console.log(element.data().description);
      console.log(element.data().Status);
      // }
    });
  });
