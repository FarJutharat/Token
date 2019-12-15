app.use(bodyParser.json());  //ทำให้รับ json จาก body ได้ ในpostman

const loginMiddleware = function(req, res, next) {
   if(req.body.username === "Tanaka" && req.body.password === "tuna") //check username & password
   next(); // ทำfnต่อไป
   else res.send("Wrong username and password") 
   //ถ้า username password ไม่ตรงให้ส่งว่า Wrong username and password
}
//******same server02.js*****//

//ถ้าผู้ใช้ล็อคอินสำเร็จ เราจะคืน token กลับไป
const jwt = require("jwt-simple"); // jwt-simple เข้ารหัสและถอดรหัสโมดูลสำหรับ node.js
app.post("/login", loginMiddleware, function(req, res) {
    const payload = {
        sub: req.body.username,
        password : req.body.password,
        iat: new Date().getTime()  //มาจากคำว่า issued at time (สร้างเมื่อ) เป็นวินาที
     }; //checkในjwt.io
     
     const SECRET = "MY_SECRET_KEY"; //ในการใช้งานจริง คีย์นี้ให้เก็บเป็นความลับ  secreat เกี่ยวกับการยืนยันตัวตนในserverยืนยันกับserverดพื่อเข้าถึงserverได้
    
     const token = jwt.encode(payload, SECRET);  // encode(ใส่) payload and SECRET ,HS256, HS384, HS512 
     res.send(token);
    //res.send(jwt.encode(payload, SECRET)); //return encode ตรงpayload
  
});

app.listen(3001);