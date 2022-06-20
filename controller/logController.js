const { con } = require('../config/db');


// http://localhost:5000/logs/
// returns all logs in the database
const getAllLogs = async (req, res) => {
    let qry = 'SELECT * FROM tblAdminLogs';
    await con.query(qry, (err, results) => {
        if (err) {
            console.error(err);
        }
        else {
            if (results.length == 0)
                res.json({
                    status: "Sucess",
                    message: "Not available",
                    result: results
                });
            else
                res.json({
                    status: "Sucess",
                    message: "Got data sucessfully",
                    result: results
                });
            console.log('served getAllLogs');
        }
    });
}



//  http://localhost:5000/logs/id/1
// returns a single gallery based on given id
const getLogById = async (req, res) => {
    let { id } = req.params;
    if (id == undefined) id = 0;
    let qry = "SELECT * FROM tblAdminLogs WHERE log_id=" + id;
    await con.query(qry, (err, results) => {
        if (err) {
            throw err;
        }
        else {
            if (req.params.id == undefined)
                res.json({
                    status: "Failed",
                    message: "No id was given",
                    result: results
                });
            else if (results.length == 0)
                res.json({
                    status: "Sucess",
                    message: "Not available",
                    result: []
                })
            else
                res.json({
                    status: "Sucess",
                    message: "Got data sucessfully",
                    result: results
                });
            console.log('served getLogById');
        }
    });
}


module.exports = {
    getAllLogs,
    getLogById
}