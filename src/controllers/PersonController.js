const Person = require('../models/Person');

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

        // checking if the user is already registered
        const personExists = await Person.findOne({nickname});
        if(personExists)
            return res.json(personExists);

        // checking if the email is unique
        if(await Person.findOne({email}))
            return res.json({error: "The email is already in use"});

        const person = await Person.create({
            nickname,
            name,
            email,
            password
        });

        return res.json(person);
    }
}