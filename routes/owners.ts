import * as express from 'express';
import { PermissionMiddlewareCreator, RecordsGetter } from "forest-express-sequelize";
import { Article } from '../models/article';

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('owners');

// This file contains the logic of every route in Forest Admin for the collection owners:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Owner
router.post('/owners', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  next();
});

// Update a Owner
router.put('/owners/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Owner
router.delete('/owners/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Owners
router.get('/owners', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  next();
});

// Get a number of Owners
router.get('/owners/count', permissionMiddlewareCreator.list(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  next();
});

// Get a Owner
router.get('/owners/:recordId(?!count)', permissionMiddlewareCreator.details(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  next();
});

// Export a list of Owners
router.get('/owners.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Owners
router.delete('/owners', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

router.get('/owners/:owners_id/relationships/likedArticles', async (req, res, next) => {
  const articles = await Article.findAll({limit: 4});
  const articleSerializer = new RecordsGetter(Article);
  // @ts-ignore
  res.json(await articleSerializer.serialize(articles, { count: 10 }))
});

router.post('/api/stats/test', async (req, res, next) => {
  //const articles = await Article.findAll();
  const stats  = {
    data: {
      attributes: {
        value: {
          values: [{key: 'teub', values: [4, 7]}, {key: 'hu', values: [7, 6]}],
        },
      },
      id: "30c157c0-47b6-11ec-8b9e-3f01c18c4134",
      type: "stats"
    }
  }

  res.json(stats);
});

export = router;
