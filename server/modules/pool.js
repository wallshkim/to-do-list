// brings in pg which connects to our database
const pg = require('pg');
// a default node dependency so you don't have to install it separately
const url = require('url');


let config = {};

// if we have a process.env.database_url which would come from heroku then use the following config
if (process.env.DATABASE_URL) {
    // Heroku gives a url, not a connection object
    // https://github.com/brianc/node-pg-pool
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true, // heroku requires ssl to be true
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
} 
// Else, use our local config
else {
    config = {
        host: 'localhost', // Server hosting the postgres database
        port: 5432, // env var: PGPORT
        database: 'weekend-to-do-app', // CHANGE THIS LINE! env var: PGDATABASE, this is likely the one thing you need to change to get up and running
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };
}

// this creates the pool that will be shared by all other modules
const pool = new pg.Pool(config);

// the pool will log when it connects to the database
pool.on('connect', () => {
    console.log('Postgesql connected');
});

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
    console.log('Unexpected error on idle client', err);
    process.exit(-1);
});

// const config = {
//     database: 'weekend-to-do-app',
//     host: 'localhost',
//     port: 5432,
//     max: 10,
//     idleTimeoutMillis: 30000
// };

// const pool = new pg.Pool(config);

// pool.on("connect", () => {
//     console.log('connected to postgres');
// });

// pool.on("error", (err) => {
//     console.log('error connecting to postgres', err);
// });

module.exports = pool;