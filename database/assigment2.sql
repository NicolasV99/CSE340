--SQL statements tasks

--1
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

--2
UPDATE public.account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

--3
DELETE FROM public.account
WHERE account_email = 'tony@starkent.com';

--4
UPDATE public.inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

--5
SELECT 
    inventory.inv_make, 
    inventory.inv_model, 
    classification.classification_name
FROM 
    public.inventory
INNER JOIN 
    public.classification
ON 
    inventory.classification_id = classification.classification_id
WHERE 
    classification.classification_name = 'Sport';

--6
UPDATE 
    public.inventory
SET 
    inv_image = REGEXP_REPLACE(inv_image, '^(/images/)', '/images/vehicles/'),
    inv_thumbnail = REGEXP_REPLACE(inv_thumbnail, '^(/images/)', '/images/vehicles/')
WHERE 
    inv_image LIKE '/images/%' OR inv_thumbnail LIKE '/images/%';


