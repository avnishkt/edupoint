const express = require("express");
const { createAssignments, getAssignments, deleteOrUpdateAssignment } = require("../controllers/assignmets");
const authenticateJWT = require("../midleware/authenticate");
const router = express.Router();

// Route to create an assignment (protected route, requires authentication)
router.post("/create", authenticateJWT, createAssignments);

// Route to get assignments (with filtering options and pagination)
router.get("/", getAssignments);

router.put("/update/:id", authenticateJWT, deleteOrUpdateAssignment);
router.delete("/delete/:id", authenticateJWT, deleteOrUpdateAssignment);

module.exports = router;
