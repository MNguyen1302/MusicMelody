const jwt = require('jsonwebtoken');

module.exports.requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodeData = jwt.verify(token, 'jwtsecret');

            req.userId = decodedData?.id;
        } else {
            decodeData = jwt.decode(token);

            req.userId = decodeData?.sub;
        }

        next();

    } catch (error) {
        console.log(error)
    }
}