const task = require("../models/task");

exports.readTask = async (req, res) => {
    if(req.session.code){
        task.model.findAll({
            where: {
               code : req.session.code
            }
        }).then(tasks =>{
            req.session.tasks = tasks;
            if(tasks){
                res.render("homepage", {userdata: req.session.userdata, username: req.session.username, code: req.session.code, tasksList: req.session.tasks, loggedIn: req.session.loggedIn});
            }
        })
    }else{
        res.redirect("index");
    }
}

exports.createTask = async (req, res) => {
    console.log(req.session.code);
    if(req.session.code){
        let result = await task.model.create({
            code: req.session.code,
            task: req.body.task,
            status: "Not Completed"
        })
        if(!result){
            res.render("createNewTask", {userdata: req.session.userdata, username: req.session.username, code: req.session.code, tasks: req.session.tasks, loggedIn: req.session.loggedIn});
        }else{ 
            res.redirect("/task/read_task");
        }
    }else{
        res.redirect("/");
    }
}

exports.createNewTask = (req, res) =>{
    res.render("createNewTask", {code: req.query.code});
}

exports.makeTask = (req, res) => {

    if(req.session.code){
        res.render("homepage", {userdata: req.session.userdata, username: req.session.username, code: req.session.code, tasksList: req.session.tasks, loggedIn: req.session.loggedIn})
    }else{
        res.redirect("/");
    }
}



exports.updateTask = async (req, res) => {
    
    if(req.session.code){
        let result = await task.model.update({status: "Completed"},
            {
                where:{
                    id: req.query.id
                }
            })
            if(!result){

            }else{
                res.redirect("/task");
            }
    }else{
        res.redirect("/");
    }
}

exports.deleteTask = async (req, res) => {
    if(req.session.code){
        await task.model.destroy({
            where: {
                id: req.query.id
            }
        }).then(result => {
            if(result){
                res.redirect("/task/read_task");
            }else{
                res.redirect("/task/read_task");
            }
        })
    }else{
        res.redirect("/");
    }
}

// generateCode = () => {
//     let generate = "";
//     const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const length = 32;
//     for ( var i = 0; i < length; i++ ) {
//         generate += char.charAt(Math.floor(Math.random() * char.length));
//     }
//     return generate;
// }