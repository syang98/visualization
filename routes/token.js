const express = require('express');
const router = express.Router();
const middleware = require('./middleware');
const {clientId, clientSecret} = require('../config');
const tokenRoute = 'https://accounts.spotify.com/api/token';
const axios = require('axios').default;


/**
 * /api/token/:refresh get the new token using refresh token
 * @returns {200} if successful
 * @throws {Error} whatever error spotify gives on the request
 * @throws {400} if token param is null
 */
router.get('/:refresh?', [middleware.tokenNotEmpty], async(req, res) => {
    const refresh = req.params.refresh;

    let body = new URLSearchParams();
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', refresh);

    let header = { 
        'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
    };

    let result = await axios.post(tokenRoute, body, {headers: header})
        .then(res => res)
        .catch(err => err.response.status);
        
    if (result.status === undefined) {
        res.status(result.response.status).json({
            error: `From Spotify: ${result.data.error_description}`
        }).end();
    } else {
        res.status(200).json({
            success: 'refresh token gotten successfully',
            token: result.data.access_token
        }).end();
    }
});

module.exports = router
