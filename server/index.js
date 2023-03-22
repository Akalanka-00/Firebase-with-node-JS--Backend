const express = require ("express");
const cors = require ("cors");

const dotenv = require ("dotenv")
const bodyParser = require ("body-parser");
var path = require('path')
const db = require("./service/initialization")


const admin_routes = require ("./routes/admin_routes")




dotenv.config();
const app = express();


app.use(cors());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')))

app.use('/api/admin',admin_routes)
app.use('/api/superadmin',admin_routes)
app.use('/api/operator',admin_routes)


app.get("/", (req, res) => {
  res.json("hello this is backend! home from backend server.");
});

app.get("/getnotifications", async (req, res) => {


  var dataCollection = new Array();
    db.collection("NotificationCollection")
      .orderBy("pushed_date")
      .startAt(0)
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          dataCollection.push(element.data());
        });
  
        res.json(dataCollection);
        //console.log(dataCollection);
      });
});

app.listen(process.env.PORT,()=>{
  console.log('server started in port : ',process.env.PORT)
})
