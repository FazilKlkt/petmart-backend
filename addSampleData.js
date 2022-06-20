const { con } = require('./config/db');

const addSampleAdminLogs = async () => {

    let sampleData = [
        {
            log_time: "SOME_RANDOM_TIME_1",
            log_message: "SOME_RANDOM_MESSAGE_1"
        }, {
            log_time: "SOME_RANDOM_TIME_2",
            log_message: "SOME_RANDOM_MESSAGE_2"
        }
    ];

    for (let index = 0; index < sampleData.length; index++) {
        let query = `
        INSERT INTO tblAdminLogs
        (
            log_time,
            log_message
        )
        VALUES
        (
            '${sampleData[index].log_time}',
            '${sampleData[index].log_message}'
        );
        `;
        await con.query(query, (err, result) => {
            if (err) throw err
            console.log(result);
            console.log("executed");
        })
    }

}

const addSampleGallery = async () => {
    let sampleData = [
        {
            img_link: "SOME_RANDOM_IMAGE_LINK_1"
        }, {
            img_link: "SOME_RANDOM_IMAGE_LINK_2"
        }
    ];

    for (let index = 0; index < sampleData.length; index++) {
        let query = `
        INSERT INTO tblGallery
        (
            img_link
        )
        VALUES
        (
            '${sampleData[index].img_link}'
        );
        `;
        await con.query(query, (err, result) => {
            if (err) throw err
            console.log(result);
            console.log("executed");
        })
    }
}

const addSampleOrder = async () => {
    let sampleData = [
        {
            pet_id: 000,
            quantity: 2,
            gender: "male",
            contact_number: "1234567890",
            address: "udupi",
            pin: "577000",
            status: "PENDING"
        }, {
            pet_id: 001,
            quantity: 1,
            gender: "female",
            contact_number: "2234567890",
            address: "banglore",
            pin: "577001",
            status: "PROCESSING"
        }, {
            pet_id: 002,
            quantity: 2,
            gender: "both",
            contact_number: "3234567890",
            address: "mumbai",
            pin: "577002",
            status: "EXECUTED"
        }
    ];

    for (let index = 0; index < sampleData.length; index++) {
        let query = `
        INSERT INTO tblOrder
        (
            pet_id,
            quantity,
            gender,
            contact_number,
            address,
            pin,
            status
        )
        VALUES
        (
            ${sampleData[index].pet_id},
            ${sampleData[index].quantity},
            '${sampleData[index].gender}',
            '${sampleData[index].contact_number}',
            '${sampleData[index].address}',
            '${sampleData[index].pin}',
            '${sampleData[index].status}'
        );
        `;
        await con.query(query, (err, result) => {
            if (err) throw err
            console.log(result);
            console.log("executed");
        })
    }
}

const addSamplePets = async () => {
    let sampleData = [
        {
            pet_name: "SOME_PET_1",
            pet_description: "SOME_ESCRIPTION_1",
            pet_img: "SOME_IMG_1",
            pet_price: 10000,
            pet_category: "cat",
            pet_isOnOffer: true,
            pet_status: true
        },
        {
            pet_name: "SOME_PET_2",
            pet_description: "SOME_ESCRIPTION_2",
            pet_img: "SOME_IMG_2",
            pet_price: 20000,
            pet_category: "dog",
            pet_isOnOffer: false,
            pet_status: true
        },
        {
            pet_name: "SOME_PET_3",
            pet_description: "SOME_ESCRIPTION_3",
            pet_img: "SOME_IMG_3",
            pet_price: 30000,
            pet_category: "bird",
            pet_isOnOffer: false,
            pet_status: false
        },
        {
            pet_name: "SOME_PET_4",
            pet_description: "SOME_ESCRIPTION_4",
            pet_img: "SOME_IMG_4",
            pet_price: 40000,
            pet_category: "other",
            pet_isOnOffer: true,
            pet_status: false
        }
    ];

    for (let index = 0; index < sampleData.length; index++) {
        let query = `
        INSERT INTO tblPets
        (
            pet_name,
            pet_description,
            pet_img,
            pet_price,
            pet_category,
            pet_isOnOffer,
            pet_status
        )
        VALUES
        (
            '${sampleData[index].pet_name}',
            '${sampleData[index].pet_description}',
            '${sampleData[index].pet_img}',
            ${sampleData[index].pet_price},
            '${sampleData[index].pet_category}',
            ${sampleData[index].pet_isOnOffer},
            ${sampleData[index].pet_status}
        );
        `;
        await con.query(query, (err, result) => {
            if (err) throw err
            console.log(result);
            console.log("executed");
        })
    }
}

const addSampleUser = async () => {
    let sampleData = [
        {
            user_name: "SOME_USER_1",
            user_pass: "qwertyui",
            user_mail: "ashahs@gmail.com",
            user_isAdmin: true
        },
        {
            user_name: "SOME_USER_2",
            user_pass: "asdfghjk",
            user_mail: "dasydh@gmail.com",
            user_isAdmin: false
        },
        {
            user_name: "SOME_USER_3",
            user_pass: "lkjhgfds",
            user_mail: "yfuyfs@gmail.com",
            user_isAdmin: false
        }
    ];

    for (let index = 0; index < sampleData.length; index++) {
        let query = `
        INSERT INTO tblUser
        (
            user_name,
            user_pass,
            user_mail,
            user_isAdmin
        )
        VALUES
        (
            '${sampleData[index].user_name}',
            '${sampleData[index].user_pass}',
            '${sampleData[index].user_mail}',
            ${sampleData[index].user_isAdmin}
        );
        `;
        await con.query(query, (err, result) => {
            if (err) throw err
            console.log(result);
            console.log("executed");
        })
    }
}

addSampleAdminLogs();
addSampleGallery();
addSampleOrder();
addSamplePets();
addSampleUser();
