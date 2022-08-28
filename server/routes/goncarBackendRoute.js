import express from "express";
import {
    addTrainee,
    updateTrainee,
    displayTrainee,
    createTraineeReg,
    updateTraineeReg,
    displayTraineeReg,
    deleteTraineeReg,
    viewTraineeMaster,
    createCourse,
    updateCourse,
    newTrainingYr,
    updateTrainingYr,
    viewCourse,
    viewCourseMaster,
    viewTrainingYrMaster
} from "../controller/goncarBackendController.js";

const router = express.Router();

export default router;