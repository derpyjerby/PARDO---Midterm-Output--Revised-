const express = require("express");
const router = express.Router();
// const auth = require("../auth");
const accountController = require("../controllers/accountController");
const taskController = require("../controllers/taskController");

router.get("/", (req, res) =>{
    console.log("Index Page accessed");
    res.render("index");
});
router.get("/createAccount", (req, res) =>{
    console.log("Create Account Page accessed");
    res.render("createAccount");
});
router.get("/homepage/:uuid", (req, res) => {

       
        console.log("Home page accessed!");
        res.render("homepage", {userdata : userdata, tasksList : tasksList})
        // res.render("homepage", );
    }else if(loggedIn === undefined){
        res.redirect('/');
    }
})



router.post("/create_account", accountController.createAccount);
// router.get("/read_account", auth.checking,accountController.readAccount);
// router.post("/update_account", accountController.updateAccount);
router.post("/delete_account", accountController.deleteAccount);

router.post("/create_task", taskController.createTask);
router.get("/read_task", taskController.readTask);
router.post("/update_task", taskController.updateTask);
router.post("/delete_task", taskController.deleteTask);

router.get("/logout", (req,res) => {
    userdata = null;
    tasks = null;
    isLoggedIn = undefined;
    res.redirect('/');
})