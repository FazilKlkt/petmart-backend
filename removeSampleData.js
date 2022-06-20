const { con } = require('./config/db');

const clearAllDatabase = async () => {

    let tables = [
        'tblAdminLogs',
        'tblGallery',
        'tblOrder',
        'tblPets',
        'tblUser'
    ];

    for (let index = 0; index < tables.length; index++) {
        let query = `
        TRUNCATE TABLE ${tables[index]};
        `;
        await con.query(query, (err, result) => {
            if (err) throw err
            console.log(result);
            console.log("executed");
        })
    }

}

clearAllDatabase();
