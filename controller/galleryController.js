const { con } = require('../config/db');
const { upload } = require('../config/file-handler');

// http://localhost:5000/gallery/
// returns all gallery items in the database
const getAllGallery = async (req, res) => {
    let qry = 'SELECT * FROM tblGallery';
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
            console.log('served getAllGallery');
        }
    });
}



//  http://localhost:5000/gallery/id/1
// returns a single gallery based on given id
const getGalleryById = async (req, res) => {
    let { id } = req.params;
    if (id == undefined) id = 0;
    let qry = "SELECT * FROM tblGallery WHERE img_id=" + id;
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
            console.log('served getGalleryById');
        }
    });
}


//  http://localhost:5000/gallery/add
// add gallery item to database
const addGallery = async (req, res) => {
    if (req.file == undefined) {
        res.json({
            status: "Failed",
            message: "Input data missing,check if you have enterd data in body correctly !",
            result: []
        });
    }
    else {
        await con.query("SELECT 1+1 AS solution", (err, results) => {
            let qry = `INSERT INTO tblGallery (img_link)
                VALUES (
                '${req.file.path}');
                `;

            con.query(qry, (err, results) => {
                if (err) {
                    console.error(err);
                }
                else {
                    res.json({
                        status: "Sucess",
                        message: "Added image into database",
                        result: []
                    });
                    console.log('served addGallery');
                }
            });

        });
    }
}



//  http://localhost:5000/gallery/update/id/{id_number}
// updates a gallery item based on id
const updateGalleryOnId = async (req, res) => {
    if (req.params.id === undefined)
        res.json({
            status: "Failed",
            message: "No id was given",
            result: []
        })
    else {
        await con.query("SELECT img_id FROM tblGallery WHERE img_id=" + req.params.id, (err, results) => {
            if (results.length == 0) {
                res.json({
                    status: "Sucess",
                    message: "Not available",
                    result: []
                });
                console.log('served updateGalleryOnId');
            }
            else {
                let qry = `UPDATE tblGallery SET img_link ='${req.file.path}' WHERE img_id = ${req.params.id} ;`;
                con.query(qry, (err, results) => {
                    if (err)
                        console.error(err);
                    else {
                        res.json({
                            status: "Sucess",
                            message: "Updated gallery item in database",
                            result: []
                        });
                        console.log('served updateGalleryOnId');
                    }
                });
            }
        })
    }
}


// http://localhost:5000/gallery/delete/{id}
// deletes a gallery item based on id
const deleteGalleryrOnId = async (req, res) => {
    if (req.params.id === undefined)
        res.json({
            status: "Failed",
            message: "No id was given",
            result: []
        })
    else {
        let id = req.params.id;
        await con.query("SELECT img_id FROM tblGallery WHERE img_id = " + id, (err, results) => {
            if (results.length == 0)
                res.json({
                    status: "Sucess",
                    message: "Not available",
                    result: []
                });
            else {
                con.query("DELETE FROM tblGallery WHERE img_id = " + id, (err, results) => {
                    res.json({
                        status: "Sucess",
                        message: "Deleted gallery item from database",
                        result: []
                    });
                })
            }
        })
    }
}


// exporting gallery modules
module.exports = {
    getAllGallery,
    getGalleryById,
    addGallery,
    updateGalleryOnId,
    deleteGalleryrOnId
}
