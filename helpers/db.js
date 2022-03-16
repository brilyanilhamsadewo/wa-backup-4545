const mysql = require('mysql2/promise');

const createConnection = async () => {
    return await mysql.createConnection({
        host:'remotemysql.com',
        user: 's4uZtE1YET',
        password: 'y1KjJ02SdI',
        database: 's4uZtE1YET'
    });
}

const getReply = async(keyword) => {
    const connection = await createConnection();
    const [rows] = await connection.execute('SELECT message FROM wa_replies WHERE keyword=?',[keyword]);
    if(rows.length > 0) return rows[0].message;
    return false;
}

module.exports ={
    createConnection,
    getReply
}