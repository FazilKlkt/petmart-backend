--  To get all pets
-- SELECT * FROM tblPets;

-- To get pets based on ID
-- SELECT * FROM tblPets WHERE pet_id=1;

-- To get pets based on active status
-- SELECT * FROM tblPets WHERE pet_status = true;

-- To get pets based on category
-- SELECT * FROM tblPets WHERE pet_category='dog';

-- To add pet
-- INSERT INTO tblPets(
--     pet_name,
--     pet_description,
--     pet_img,
--     pet_price,
--     pet_category,
--     pet_isOnOffer,
--     pet_status
-- )
-- VALUES (
--     "Labrador",
--     "Cute,frienldy",
--     "xyz.png",
--     18000,
--     "dog",
--     false,
--     true
-- );

-- To update pet based on id
-- UPDATE tblPets SET
-- pet_name = 'a_pet_name',
-- pet_description = 'a_description',
-- pet_price = 00000,
-- pet_category = 'a_category',
-- pet_isOnOffer = true,
-- pet_status = true,
-- WHERE pet_id = 1;

-- To delete a pet on id
-- DELETE FROM tblPets WHERE pet_id = 1;

-- To delete all pets
-- TRUNCATE tblPets;