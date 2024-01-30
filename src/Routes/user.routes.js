import { Router } from "express";
import { registerUser } from "../Controller/user.controller.js";
import {upload} from "../Middlewares/Multer.middleware.js"

const router = Router()



router.route("/register").post(
    upload.fields([
        {
            name:"avtar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)

export default router;