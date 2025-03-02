const express = require('express');
const cors = require("cors");
const mysql = require('mysql2');
const app = express();


// Creating connection with  Mysql server 

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'717822Z108',
    database:'studentdetails'

})

app.use(cors());
app.use(express.json());

//Connecting to Mysql Sever

db.connect(
    (err) =>{
        if(err) {
            console.error('Error in connection', err);
            return;
        }
        console.log("connection succesful")

    }
)

//Endpoint to add new student 

app.post("/new-Student",(req,res)=>{
    const { ID, Name , Age, E_mail , Address }=req.body;
    //SQL query to insert a new student
    const sql = 'INSERT INTO Student_info(ID, Name , Age, E_mail , Address) values (?,?,?,?,?)';
    
//Execute the query
db.query(sql,[ID, Name, Age, E_mail, Address],(err, result)=>{
    if(err){
        console.error('error executing query:',err);
        res.status(500).send('Error inserting Student Record');
        return;
    }
    console.log('Student record inserted:', result);
    res.status(204).send('Student record inserted successfully');
})
});

// Endpoint to search for students
app.get('/search', (req, res) => {
    const searchQuery = req.query.q; // Get the search query from the request URL
    if (!searchQuery) {
        return res.status(400).send('Search query is required');
    }

// SQL query to search for students by name, ID, or email.
    const sql = `SELECT * FROM Student_info WHERE Name LIKE ? OR ID LIKE ? OR E_mail LIKE ? `;

    const searchPattern = `%${searchQuery}%`; // Add wildcards for partial matching

// Execute the query
    db.query(sql, [searchPattern, searchPattern, searchPattern, searchPattern], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Database error');
        }
        res.json(results); // Return the search results
    });
});


//  API to fetch data
// app.get(
//     '/details',(req,res) =>{ 
//         const query = 'SELECT * FROM student_info';
//         db.query(
//             query, (err,result) =>{
//                 if(err){
//                     return res.status(200).json({error: 'Database Error'})
//                 }
//                 res.json(result)
//             }
//         );

//     }
// );

// app.put(
//     '/update',(req,res)=>{
//         const query= 'UPDATE student_info SET age= age+2 WHERE age=21';
//         db.query(
//             query, (err,result) =>{
//                 if(err){
//                     return res.status(200).json({error: 'Database Error'})
//                 }
//                 res.json(result)
//             }
//         )
//     }

// );




// app.post(
//     '/create',(req,res)=>{
//         const query ='INSERT into student_info (ID,Name,Age,E_mail,Address) VALUES (11,"deebak",22,"deebak@gamil.com","6/14 dpm") ';
//         db.query(
//             query, (err,result)=>{
//                 if(err){
//                     return res.status(200).json({error: 'Database Error'})
//                 }
//                 res.json(result)
//             }
//         )
//     }
// );

// app.delete(
//     '/delete',(req,res)=>{
//         const query= 'DELETE FROM student_info WHERE id=11';
//         db.query(
//             query, (err,result) =>{
//                 if(err){
//                     return res.status(200).json({error: 'Database Error'})
//                 }
//                 res.json(result)
//             }
//         )
//     }

// );


// starting server
const port = 3001;
app.listen(port,()=>{
    console.log(`Running on http://localhost:${port}`);
});