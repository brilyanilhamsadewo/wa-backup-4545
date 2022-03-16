const { query } = require('express-validator');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
//   connectionString: 'postgres://lkodvgskogdahg:70f4350351d7a8dd72f55a1867de3021a3a53ab723955045589ff271181ab34b@ec2-54-158-26-89.compute-1.amazonaws.com:5432/d9n1m32948am93',
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