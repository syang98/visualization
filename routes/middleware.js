/**
 * middleware to make sure states match up
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function matchingState(req, res, next) {
    const state = req.params.state || undefined;
    console.log(state);
    console.log(req.session.stateKey);
    const storedState = req.session.stateKey;
    if (state === undefined || state !== storedState) {
        res.status(401).json({
            error : `There has been a state mismatch`
        }).end();
    } else {
        return next();
    }
};

/**
 * middleware to make sure token param is not empty
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function tokenNotEmpty(req, res, next) {
    if (req.params.refresh === undefined) {
        res.status(400).json({
            error: 'Token must be supplied to satisfy this endpoint'
        });
    } else {
        return next();
    }
}

module.exports = {
    matchingState: matchingState,
    tokenNotEmpty: tokenNotEmpty
}