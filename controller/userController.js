const { con } = require('../config/db');
const { isDataNullUser } = require('../helper');


// http://localhost:5000/user/
// returns all users in the database
const getAllUsers = async (req, res) => {
    let qry = 'SELECT * FROM tblUser';
    await con.query(qry, (err, results) => {
        if (err) {
            console.error(err);
        }
        else {
            res.json({
                status: "Sucess",
                message: "Got data sucessfully",
                result: results
            });
            console.log('served getAllUsers');
        }
    });
}


//  http://localhost:5000/user/id/1
// returns a single user based on given id
const getUserById = async (req, res) => {
    let { id } = req.params;
    if (id == undefined) id = 0;
    let qry = "SELECT * FROM tblUser WHERE user_id=" + id;
    await con.query(qry, (err, results) => {
        if (err) {
            console.table(err);
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
            console.log('served getUserById');
        }
    });
}


//  http://localhost:5000/user/admin
// returns a list of admin users
const getAdminUsers = async (req, res) => {
    let qry = "SELECT * FROM tblUser WHERE user_isAdmin = true";
    await con.query(qry, (err, results) => {
        if (err) {
            console.table(err);
            throw err;
        }
        else {
            if (results.length == 0)
                res.json({
                    status: "Sucess",
                    message: "Not available",
                    result: results
                })
            else
                res.json({
                    status: "Sucess",
                    message: "Got data scessfully",
                    result: results
                })
            console.log('served getAdminUsers');
        }
    });
}


//  http://localhost:5000/user/add
// add user to database
const addUser = async (req, res) => {
    if (isDataNullUser(req.body))
        res.json({
            status: "Failed",
            message: "Input data missing,check if you have enterd all data in body correctly !",
            result: []
        });
    else {
        await con.query("SELECT pet_id FROM tblPets WHERE pet_id=1", (err, results) => {
            let qry = `INSERT INTO tblUser (user_mail, user_name, user_pass, user_isAdmin)
                VALUES (
                '${req.body.mail}',
                '${req.body.name}',
                '${req.body.pass}',
                ${req.body.isAdmin});
                `;

            con.query(qry, (err, results) => {
                if (err) throw err;
                else {
                    res.json({
                        status: "Sucess",
                        message: "Added user into database",
                        result: []
                    });
                    console.log('served addUser');
                }
            });

        });
    }
}


//  http://localhost:5000/user/update/id/{id_number}
// updates a user based on id
const updateUserOnId = async (req, res) => {
    if (req.params.id === undefined) {
        res.json({
            status: "Failed",
            message: "No id was given",
            result: []
        })
        console.log('served updateUserOnId');
    }
    else {
        await con.query("SELECT pet_id FROM tblUser WHERE user_id=" + req.params.id, (err, results) => {
            console.log(typeof results);
            if (results.length == 0) {
                res.json({
                    status: "Sucess",
                    message: "Not available",
                    result: []
                });
                console.log('served updateUserOnId');
            }
            else {
                let qry = `UPDATE tblUser SET
                user_name ='${req.body.name}',
                user_mail ='${req.body.mail}',
                user_pass ='${req.body.pass}',
                user_isAdmin =${req.body.isAdmin};
                `;

                con.query(qry, (err, results) => {
                    if (err) throw err;
                    else {
                        res.json({
                            status: "Sucess",
                            message: "Updated user in database",
                            result: []
                        });
                        console.log('served updateUserOnId');
                    }
                });
            }
        })
    }
}


// LINK
// deletes a user based on id
const deleteUserOnId = async (req, res) => {
    console.table(req);
    if (req.params.id === undefined)
        res.json({
            status: "Failed",
            message: "No id was given",
            result: []
        })
    let id = req.params.id;
    await con.query("SELECT user_id FROM tblUser WHERE user_id = " + id, (err, results) => {
        if (results.length == 0)
            res.json({
                status: "Sucess",
                message: "Not available",
                result: []
            });
        else {
            con.query("DELETE FROM tblUser WHERE user_id = " + id, (err, results) => {
                res.json({
                    status: "Sucess",
                    message: "Deleted user from database",
                    result: []
                });
            })
        }
    })
}

// exporting user modules
module.exports = {
    getAllUsers,
    getUserById,
    getAdminUsers,
    addUser,
    updateUserOnId,
    deleteUserOnId
}
