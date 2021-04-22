const account = require("../models/account");

exports.createAccount = async (req, res) => {

    req.body.code = generateCode();
    
    let data = await account.model.create(
        req.body
    )
    console.log(data);
}

exports.readAccount = async (req, res) => {
    let data = await account.model.findByPk(
        req.body.id,
        {raw: true}
    )
    console.log(data);
}

exports.updateAccount = async (req, res) => {
    let data = await account.model.update(
        {password: "P@55v0rd"},
        {
            where: {
                id: req.body.id
            }
        }
    )
    console.log(data);
}

exports.deleteAccount = async (req, res) => {
    let data = await account.model.destroy({
        where: {
            id: req.body.id
        }
    })
    res.send({value: data});
}

generateCode = () => {
    let generate = "";
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 32;
    for ( var i = 0; i < length; i++ ) {
        generate += char.charAt(Math.floor(Math.random() * char.length));
    }
    return generate;
}