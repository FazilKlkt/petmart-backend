const isDataNullPet = (body) => {
    if (
        body.name == undefined ||
        body.img == undefined ||
        body.description == undefined ||
        body.price == undefined ||
        body.category == undefined ||
        body.status == undefined
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

module.exports = {
    isDataNullPet,
    isDataNullUser,
    isDataNullOrder
}