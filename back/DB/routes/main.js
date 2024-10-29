import { Router } from 'express';
import User from '../models/User.js';
import Ajv from 'ajv';
const ajv = new Ajv();

const router = Router();

const Schema = {
    type: 'object',
    properties: {
        nickname: {
            type: 'string', 
            minLength: 4, 
            maxLength: 20,
            pattern: "^[A-Za-zА-Яа-яІіЄєЇї'’]+$",
        },
        description: {
            type: 'string', 
            maxLength: 100,
        },
        age: {
            type: 'integer',  
            maximum: 120,
        }
    },
    required: ['nickname', 'description', 'age'],
    additionalProperties: false,
};

router.post('/', async (req, res) => {
    const { nickname, description, age } = req.body;
    const parsedAge = parseInt(age, 10);
    
    const valid = ajv.validate(Schema, { ...req.body, age: parsedAge });

    if (valid) {
        const newUser = await User.create({ nickname, description, age: parsedAge });
        res.status(201).json(newUser);
    } else {
        res.status(400).json({ errors: ajv.errors });
    }
});

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

export default router;
