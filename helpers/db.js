const mysql = require('mysql2/promise');
const { readSession } = require('./session');

// const createConnection = async () => {
//     return await mysql.createConnection({
//         host:'remotemysql.com',
//         user: 's4uZtE1YET',
//         password: 'y1KjJ02SdI',
//         database: 's4uZtE1YET'
//     });
// }

// aws reblood rds
const createConnection = async () => {
    return await mysql.createConnection({
        host:'bot-wa-mysql.cepilawr0dy9.ap-southeast-1.rds.amazonaws.com',
        user: 'bot_wa_mysql',
        password: 'admindatabase123',
        database: 'bot_wa_mysql'
    });
}

const getReply = async(keyword) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT message FROM wa_replies_2 WHERE keyword=?',[keyword]);
    if(rows.length > 0) return rows[0].message;
    return false;
}

module.exports ={
    createConnection,
    getReply
}
