const express = require("express");
const router = express.Router();
// const auth = require("../auth");
const taskController = require("../controllers/taskController");

// router.get("/", taskController.getTask);
router.get("/make_task", taskController.makeTask);
router.get("/read_task", taskController.readTask);
router.post("/create_task", taskController.createTask);
router.get("/createNewTask", taskController.createNewTask);
router.get("/update_task", taskController.updateTask);
router.get("/delete_task", taskController.deleteTask);
module.exports = router;