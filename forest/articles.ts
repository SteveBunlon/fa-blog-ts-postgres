import { collection } from "forest-express-sequelize";
import {Article} from "../models/article";
import {Op, QueryOptionsWithWhere} from "sequelize";

// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments
collection('articles', {
  actions: [{
    name: 'test',
    type: 'global',
    fields: [{
      field: 'text',
      type: 'String',
    }]
  }],
  fields: [{
    field: 'deleteme',
    type: 'string',
    enums: [],
    description: 'deleteme',
    reference: null,
    isReadOnly: false,
    isRequired: false,
    get: (record) => {
      return record['deleteme'] = 'As I said, deleteme';
    },
    set: (record: Article, smartFieldValue) => {
      return null;
    },
    search: (query, search) =>  {
      console.log(query);
      query.where[Op.and][0][Op.or].push(search);
      return query;
    },
    /*filter: () => {

    }*/
  }],
  segments: [],
});
