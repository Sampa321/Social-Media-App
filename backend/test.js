import jwt from "jsonwebtoken"
// generate a token and sent to frontend 
const secret = "some"
// const data =  { _id : "12839wsnu2839jjj383"}
const data =  { _id : "12839wsnu2839jjj383"}
const output = jwt.sign( data , secret)
console.log("Token : " + output);


// // token to data convert 
// const data = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjgzOXdzbnUyODM5ampqMzgzIiwiaWF0IjoxNzg3MzgzNzAzfQ.lsVrEyF0E-juJ29XwBwIp7fetUReGQ50VyrAPvkaCJs",  secret )
// console.log(data._id);