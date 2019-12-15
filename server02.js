
//ต้องloginก่อนเพื่อเข้าถึงข้อมูล
const express = require("express");
const app = express();


const bodyParser = require("body-parser"); //bodyจากpostman
app.use(bodyParser.json());  //ทำให้รับ json จาก body ได้ ในpostman

const loginMiddleware = function(req, res, next) {
   if(req.body.username === "Tanaka" && req.body.password === "tuna") //check username & password
   next(); // ทำfnต่อไป
   else res.send("Wrong username and password") 
   //ถ้า username password ไม่ตรงให้ส่งว่า Wrong username and password
}
app.post("/login", loginMiddleware, function(req, res) {
   res.send("Login success");
});

app.listen(3001);