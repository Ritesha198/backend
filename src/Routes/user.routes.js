import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../Controller/user.controller.js";
import {upload} from "../Middlewares/Multer.middleware.js"
import { verifyJWT } from "../Middlewares/Auth.middleware.js";

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

    router.route("/login").post(loginUser)

    router.route("logout").post(verifyJWT, logoutUser)

export default router;