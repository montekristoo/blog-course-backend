import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'

import {
    registerValidation,
    loginValidation,
    postCreateValidation
} from './validations/validations.js'

import {
    handleValidErrors,
    checkAuth
} from './utils/index.js'
import {
    UserController,
    PostController
} from "./controlers/index.js";

mongoose.connect(
        "mongodb+srv://admin:1s2a3dqwer5@cluster0.aunblf7.mongodb.net/blog?retryWrites=true&w=majority"
    ).then(() => console.log("DB ok!"))
    .catch((err) => console.log('DB error.', err))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage
})


app.use(express.json())
app.use(cors());
app.use("/uploads", express.static('uploads'))
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})
app.post("/auth/login", loginValidation, handleValidErrors, UserController.login)
app.post("/auth/register", registerValidation, handleValidErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe)
app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.get('/tags', PostController.getLastTags)
app.post('/posts', checkAuth, handleValidErrors, postCreateValidation, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidErrors, PostController.update)

app.listen(3001, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
})