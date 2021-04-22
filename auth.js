const express = require("express");
const app = express();

exports.checking = (req, res) => {
    if(req.body.id) {
        console.log(req.body);
        next();
    }else{
        res.send("No valid ID!");
    }
}