const express = require("express");
const router = express.Router();
// const auth = require("../auth");
const taskController = require("../controllers/taskController");

router.post("/create_task", taskController.createTask);
router.get("/read_task", taskController.readTask);
router.post("/update_task", taskController.updateTask);
router.post("/delete_task", taskController.deleteTask);
module.exports = router;