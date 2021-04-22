const express = require('express');
const app = express();
const accountRoutes = require("./routes/accountRoutes");
const taskRoutes = require("./routes/taskRoutes");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get("/", (req, res) =>{
    console.log("Index Page accessed");
    res.render("index");
});

// app.post("/", (req, res) => {
//     connection.query("SELECT uuid, username, password FROM accounts WHERE username = ?", req.body.username, (err, results) => {
//         if (err) throw err;

//         if (results[0].username === req.body.username){
//             bcrypt.compare(req.body.password, results[0].password, (err,result)=>{
//                 if (result === true){
//                     console.log("Password correct!");
//                     loggedIn = true;
//                     userdata = results;
//                     res.redirect("/homepage/"+userdata[0].uuid);
//                 }else{
//                     console.log("Incorrect password entered!");
//                     res.write('<p>Incorrect password</p>');
//                     res.write('<a href="/">Back to Login</a>'); 
//                 }
//             })
//         }
//     })
// })

app.get("/createAccount", (req, res) =>{
    console.log("Create Account Page accessed");
    res.render("createAccount");
});

app.post("/createAccount", async (req, res) => {

    if(req.body.password === req.body.secondPassword){
        
        //Code for bcrypt password
        try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        }catch(err){
            res.status(500).send();
        }

        req.body.account_type = "client";
        req.body.uuid = genCode();
        connection.query('INSERT INTO accounts (uuid, username, password, account_type) VALUES ("'+req.body.uuid+'", "'+req.body.username+'", "'+req.body.password+'", "'+req.body.account_type+'")', (err, results) => {
            if(err) throw err;
            res.write('<p>Account created!</p>');
            res.write('<a href="/">Proceed to Login!</a>');
        })

    }else{
        res.write("<p>Passwords should match!</p>");
        res.write('<a href="/createAccount">Create account again</a>');
    }
});

app.get("/homepage/:uuid", (req, res) => {
    if(loggedIn === true){
        connection.query('SELECT id, account_uuid, task, status, created_at FROM tasks WHERE account_uuid = ?', req.params.uuid, (err, result) => {
            if(err) throw err;
            console.log("Query made!");
            tasksList = result;
            console.log(tasksList);
            console.log(userdata[0])
        })
       
        console.log("Home page accessed!");
        res.render("homepage", {userdata : userdata, tasksList : tasksList})
        // res.render("homepage", );
    }else if(loggedIn === undefined){
        res.redirect('/');
    }
})

// app.post()

app.get("/createNewTask/:uuid", (req, res) => {
    if(loggedIn === true){
        res.render("createNewTask", {uuid : req.params.uuid});
    }else if (loggedIn === undefined){
        res.redirect('/');
    }
})

app.post("/createNewTask", (req, res) => {
    if(loggedIn === true){
    console.log(req.params);
    console.log(userdata);
    console.log(req.body)
    req.body.status = "Not completed"
        connection.query('INSERT INTO tasks (account_uuid, task, status, created_at) VALUES ("'+userdata[0].uuid+'", "'+req.body.task+'", "'+req.body.status+'", NOW())', (err, results) => {
            if(err) throw err;
            res.redirect("/homepage/"+userdata[0].uuid);
        })
    }
})

app.get("/deleteTask", (req, res) => {
    if(loggedIn === true){
        connection.query('DELETE from tasks WHERE id = '+req.query.id, (err) => {
            if(err) throw err;
            res.redirect("/homepage/"+userdata[0].uuid);
        })
    }else{

    }
})

app.get("/logout", (req,res) => {
    userdata = null;
    tasks = null;
    isLoggedIn = undefined;
    res.redirect('/');
})

app.listen(3000);