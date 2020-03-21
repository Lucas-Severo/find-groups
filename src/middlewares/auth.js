const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization: authHeader } = req.headers;

    if(!authHeader)
        return res.json({error: "No token provided"});
    
    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.json({error: 'Token error'});
    
    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.json({error: 'Token malformatted'});
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.json({ error: 'invalid token'});

        req.headers.userid = decoded.id;
        return next();
    });
}