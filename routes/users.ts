import { Router } from "express";
import {check} from 'express-validator';

import { getUsers, postUsers } from "../controllers/user";
import validationForm from "../middlewares/validationForm";


const router = Router(); 


router.get('/', getUsers);

router.post('/',
    [
        check('name', 'Name is empty').not().isEmpty(),
        check('email', 'Add valid email').isEmail(),
        check('password', 'Password must be at least 6 characteres').isLength({min:6}),
        validationForm
    ]
    , postUsers)

export default router; 