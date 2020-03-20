const Group = require('../models/Group');
const Person = require('../models/Person');

module.exports = {
    async index(req, res){
        const { category } = req.body;

        let groups;

        if( category === "all")
            groups = await Group.find();
        else
            groups = await Group.find({ category });

        return res.json(groups);
    },
    async store(req, res) {
        const { userid } = req.headers;

        if(!userid)
            return res.json({error: "user not found"});

        let person;

        // try to find the person
        try {
            person = await Person.findById(userid);
        } catch {
            return res.json({error: "user not found"});
        }

        const { name, category, media, url } = req.body;

        // check if the group already exists
        const groupExists = await Group.findOne({url});
        if(groupExists) 
            return res.json(groupExists);

        const group = await Group.create({
            name,
            category,
            media,
            url
        });

        //save the group
        person.groups.push(group._id);
        person.save();

        return res.json(group);
    },
    async update(req, res) {
        const { userid } = req.headers;

        if(!userid)
            return res.json({error: "user not found"});

        let person;

        try {
            person = await Person.findById(userid);
        } catch {
            return res.json({error: "user not found"});
        }

        const { id } = req.params;

        if(person.groups.includes(id)) {
            const group = await Group.findByIdAndUpdate(id, req.body, { new: true });
            return res.json(group);
        } 

        return res.json({error: "group doesn't exists"});
        
    },
    async delete(req, res) {
        const { userid } = req.headers;

        if(!userid)
            return res.json({error: "user not found"});

        let person;

        try {
            person = await Person.findById(userid);
        } catch {
            return res.json({error: "user not found"});
        }

        const { id } = req.params;

        if(person.groups.includes(id)) {
            await Group.findByIdAndDelete(id);
            return res.json({ok: true});
        } 

        return res.json({error: "group doesn't exists"});
    }
}