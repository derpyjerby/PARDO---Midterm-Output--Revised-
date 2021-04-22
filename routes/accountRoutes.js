const express = require("express");
const router = express.Router();
const auth = require("../auth");
const accountController = require("../controllers/accountController");

router.get("/register_account", accountController.registerAccount);
router.post("/create_account", accountController.createAccount);
router.post("/login_account", accountController.loginAccount);
// router.get("/read_account", auth.checking,accountController.readAccount);
// router.post("/update_account", accountController.updateAccount);
// router.post("/delete_account", accountController.deleteAccount);
module.exports = router;