const express = require('express');
const router = express.Router();
const middleware = require('./middleware');
const {clientId, clientSecret, redirectUri} = require('../config');
const tokenRoute = 'https://accounts.spotify.com/api/token';
const axios = require('axios').default;


/**
 * intial callback route 
 * @returns {200} if successful
 * @throws {Error} whatever error spotify gives on the request
 * @throws {503} if Spotify servers go down
 */
router.get('/:code/:state', [middleware.matchingState], async (req, res) => {
    const code = req.params.code || undefined;
    req.session.stateKey = undefined;

    let body = new URLSearchParams();
    body.append("code", code);
    body.append("redirect_uri", redirectUri);
    body.append('grant_type', 'authorization_code')
    
    let headers = {
        'Authorization' : 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64')),
    };
    
    let result = await axios.post(tokenRoute, body, {headers: headers})
        .then(res => res)
        .catch(err => err);
            
    if (result.status !== 200) {
        res.status(result.response.status).json({
            error: `From Spotify: ${result.data.error_description}`
        }).end();
    } else {
        res.status(200).json({
            success: 'API tokens retrieved successfully',
            token:   result.data.access_token,
            refresh: result.data.refresh_token,
            timeout: result.data.expires_in
        }).end();
    }   
});

module.exports = router;