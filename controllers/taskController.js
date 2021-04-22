const task = require("../models/task");

exports.createTask = async (req, res) => {

    req.body.code = generateCode();
    
    let data = await task.model.create(
        req.body
    )
    console.log(data);
}

exports.readTask = async (req, res) => {
    let data = await task.model.findByPk(
        req.body.id,
        {raw: true}
    )
    console.log(data);
}

exports.updateTask = async (req, res) => {
    let data = await task.model.update(
        {password: "P@55v0rd"},
        {
            where: {
                id: req.body.id
            }
        }
    )
    console.log(data);
}

exports.deleteTask = async (req, res) => {
    let data = await task.model.destroy({
        where: {
            id: req.body.id
        }
    })
    res.send({value: data});
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