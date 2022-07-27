import {
    body
} from 'express-validator'

export const registerValidation = [
    body("email", "Format de mail gresit.").isEmail(),
    body("password", "Parola trebuie sa aiba minim 5 caractere").isLength({
        min: 5
    }),
    body("fullName", "Introdu numele.").isLength({
        min: 3
    }),
    body("avatarUrl", "Adresa invalia catre poza.").optional().isURL(),
]

export const loginValidation = [
    body("email", "Format de mail gresit.").isEmail(),
    body("password", "Parola trebuie sa aiba minim 5 caractere").isLength({
        min: 5,
    })
];

export const postCreateValidation = [
    body('title', "Tiltul blogului: ").isLength({
        min: 3
    }).isString(),
    body('text ', 'Continutul blogului: ').isLength({
        min: 3
    }).isString(),
    body('tags', 'Formatul incorect al tagurilor.').optional().isString(),
    body('imageUrl', 'Adresa URL incorecta a imaginii.').optional().isString(),
];