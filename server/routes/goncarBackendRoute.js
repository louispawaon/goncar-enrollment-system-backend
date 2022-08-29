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
    viewTrainingYrMaster,
    addCourseBatch,
    updateCourseBatch,
    viewCourseBatch,
    viewCourseBatchMaster
} from "../controller/goncarBackendController.js";

const router = express.Router();

/*ENROLLMENT MANAGEMENT*/
router.post('/dashboard/trainees/add',addTrainee);
router.put('/dashboard/trainees/edit/:id',updateTrainee);
router.get('/dashboard/trainees/:id',displayTrainee);
router.post('/dashboard/trainees/:id/registration/add',createTraineeReg);
router.put('/dashboard/trainees/:id/registration/:id/edit',updateTraineeReg);
router.get('/dashboard/trainees/:id/registration/:id',displayTraineeReg);
router.delete('/dashboard/trainees/:id/registration/:id/delete',deleteTraineeReg);
router.get('/dashboard/trainees',viewTraineeMaster);




export default router;