const JwtStrategy = require("passport-jwt").Strategy; //ใช้ในการประกาศ Strategy แบบjwt 
const passport = require("passport"); //  ไว้ req  middleware ผ่าน passport


const SECRET = "MY_SECRET_KEY"; 

const jwtOptions = {   //opitionจากtoken web json เป็นตัวเลือกวัตถุที่มีตัวอักษรเพื่อควบคุมวิธีดึงโทเค็นจากคำขอหรือตรวจสอบ
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),  //ถอดรหัสจากheader ในpostman ตรงkey ฟังก์ชั่นที่รับคำขอเป็นพารามิเตอร์เพียงและผลตอบแทนทั้ง JWT เป็นสตริงหรือnull 
    secretOrKey: SECRET,  //SECRETเดียวกับตอน encodeในกรณีนี้คือ MY_SECRET_KEY
 }
 const jwtAuth = new JwtStrategy(jwtOptions, function(payload, done) {  //ยืนยันuser  //doneคือข้อผิดพลาดของpassport ซึ่งจะcallbackก่อนยอมรับargument
    if(payload.sub === "Tanaka")  //subคือusername
    return done(null, true );  //ด้านหน้าคือerrแต่ในกรณีนี้ไม่มีerr ด้านหลังคือถ้าifถูกจะทำfunction
    else  return done(null, false); //ถ้าไม่ใช่จะบอกว่าไม่มีสิทธิเข้าถึง
 });

 passport.use(jwtAuth); //เสียบ Strategy เข้า Passport
 const requireJWTAuth = passport.authenticate("jwt",{session:false}); //ทำ Passport Middleware ตรวจสอบคำขอด้วย ่jwt
//การยืนยันตัวตนแบบ jwt
 app.get("/", requireJWTAuth, function(req, res) { //เสียบ middleware ยืนยันตัวตน JWT เข้าไป จะไม่เหมือนอันแรกเพราะมีการcheckการอนุญาติก่อน
    res.send("ยอดเงินคงเหลือ 50");
 });
 
  
 app.listen(3001);
 