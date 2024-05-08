// seed.js
"use strict";

const { default: mongoose } = require("mongoose");

/**
 * Listing 15.9 (p. 224)
 * 새로운 데이터 생성
 */
// 모듈 가져오기
const subscriber = require("./models/Subscriber");
const Subscriber = require("./models/Subscriber");
mongoose.connect(
    "mongodb+srv://user:XAKChOtj4OIqYKyQ@ut-node.z2zjfig.mongodb.net/?retryWrites=true&w=majority&appName=ut-node"
)
mongoose.connection;
// 데이터베이스 연결 설정



// subscribers 배열 생성 (5개 이상)
var subscribers = [
  {
    name: "asdzx",
    email: "asd@asd.com",
    phoneNumber: false,
  },
  {
    name: "qwea",
    email: "aasdqwe@asd.com",
    phoneNumber: true,
  },
  {
    name: "zxcz",
    email: "aasdasd@asd.com",
    phoneNumber: false,
  },
  {
    name: "qerasf",
    email: "qweq@asd.com",
    phoneNumber: true,
  },
  {
    name: "asdqr",
    email: "qwer@asd.com",
    phoneNumber: false,
  }
];

// 기존 데이터 제거
/*
Subscriber
  .deleteMany({})
  .exec()
  .then(result=>{
    console.log(`Deleted ${result.deletedCount} records`)
  })
  .catch(error=>{
    console.log(`ERROR: ${error.message}`);
    return next(error);
});
*/
var commands = [];

// 프라미스 생성을 위한 구독자 객체 루프
subscribers.forEach(s=>{
  commands.push(
    Subscriber
      .create({
        name:s.name,
        email:s.email,
        newsletter: s.newsletter
      })
      .then(s=>{
        console.log(`Created : ${s.name}`);
      })
  )
})

// 프라미스 생성 후 로깅 작업
Promise.all(commands)
.then(r=>{
  console.log(JSON.stringify(r,null,2));
  mongoose.connection.close();
})
.catch(e=>{ 
  console.log(e)
})
