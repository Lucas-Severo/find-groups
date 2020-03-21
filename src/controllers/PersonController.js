const Person = require('../models/Person');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateToken(params = {}) {
    return jwt.sign(params, process.env.SECRET, {
        expiresIn: 86400,
    });
}

module.exports = {
    async index(req, res) {
        const users = await Person.find();
        return res.json(users);
    },
    async show(req, res) {
        // checking if the user is logged in
        try {
            const { id } = req.headers;
            const person = await Person.findById(id);
            return res.json({ groups: person.groups });
        } catch (err) {
            return res.json({ error: "user is not logged in"})
        }
    },
    async store(req, res) {
        const { nickname, name, email, password } = req.body;

        if(!(nickname && name && email && password))
            return res.json({error: "no data"})

        // checking if the user is already registered
        const personExists = await Person.findOne({nickname});
        if(personExists)
            return res.json(personExists);

        // checking if the email is unique
        if(await Person.findOne({email}))
            return res.json({error: "The email is already in use"});

        // encrypting the password
        const newPassword = await bcrypt.hashSync(password, 10);

        const person = await Person.create({
            nickname,
            name,
            email,
            password: newPassword
        });

        person.password = undefined;

        return res.json(
        { 
            person,
            token: generateToken({ id: person._id })
        });
    },
    async authenticate(req, res) {
        const { email, password } = req.body;

        const user = await Person.findOne({ email }).select('+password');

        if(!user) 
            return res.json({error: "User not found"});

        if(! await bcrypt.compare(password, user.password))
            return res.json({error: "Invalid password"});

        user.password = undefined;

        res.json(
        { 
            user, 
            token: generateToken({ id: user._id })
        });
    }
}