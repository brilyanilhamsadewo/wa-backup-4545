const { query } = require('express-validator');
const { Client } = require('pg');

const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   connectionString: 'postgres://pargpknghdabhf:91e0af5d28f2d19b86f9d3876b73ab71a472030a2ec74be82a4331701e88573e@ec2-34-238-37-113.compute-1.amazonaws.com:5432/dcb0k81v2qt9b6',
  user: 'databaselogin',
  host: 'database-wa.cepilawr0dy9.ap-southeast-1.rds.amazonaws.com',
  database: 'wa_bot',
  password: 'admindatabase123',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const readSession = async () => {
    try {
        const res = await client.query('SELECT * from wa_sessions ORDER BY created_at DESC LIMIT 1');
        if(res.rows.length) return res.rows[0].session;
        return '';
    } catch (err){
        throw err;
    }
}

const saveSession = (session) => {
    client.query('INSERT INTO wa_sessions (session) VALUES($1)', [session], (err, results) => {
        if(err) {
            console.error('Failed to save session');
        } else {
            console.log('Session saved');
        }
    });
}

const removeSession = () => {
    client.query('DELETE FROM wa_sessions', (err, results) => {
        if(err) {
            console.error('Failed to remove session');
        } else {
            console.log('Session deleted');
        }
    });
}

module.exports ={
    readSession,
    saveSession,
    removeSession
}