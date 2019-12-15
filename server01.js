//check  authorization 
const express = require("express");
const app = express();



const middleware = function(req, res, next) {  // ตรวจสอบว่ามีการอนุญาติหรือไม่
/* ตรวจสอบว่า authorization คือ Boy หรือไม่*/
   if(req.headers.authorization === "Boy") //harders ใน postman 
      next(); //อนุญาตให้ไปฟังก์ชันถัดไป 
   else
      res.send("ไม่อนุญาต")
}; 

app.get("/", middleware, function(req, res) {  //รอฟังการ GET มายัง endpoint "/" และมี middleware ขั้นกลาง
   res.send("ยอดเงินคงเหลือ 50");
});

app.listen(3001); //บอกให้ server รอที่ port 3000
