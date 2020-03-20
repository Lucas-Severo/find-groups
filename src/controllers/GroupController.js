const Group = require('../models/Group');

module.exports = {
    async index(req, res){
        const groups = await Group.find();

        return res.json(groups);
    },
    async store(req, res) {
        const { name, category, media } = req.body;

        const group = await Group.create({
            name,
            category,
            media
        });

        return res.json(group);
    }
}