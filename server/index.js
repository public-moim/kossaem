const express = require('express');
const app = express();
const PORT = process.env.PORT ?? 18800;

const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const quizRoute = require('./routes/quiz')
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors')
const pool = require('./db')
//middleware
app.use(express.json())
// app.use(
//     cors({
//       //origin: "http://localhost:3000",
//       origin: "http://3.38.136.3/"
//     })
//   );
app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/quiz", quizRoute)

app.get('/', async (req,res)=> {
  let msg = "connected to db";

  
  res.send(msg);

//   try {
        
//     const quiz = await pool.query(`SELECT *, ROW_NUMBER () OVER (ORDER BY id) FROM quiz_register`)
//     const quiz_length = quiz.rows.length
    
    
// } catch (error) {
//     console.log(error)
// }


 
})



app.listen(PORT,()=>{
    console.log(`Backend server is running on PORT ${PORT}!`)
})