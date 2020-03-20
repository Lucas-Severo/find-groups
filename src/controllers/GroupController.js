const Group = require('../models/Group');

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
        const { name, category, media, url } = req.body;

        const groupExists = await Group.findOne({url});

        if(groupExists) 
            return res.json(groupExists);

        const group = await Group.create({
            name,
            category,
            media,
            url
        });

        return res.json(group);
    },
    async update(req, res) {
        const { id } = req.params;
        const group = await Group.findByIdAndUpdate(id, req.body, { new: true });

        return res.json(group);
    },
    async delete(req, res) {
        const { id } = req.params;

        await Group.findByIdAndDelete(id);

        return res.json({ok: true});
    }
}