const { con } = require('../config/db');
const { isDataNullOrder, recordLog } = require('../helper');


// http://localhost:5000/order/
// returns all orders in the database
const getAllOrders = async (req, res) => {
    let qry = 'SELECT * FROM tblOrder';
    await con.query(qry, (err, results) => {
        if (err) {
            console.error(err);
        }
        else {
            if (results.length == 0)
                res.json({
                    status: "Sucess",
                    message: "Not Available",
                    result: results
                });
            else
                res.json({
                    status: "Sucess",
                    message: "Got data sucessfully",
                    result: results
                });
            console.log('served getAllOrderss');
        }
    });
}

//  http://localhost:5000/order/id/1
// returns a single order based on given id
const getOrderById = async (req, res) => {
    let { id } = req.params;
    if (id == undefined) id = 0;
    let qry = "SELECT * FROM tblOrder WHERE order_id=" + id;
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
            console.log('served getOrderById');
        }
    });
}


//  http://localhost:5000/order/add
// add order to database
const addOrder = async (req, res) => {
    if (isDataNullOrder(req.body))
        res.json({
            status: "Failed",
            message: "Input data missing,check if you have enterd all data in body correctly !",
            result: []
        });
    else {
        await con.query("SELECT pet_id FROM tblPets WHERE pet_id=1", (err, results) => {
            // INSERT INTO `tblPets` (`p_id`, `p_name`, `p_img`, `p_description`, `p_price`, `p_isOnOffer`, `p_category`, `p_gender`, `status`) VALUES ('5', 'manju', 'hai', 'bye', '222', '0', 'cat', 'male', 'uff');
            let qry = `INSERT INTO tblOrder (pet_id, quantity, gender, contact_number, address,pin, status)
                VALUES (
                ${req.body.pet_id},
                ${req.body.quantity},
                '${req.body.gender}',
                ${req.body.contact},
                '${req.body.address}',
                ${req.body.pin},
                '${req.body.status}');
                `;

            con.query(qry, (err, results) => {
                if (err) throw err;
                else {
                    res.json({
                        status: "Sucess",
                        message: "Added order into database",
                        result: []
                    });
                    recordLog(`ADDED ORDER FOR ${req.body.name},WITH QUANTITY ${req.body.quantity}`);
                    console.log('served addOrder');
                }
            });
        });
    }
}



//  http://localhost:5000/order/update/id/{id_number}
// updates a order based on id
const updateOrderOnId = async (req, res) => {
    if (req.params.id === undefined) {
        res.json({
            status: "Failed",
            message: "No id was given",
            result: []
        })
        console.log('served updateOrderOnId');
    }
    else {
        await con.query("SELECT order_id FROM tblOrder WHERE order_id=" + req.params.id, (err, results) => {
            console.log(typeof results);
            if (results.length == 0) {
                res.json({
                    status: "Sucess",
                    message: "Not available",
                    result: []
                });
                console.log('served updateOrderOnId');
            }
            else {
                let qry = `UPDATE tblOrder
                SET status ='${req.body.status}'
                WHERE order_id =${req.params.id};
                `;

                con.query(qry, (err, results) => {
                    if (err) throw err;
                    else {
                        res.json({
                            status: "Sucess",
                            message: "Updated order in database",
                            result: []
                        });
                        recordLog(`UPDATED ORDER ID ${req.params.id},status TO ${req.body.status}`);
                        console.log('served updateOrderOnId');
                    }
                });
            }
        })
    }
}


// http://localhost:5000/order/delete/{id_number}
// deletes a order based on id
const deleteOrdernId = async (req, res) => {
    if (req.params.id === undefined)
        res.json({
            status: "Failed",
            message: "No id was given",
            result: []
        })
    let id = req.params.id;
    await con.query("SELECT order_id FROM tblOrder WHERE order_id = " + id, (err, results) => {
        if (results.length == 0)
            res.json({
                status: "Sucess",
                message: "Not available",
                result: []
            });
        else {
            con.query("DELETE FROM tblOrder WHERE order_id = " + id, (err, results) => {
                res.json({
                    status: "Sucess",
                    message: "Deleted order from database",
                    result: []
                });
            })
            recordLog(`DELETED ORDER ID ${req.params.id}`);
        }
    })
}


module.exports = {
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrderOnId,
    deleteOrdernId
}
