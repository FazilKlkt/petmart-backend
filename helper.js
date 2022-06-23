const { con } = require('./config/db');

const isDataNullPet = (req) => {
    if (
        req.body.name == undefined ||
        req.file == undefined ||
        req.body.description == undefined ||
        req.body.price == undefined ||
        req.body.category == undefined ||
        req.body.status == undefined
    )
        return true;
    else
        return false;
}

const isDataNullUser = (body) => {
    if (
        body.name == undefined ||
        body.mail == undefined ||
        body.pass == undefined ||
        body.isAdmin == undefined
    )
        return true;
    else
        return false;
}

const isDataNullOrder = (body) => {
    if (
        body.pet_id == undefined ||
        body.quantity == undefined ||
        body.gender == undefined ||
        body.contact == undefined ||
        body.address == undefined ||
        body.pin == undefined ||
        body.status == undefined
    )
        return true;
    else
        return false;
}

const recordLog = async (logEvent) => {
    const now = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
    });
    if (logEvent == undefined)
        throw new Error("Data not given");
    else {
        let query = `
            INSERT INTO tblAdminLogs
            (
                log_time,
                log_message
            ) VALUES (
                '${now}',
                '${logEvent}'
            )
        `;

        con.query(query, (err, result) => {
            if (err) throw err;
            else {
                console.log(result);
            }
        })
    }
}

module.exports = {
    isDataNullPet,
    isDataNullUser,
    isDataNullOrder,
    recordLog
}