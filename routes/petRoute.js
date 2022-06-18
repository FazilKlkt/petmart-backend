const express = require('express');
const router = express.Router();
const {
    getAllPets,
    getPetById,
    getActivePets,
    getPetsOnCategory,
    addPet,
    updatePetOnId,
    deletePetOnId
} = require('../controller/petController');


// routes for pet
router.get('/', getAllPets);
router.get('/id/:id?', getPetById);
router.get('/active', getActivePets);
router.get('/category/:category?', getPetsOnCategory);
router.post('/add', addPet);
router.put('/update/:id?', updatePetOnId);
router.delete('/delete/:id?', deletePetOnId);

module.exports = router;