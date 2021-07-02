import { Router } from "express";
import { check } from 'express-validator';
import { createProject, getProjects, updateProject, deleteProject } from "../controllers/project";
import validationForm from "../middlewares/validationForm";
import validateJWT from '../middlewares/authentication';
import { findId, validateIdCreator } from "../middlewares/validationDb";

const router: Router = Router();

router.get('/', [
    validateJWT,
    validationForm
], getProjects)


router.post('/',

    [
        validateJWT,
        check('name', 'Enter a topic for your project').not().isEmpty(),
        validationForm
    ]
    , createProject)



router.put('/:id',[
    validateJWT,
    check('id', 'Id not valid').isMongoId(),
    check('id').custom(findId),
    validateIdCreator,
    validationForm
    ], updateProject);


router.delete('/:id', [
    validateJWT, 
    check('id', 'Id not valid').isMongoId(),
    check('id').custom(findId),
    validationForm
    ], deleteProject)

export default router;