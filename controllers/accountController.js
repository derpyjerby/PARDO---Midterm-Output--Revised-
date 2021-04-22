const account = require("../models/account");
const bcrypt = require("bcrypt");

exports.registerAccount = (req, res) => {
    res.render("createAccount")
}

exports.createAccount = async (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    await account.model.create({
        code: generateCode(),
        username: req.body.username,
        password: hash
    }).then(result => {
        if(result){
            res.redirect('/');
        }
    }).catch(err => {
        res.render("createAccount", {err:"Cannot create account!"})
    })

    // if(req.body.password === req.body.secondPassword){
        
    //     //Code for bcrypt password
    //     try{
    //     const hashedPassword = await bcrypt.hash(req.body.password, 10);
    //     req.body.password = hashedPassword;
    //     }catch(err){
    //         res.status(500).send();
    //     }


    //     req.body.uuid = genCode();
    //     connection.query('INSERT INTO accounts (uuid, username, password, account_type) VALUES ("'+req.body.uuid+'", "'+req.body.username+'", "'+req.body.password+'", "'+req.body.account_type+'")', (err, results) => {
    //         if(err) throw err;
    //         res.write('<p>Account created!</p>');
    //         res.write('<a href="/">Proceed to Login!</a>');
    //     })

    // }else{
    //     res.write("<p>Passwords should match!</p>");
    //     res.write('<a href="/createAccount">Create account again</a>');
    // }
}

// exports.readAccount = async (req, res) => {
//     let data = await account.model.findByPk(
//         req.body.id,
//         {raw: true}
//     )
//     console.log(data);
// }

// exports.updateAccount = async (req, res) => {
//     let data = await account.model.update(
//         {password: "P@55v0rd"},
//         {
//             where: {
//                 id: req.body.id
//             }
//         }
//     )
//     console.log(data);
// }

// exports.deleteAccount = async (req, res) => {
//     let data = await account.model.destroy({
//         where: {
//             id: req.body.id
//         }
//     })
//     res.send({value: data});
// }
exports.loginAccount = async (req, res) => {
    let data = await account.model.findOne({where: {username: req.body.username}});

    if (data.username === null) {
        console.log('Not found!');
        res.redirect('/');
    } else {
        bcrypt.compare(req.body.password, data.password, (err, result) => {
            if(err){throw err;}
            if( (data.username == req.body.username) && result){
                req.session.loggedIn = true;
                req.session.username = data.username;
                req.session.userdata = data;
                req.session.code = data.code;
                res.redirect("/task/read_task");
            }else{
                res.redirect("/");
            }
        });    
    }
}

var generateCode = () => {
    let generate = "";
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 32;
    for ( var i = 0; i < length; i++ ) {
        generate += char.charAt(Math.floor(Math.random() * char.length));
    }
    return generate;
}