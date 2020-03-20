const Person = require('../models/Person');

module.exports = {
    async index(req, res) {
        const { id } = req.headers;

        const groups = await Person.findById(id).groups;

        return res.json(groups);
    },
    async store(req, res) {
        const { nickname, name, email, password } = req.body;

        const personExists = await Person.findOne({nickname});

        if(personExists)
            return res.json(personExists); 

        const person = await Person.create({
            nickname,
            name,
            email,
            password
        });

        return res.json(person);
    }
}