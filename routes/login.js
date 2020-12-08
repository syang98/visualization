const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const {clientId, redirectUri} = require("../config");

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

/**
 * Login, redirects to spotify authorization
 */
router.get('/', (req, res) => {
    const state = generateRandomString(16)
    req.session.stateKey = state;
    const scope = 'user-read-private user-read-playback-state user-modify-playback-state';

    const query = querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state
    });

    res.status(200).json({
        success: "Successfully Authorized",
        url: `https://accounts.spotify.com/authorize?${query}`
    }).end();
});

module.exports = router;