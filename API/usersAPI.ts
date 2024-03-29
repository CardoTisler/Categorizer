import {Request, Response} from 'express';
import {JsonWebTokenError} from "jsonwebtoken";
import {verifyJWT} from "../middleware/auth"

const express = require("express")
const router = express.Router();
const User = require("../db/models/user")
const Category = require("../db/models/category")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//register route
interface UserPayload {
    username: string,
    password: string
}

router.post("/register", async (req: Request, res: Response) => {
    const user: UserPayload = req.body;

    const takenUsername = await User.findOne({username: user.username})
    if (takenUsername) {
        res.status(400).send({statusText: "Can not register new user.", error: "Username already taken."})
        return;
    }
    user.password = await bcrypt.hash(req.body.password, 10)
    const addedUsersArr = await User.insertMany([{
        username: user.username.toLowerCase(),
        password: user.password
    }]).catch((err: Error) => {
        return res.status(500).send({statusText: "Could not add user to database", error: err.message});
    });

    const {_id} = addedUsersArr[0];
    Category.insertMany([{
        type: "NONE",
        name: "NONE",
        budget: 1,
        user: _id
    }]).then(() => {
        return res.status(201).send({statusText: "Added new user."});
    }).catch((err: Error) => {
        return res.status(500).send({
            statusText: "Could not finalize user registration",
            error: err.message
        })
    })
})

interface DbUser {
    username: string,
    password: string,
    _id: string,
    createdAt: Date,
    updatedAt: Date
}

//login route
router.post("/login", (req: Request, res: Response) => {
    const userLoggingIn: UserPayload = req.body;

    User.findOne({username: userLoggingIn.username})
        .then((dbUser: DbUser) => {
            if (!dbUser) {
                return res.status(400).send({
                    statusText: "Can not log in.",
                    error: "Invalid username or password."
                })
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password)
                .then((isCorrect: boolean) => {
                    if (!isCorrect) {
                        return res.status(400)
                            .send({
                                statusText: "Can not log in.",
                                error: "Invalid username or password."
                            })
                    }
                    const payload = {id: dbUser._id, username: dbUser.username}
                    jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {expiresIn: 86400},
                        (err: JsonWebTokenError, token: any) => {
                            if (err) {
                                return res.status(500)
                                    .send({statusText: "Signing jwt failed.", error: err.message})
                            }
                            return res.status(200).send({
                                message: "Success",
                                token: `Bearer ${token}`,
                                username: dbUser.username
                            })
                        }
                    )
                })
        })
})

interface AuthenticatedUser {
    id: string,
    username: string,
}

type AuthRequest = Request & { user: AuthenticatedUser }
//route for testing middleware
router.get("/isUserAuth", verifyJWT, (req: AuthRequest, res: Response) => {
    res.status(200).send({username: req.user.username, isLoggedIn: true})
})
module.exports = router;
