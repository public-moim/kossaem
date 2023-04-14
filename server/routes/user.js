const router = require('express').Router();
const pool = require('../db')


router.get('/:id', async (req,res)=> {
    const user_id= req.params.id
    try {
        const users=await pool.query('SELECT * FROM users where id =$1',[user_id])
        res.status(200).json(users.rows)
    } catch (error) {
        console.log(error)
        if (error) {
            res.json({detail:error.detail})
        }
    } 
})

module.exports = router