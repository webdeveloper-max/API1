const express = require('express')
const sqlite = require('sqlite3').verbose()
const {v4:uuidv4}= require('uuid');
 const bodyParser= require('body-parser')

const router = express.Router();
let users = []

const db= new sqlite.Database('data.db');
db.run("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT NOT NULL, surname TEXT, age INTEGER)");


router.get('/',(req, res)=>{
    
    res.send(users);
});
router.post('/', (req, res)=>{
     const user= req.body;
     firstName= user["firstName"]
     surname=user["surname"]
     age =user["age"]

     users.push({...user, id:uuidv4()});
     db.run("INSERT INTO users(firstName,surname,age) VALUES(?,?,?)", firstName,surname,age)
    res.send(`User with the name ${user.firstName} added to the database!`);
});
router.get('/:id',(req, res)=>{
    const { id }= req.params;
    const foundUser=users.find((user)=>user.id===id);
    res.send(foundUser);
});
router.delete('/:id',(req, res)=>{
    const { id }=req.params;
    users=users.filter((user)=> user.id !==id);
    db.run('DELETE FROM users WHERE id = ?',id);
    res.send(`User with the id ${id} deleted from the database`);
    
});
router.patch('/:id',(req, res)=>{
     const { id }= req.params;
    console.log(req.body)
     const user= users.find((user)=> user.id===id);
     const {firstName, surname, age}= req.body;
     console.log(users)
    //if(firstName)user.firstName=firstName;
    //  if(surname)user.surname=surname;
    //  if(age)user.age=age;
    
     db.run('UPDATE users SET firstName = ?, surname=? ,age=? WHERE id=?',[firstName,surname, age,id]);
    res.send(`User with the id${id}has been updated`);
     
})

 module.exports = router;
