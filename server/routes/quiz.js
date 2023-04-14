const router = require('express').Router();
const pool = require('../db')
const AWS = require('aws-sdk')
const dotenv = require('dotenv')
dotenv.config();

require('aws-sdk/lib/maintenance_mode_message').suppress = true;






//REGISTER QUIZ
router.post('/register', async (req,res)=> {
    const {question, options, category, level, mediaLink, instructions} = req.body
    const answer = (req.body.answer)
    try {
        const newQuiz = await pool.query(`INSERT INTO quiz_register (question, options, 
            answer, category, type, filepath, instructions) VALUES($1, $2, $3, $4, $5, $6, $7)`,
            [question,options, answer, category, level, mediaLink, instructions])
            res.status(200).json({isSuccess:'ok'})
    } catch (error) {
        console.log(error)
    }
})

//CALL QUIZ
router.get('/register', async (req,res) => {
    
    try {
        
        const quiz = await pool.query(`SELECT *, ROW_NUMBER () OVER (ORDER BY id) FROM quiz_register`)
        const quiz_length = quiz.rows.length
        //let test = quiz.rows.map(({id})=> id)
        //let min_id = Math.min(...test)
        
        //get random id
        const rand = Math.floor(Math.random()*quiz_length)+1;
        
        const rand_quiz = await pool.query(`SELECT * FROM (
            SELECT *, ROW_NUMBER () OVER (ORDER BY id) FROM quiz_register
        ) x WHERE ROW_NUMBER=$1`,[rand])
        res.status(200).json(rand_quiz.rows)
        
    } catch (error) {
        console.log(error)
    }
})

//ADMIN CALL QUIZ
router.get('/admin/register', async (req,res) => {
    const category = req.query.category
    const id = req.query.id
    
    try {

        const quiz = category
        ? await pool.query(`SELECT * FROM quiz_register WHERE category LIKE $1`,[category +'%'])
        : id
        ?await pool.query(`SELECT * FROM quiz_register WHERE id=$1`,[id])
        : await pool.query(`SELECT * FROM quiz_register`)

        // if (category){
        //     const quiz= await pool.query(`SELECT * FROM quiz_register WHERE category LIKE $1`,[category +'%'])
        // } else if(id){
        //     const quiz = await pool.query(`SELECT * FROM quiz_register WHERE id=$1`,[id])
        // } else{
        //     const quiz = await pool.query(`SELECT * FROM quiz_register`)
        // }
        
        res.json(quiz.rows)
    } catch (error) {
        console.log(error)
    }
})

//RECORD QUIZ
router.post('/record', async (req,res) => {
    const {user_id, quiz_id, answer} = req.body
    let result='correct'
    let point_earned = 0
    const date=new Date()
    
    try {
        
        const getAnswer = await pool.query(`SELECT answer FROM quiz_register WHERE id=$1`,[quiz_id])
        
        if (getAnswer.rows[0].answer === answer){
result='correct'
point_earned = 3
        } else {result='false'
    point_earned=0}

        const record = await pool.query(`INSERT INTO quiz_record (user_id, quiz_id, result, point_earned, youranswer,date) VALUES($1, $2, $3, $4, $5, $6)`,[user_id,quiz_id, result, point_earned, answer,date])
        //console.log(getAnswer.rows[0].answer, answer)
        
        res.json({isSuccess:'ok', result:result, point:point_earned})
    } catch (error) {
        console.log(error)
    }
})

//GET QUIZ RECORD
router.get('/record/:id', async (req,res) => {
    //const quizId = req.query.quizid;
   const userId = req.params.id

   const category = req.query.category
    
   
    try {
        if(!category){
            const record = await pool.query(`SELECT 
            quiz_record.id, user_id, quiz_id, result, point_earned, youranswer, question, category, type , date
            FROM quiz_record LEFT JOIN quiz_register ON quiz_register.id = quiz_record.quiz_id WHERE user_id=$1`,[userId])
            //console.log(record.rows)
            res.json(record.rows)
        }else if(category){
            const record = await pool.query(`SELECT 
            quiz_record.id, user_id, quiz_id, result, point_earned, youranswer, question, category, type , date
            FROM quiz_record LEFT JOIN quiz_register ON quiz_register.id = quiz_record.quiz_id WHERE user_id=$1 AND category LIKE $2 `,[userId, category +'%'])
            //console.log(record.rows)
            res.json(record.rows)
        }
        
    } catch (error) {
        console.log(error)
    }
})

//EDIT QUIZ
router.put('/register/:id', async (req,res) => {
    const quiz_id = req.params.id
    const {question, options, category, level, mediaLink, instructions} = req.body
    const answer = (req.body.answer)
    try {
        const update = await pool.query(`UPDATE quiz_register SET question=$1, options=$2,answer =$3,
        category=$4, type=$5, filepath=$6, instructions=$7 WHERE id=$8`,[question, options,answer, category,level,mediaLink,instructions , quiz_id])
        res.json(update)
    } catch (error) {
        console.log(error)
    }
} )
//DELETE QUIZ
router.delete('/register/:id',async (req,res) => {
    const quiz_id = req.params.id
    try {
        const quiz = await pool.query(`DELETE FROM quiz_register WHERE id=$1`,[quiz_id])
        res.json(quiz)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router