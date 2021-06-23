import * as express from 'express';
import {
  PermissionMiddlewareCreator,
  RecordCreator,
  RecordGetter,
  RecordsCounter,
  RecordsGetter
} from "forest-express-sequelize";
import { Article } from "../models/article";

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator('articles');

// This file contains the logic of every route in Forest Admin for the collection articles:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a Article
router.post('/articles', permissionMiddlewareCreator.create(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  console.log(request.query);
  console.log(request.params);
  /*const recordCreator = new RecordCreator(Article);
  const createdRecord = await recordCreator.create({ body: request.query.body});*/
  next();
});

// Update a Article
router.put('/articles/:recordId', permissionMiddlewareCreator.update(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
  next();
});

// Delete a Article
router.delete('/articles/:recordId', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
  next();
});

// Get a list of Articles
router.get('/articles', permissionMiddlewareCreator.list(), async (request, response) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
  const recordsGetter = new RecordsGetter(Article);
  const articles = await recordsGetter.getAll(request.params);
  const articlesSerialized = await recordsGetter.serialize(articles);
  response.json(articlesSerialized);
});

// Get a number of Articles
router.get('/articles/count', permissionMiddlewareCreator.list(), async (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
  const recordsCounter = new RecordsCounter(Article);
  const count = await recordsCounter.count(request.query);
  response.json({ count });
});

// Get a Article
router.get('/articles/:recordId', permissionMiddlewareCreator.details(), async (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
  const recordGetter = new RecordGetter(Article);
  const article = await recordGetter.get(request.params.recordId);
  const articleSerialized = await recordGetter.serialize(article);
  response.json(articleSerialized);
});

// Export a list of Articles
router.get('/articles.csv', permissionMiddlewareCreator.export(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
  next();
});

// Delete a list of Articles
router.delete('/articles', permissionMiddlewareCreator.delete(), (request, response, next) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
  next();
});

export = router;
