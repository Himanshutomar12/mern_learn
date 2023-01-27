import express from "express";
import {addEmployee, showEmployee, deleteEmployee, updateEmployee, getEmp} from "../controller/employee.js";

const router = express.Router();

router.post("/add", addEmployee);
router.get("/", showEmployee);
router.post("/find-by-id", getEmp);
router.post("/delete", deleteEmployee);
router.post("/update", updateEmployee);

export default router;