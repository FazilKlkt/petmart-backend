const { con } = require('../config/db');
const { isDataNullPet } = require('../helper');


// http://localhost:5000/pet/
// returns all pets in the database
const getAllPets = async (req, res) => {
    let qry = 'SELECT * FROM tblPets';
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
            console.log('served getAllPets');
        }
    });
}


//  http://localhost:5000/pet/id/1
// returns a single pet based on given id
const getPetById = async (req, res) => {
    let { id } = req.params;
    if (id == undefined) id = 0;
    let qry = "SELECT * FROM tblPets WHERE pet_id=" + id;
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
            console.log('served getPetById');
        }
    });
}


//  http://localhost:5000/pet/active
// returns a list of active pets
const getActivePets = async (req, res) => {
    let qry = "SELECT * FROM tblPets WHERE pet_status = true";
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
            console.log('served getActivePets');
        }
    });
}


//  http://localhost:5000/pet/category/{ cat | dog | bird | other }
// returns a list of pets based on category
const getPetsOnCategory = async (req, res) => {
    let { category } = req.params;
    if (category == undefined) category = "none";
    let qry = "SELECT * FROM tblPets WHERE pet_category='" + category + "'";
    await con.query(qry, (err, results) => {
        if (err) {
            console.table(err);
            throw err;
        }
        else {
            if (req.params.category == undefined)
                res.json({
                    status: "Failed",
                    message: "No category given",
                    results: []
                });
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
                        message: "Got data sucessfully",
                        result: results
                    });
            }
            console.log('served getPetsOnCategory');
        }
    });
}


//  http://localhost:5000/pet/add
// add pet to database
const addPet = async (req, res) => {
    if (isDataNullPet(req.body))
        res.json({
            status: "Failed",
            message: "Input data missing,check if you have enterd all data in body correctly !",
            result: []
        });
    else {
        await con.query("SELECT pet_id FROM tblPets WHERE pet_id=1", (err, results) => {
            // INSERT INTO `tblPets` (`p_id`, `p_name`, `p_img`, `p_description`, `p_price`, `p_isOnOffer`, `p_category`, `p_gender`, `status`) VALUES ('5', 'manju', 'hai', 'bye', '222', '0', 'cat', 'male', 'uff');
            let qry = `INSERT INTO tblPets (pet_name, pet_description, pet_img, pet_price, pet_category,pet_isOnOffer, pet_status)
                VALUES (
                '${req.body.name}',
                '${req.body.description}',
                '${req.body.img}',
                ${req.body.price},
                '${req.body.category}',
                ${req.body.isOnOffer},
                '${req.body.status}');
                `;

            con.query(qry, (err, results) => {
                if (err) throw err;
                else {
                    res.json({
                        status: "Sucess",
                        message: "Added pet into database",
                        result: []
                    });
                    console.log('served addPet');
                }
            });

        });
    }
}


//  http://localhost:5000/pet/update/id/{id_number}
// updates a pet based on id
const updatePetOnId = async (req, res) => {
    if (req.params.id === undefined) {
        res.json({
            status: "Failed",
            message: "No id was given",
            result: []
        })
        console.log('served updatePetOnId');
    }
    else {
        await con.query("SELECT pet_id FROM tblPets WHERE pet_id=" + req.params.id, (err, results) => {
            console.log(typeof results);
            if (results.length == 0) {
                res.json({
                    status: "Sucess",
                    message: "Not available",
                    result: []
                });
                console.log('served updatePetOnId');
            }
            else {
                let qry = `UPDATE tblPets SET pet_name ='${req.body.name}',pet_description ='${req.body.description}',
                pet_img ='${req.body.img}',
                pet_price =${req.body.price},
                pet_category ='${req.body.category}',
                pet_isOnOffer =${req.body.isOnOffer},
                pet_status ='${req.body.status}'
                WHERE pet_id =${req.params.id};
                `;

                con.query(qry, (err, results) => {
                    if (err) throw err;
                    else {
                        res.json({
                            status: "Sucess",
                            message: "Updated pet in database",
                            result: []
                        });
                        console.log('served updatePetOnId');
                    }
                });
            }
        })
    }
}


// LINK
// deletes a pet based on id
const deletePetOnId = async (req, res) => {
    console.table(req);
    if (req.params.id === undefined)
        res.json({
            status: "Failed",
            message: "No id was given",
            result: []
        })
    let id = req.params.id;
    await con.query("SELECT pet_id FROM tblPets WHERE pet_id = " + id, (err, results) => {
        if (results.length == 0)
            res.json({
                status: "Sucess",
                message: "Not available",
                result: []
            });
        else {
            con.query("DELETE FROM tblPets WHERE pet_id = " + id, (err, results) => {
                res.json({
                    status: "Sucess",
                    message: "Deleted pet from database",
                    result: []
                });
            })
        }
    })
}

// exporting pet modules
module.exports = {
    getAllPets,
    getPetById,
    getActivePets,
    getPetsOnCategory,
    addPet,
    updatePetOnId,
    deletePetOnId
}
