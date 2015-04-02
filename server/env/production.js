module.exports = {
    "DATABASE_URI": process.env.MONGOLAB_URI,
    "SESSION_SECRET": process.env.SESSION_SECRET,
    "GITHUB": {
        "clientID": process.env.GITHUB_CLIENT_ID,
        "clientSecret": process.env.GITHUB_CLIENT_SECRET,
        "callbackURL": process.env.GITHUB_CALLBACK_URL
    },
    "DOCKER_URI": process.env.DOCKER_URI
};