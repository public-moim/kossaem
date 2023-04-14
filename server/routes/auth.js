const router = require('express').Router();
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//REGISTER
router.post('/register', async (req,res)=> {
    const clientUrl = req.header('Referer');
    let role_id;
    if(clientUrl.includes('student')){
        role_id = 1
      } else if(clientUrl.includes('teacher')){
        role_id = 2
      }
      const date= new Date().toLocaleDateString()
      

      


    try {
        const {email,username, password} = req.body
        
    const salt = bcrypt.genSaltSync(10)
    const hashedPwd = bcrypt.hashSync(password,salt)

        const newUser = await pool.query(`INSERT INTO users (email, hashed_password, username, role_id, date) VALUES($1,$2,$3,$4, $5)`,
        [email, hashedPwd, username, role_id, date])

        res.status(200).json({isSuccess: 'ok'})
    } catch (error) {
        console.log(error)
        if (error) {
            res.json({detail:error.detail})
        }
    }
})

//LOGIN
router.post('/login', async (req,res) => {
    const date=new Date()
    
    try {
        
      //check username exists or not
      const user = await pool.query(`SELECT * FROM users WHERE username = $1`, [req.body.username])
      if (!user.rows.length) return res.json({error:'username'})

      

      //check password
      const success = await bcrypt.compareSync(req.body.password, user.rows[0].hashed_password)
      if (!success){
        return res.json({error:'password'})
      }

      if (success){
        //generate jwt token
        const token = jwt.sign({id: user.rows[0].id, isAdmin: user.rows[0].role_id},'secretKey');

        const {hashed_password,email, ...others} = user.rows[0];

        res.cookie('accessToken', token,{httpOnly:true}).status(200).json(others)

        
        //check login history

        const login_history = await pool.query(`SELECT * FROM login WHERE user_id = $1`,[user.rows[0].id])
        let login_length=login_history.rows.length-1
        
        if (login_history.rows.length){
            
            if (new Date(login_history.rows[login_length].login_time).toLocaleDateString()!== new Date().toLocaleDateString()){
                await pool.query(`INSERT INTO login (user_id, login_time) VALUES($1,$2) `,[user.rows[0].id, date])
                
            } 
        } else {
            await pool.query(`INSERT INTO login (user_id, login_time) VALUES($1,$2) `,[user.rows[0].id, date])
            
        }
        

        
      }

     
        
    } catch (error) {
        console.log(error)
    }
})

//LOGOUT
router.post('/logout', async (req,res) => {
    try {
        res.clearCookie('accessToken',{
            secure:true,
            sameSite:'none'
        }).json({detail:'log'})
    } catch (error) {
        console.log(error)
    }
    
})

//LOGIN HISTORY
router.get('/login/:id', async (req,res)=> {
const user_id = req.params.id

try {
    const login = await pool.query(`SELECT * FROM login WHERE user_id = $1`, [user_id])
    
    res.json(login.rows)
} catch (error) {
    console.log(error)
}



})



module.exports = router