module.exports = {
    development: {
        port: process.env.PORT || 9999,
        dbPath: 'mongodb://localhost:27017/react-blog-db',
        jwtSecret: '5ht175M3g4S3cr37'
    },
    staging: {
    },
    production: {
        port: process.env.PORT
    }
};