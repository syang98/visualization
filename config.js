const envvars = require('dotenv');
envvars.config();
module.exports = {
    clientId:process.env.ID, 
    clientSecret: process.env.SECRET, 
    redirectUri: process.env.URI
}
