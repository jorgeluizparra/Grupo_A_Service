module.exports = app => {
    var router = require("express").Router();
    const signup = require("../controllers/signup.controller.js");

    const { checkSchema } = require('express-validator');
  
    var router = require("express").Router();

    // Get all registers
    router.get("/", signup.getAll);

    // Create a new register
    router.post("/", checkSchema({
        name: {
            in: ['body'],
            isString: true,
            toLowerCase: true,
            notEmpty: true,
            optional: {
                checkFalsy: true
            },
            errorMessage: 'Nome inválido.'
        },
        email: {
            in: ['body'],
            isEmail: true,
            toLowerCase: true,
            notEmpty: true,
            errorMessage: 'Email inválido.'
        },
        studentNumber: {
            in: ['body'],
            isInt: true,
            isLength: {
                errorMessage: 'Registro academico deve conter 6 numeros.',
                options: 6
            },
            errorMessage: 'Registro acadêmico inválido.'
        },
        cpf: {
            in: ['body'],
            isInt: true,
            isLength: {
                errorMessage: 'CPF deve conter 11 numeros.',
                options: 11
            },
            errorMessage: 'CPF inválido.'
        }
    }), signup.create);

    // Update a register
    router.put("/:id", checkSchema({
        id: {
            in: ['params'],
            isInt: true,
            toInt: true,
            errorMessage: 'O id esta errado.',
        },
        name: {
            in: ['body'],
            errorMessage: 'O nome não foi enviado',
        },
        email: {
            in: ['body'],
            errorMessage: 'O email não foi enviado',
        }
    }), signup.update);

    // Delete a register
    router.delete("/:id", checkSchema({
        id: {
            in: ['params'],
            isInt: true,
            toInt: true,
            errorMessage: 'O id esta errado.',
        }
    }), signup.delete);
  
    app.use('/api/v1/signups', router);
};