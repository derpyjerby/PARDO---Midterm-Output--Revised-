const express = require("express");
const router = express.Router();
const auth = require("../auth");
const accountController = require("../controllers/accountController");

router.post("/create_account", accountController.createAccount);
router.get("/read_account", auth.checking,accountController.readAccount);
router.post("/update_account", accountController.updateAccount);
router.post("/delete_account", accountController.deleteAccount);
module.exports = router;