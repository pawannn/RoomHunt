# RoomHunt

RoomHunt is a web app that helps lodgers find PGs according to their budget in the needed area. Lodgers can save PGs, request a room, and contact the owner. Landlords can register all their PGs, review feedback and comments, and room requests by the lodgers.

## Features
### Landlord Functions
- A Lnalord will be able to Create a new RoomHunt account and Can manage PGs and Lodgers from the account.
- A single Landlord can have multiple PGs that a landlord can Register in the website. [One - to many Relation]
- The Lanlord can Rview all the Room Requests made by the lodgers and can contact them.
- The landlord can review all the comments and manage them.
- The landlord will be able to get a new platform to grow the PG business and can manage all the lodgers.

### Lodgers Functions
- A lodger will be able to Create a new RoomHunt account and can Search, Save and Request for PGs.
- A lodgers will just need to filter the place to search for PG and the budget range.
- A lodger can also save PG in the save list and review them further.
- A lodger will be able to Request a room in any PG and the notification will be sent to Landlord, the landlord will review the request and contact the lodger.

## Installation

1. Clone the Repository
```
git clone https://github.com/pawannn/RoomHunt.git
```

2. Navigate to project directory
```
cd RoomHunt
```

3. Install the required packages
```
npm install
```

4. Setup config file
- in the root directiry, create a file name '.env'.
- There will be 4 required variables.
(i) PORT : (On which port should the project run on.)
(ii) dbURI : (your mongoDB access link)
(iii) ACCESS_TOKEN_SECRET = (A secret Key for JWT authentication)

5. Start the app
```
npm start
```

## Usage 

To use the web application, follow these steps :

1. Open http://localhost:3000/ or http://127.0.0.1:3000/

2. Select Landlord
- Create an account by giving the required details.
- Login into your account.
- Add Some PGs by filling the details in add PG section.
- You can review your PGs in the your PGs section and can more look at the details by clicking on them.
- Click on any PG and you can see all the PG details, Edit PG details, Review comments and Room Requests.

3. Select Lodger
- Create an account by giving the required details.
- Login into your account.
- Filter the PG by selecting the suitable regions and Price limit.
- You will get a list of PGs and you can view more about the PG by clicking on more details.
- You can Reequest a room by clicking on request a Room button.
- You can save PG by clicking on save PG button and review the PG's in saved PG section.
- You may also comment on the Rooms in the comment section.

## Technologies Used

+ Frontend : EJS
+ Backedn : Node.js, Express
+ Database : MongoDB

## PG CRUD
PG CRUD means Create, Retreive, Update, Delete process.

API : `/pgAPI/`

### Routes of PG CRUD
```js
const express = require('express');
const pgCRUD = require('../controllers/PG_CRUD');
const Authentication = require('../middlewares/authentication')

const router = express.Router();

router.post('/create', Authentication.landlord_Authentication, pgCRUD.create);

router.post('/delete/:id', Authentication.landlord_Authentication, pgCRUD.delete_pg);

router.post('/update/:id', Authentication.landlord_Authentication, pgCRUD.update_pg);

module.exports = router;
```