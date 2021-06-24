import { collection } from "forest-express-sequelize";
import {Op} from "sequelize";
// This file allows you to add to your Forest UI:
// - Smart actions: https://docs.forestadmin.com/documentation/reference-guide/actions/create-and-manage-smart-actions
// - Smart fields: https://docs.forestadmin.com/documentation/reference-guide/fields/create-and-manage-smart-fields
// - Smart relationships: https://docs.forestadmin.com/documentation/reference-guide/relationships/create-a-smart-relationship
// - Smart segments: https://docs.forestadmin.com/documentation/reference-guide/segments/smart-segments

collection('articles', {
  actions: [{
    name: 'Update body'
  }],
  fields: [{
    field: 'fullName',
    type: 'String',
    get: (article) => {
      return article.title + ' ' + article.body;
    },
    set: (article, fullName) => {
      const properties = fullName.split(' ');
      article.title = properties[0];
      article.body = properties[1];

      // Don't forget to return the customer.
      return article;
    },
    search: function (query, search) {
      const split = search.split(' ');

      const searchCondition = {
        [Op.and]: [
          { title: { [Op.iLike]: `%${split[0]}%` } },
          { body: { [Op.iLike]: `%${split[1]}%` } },
        ]
      };

      query.where[Op.and][0][Op.or].push(searchCondition);

      return query;
    },
    filter({ condition, where }) {
      const firstWord = !!condition.value && condition.value.split(' ')[0];
      const secondWord = !!condition.value && condition.value.split(' ')[1];

      switch (condition.operator) {
        case 'equal':
          return {
            [Op.and]: [
              { firstname: firstWord },
              { lastname: secondWord || '' },
            ],
          };
        case 'ends_with':
          if (!secondWord) {
            return {
              lastName: { [Op.iLike]: `%${firstWord}` },
            };
          }
          return {
            [Op.and]: [
              { firstName: { [Op.iLike]: `%${firstWord}` } },
              { lastName: secondWord },
            ],
          };

          // ... And so on with the other operators not_equal, starts_with, etc.

        default:
          return null;
      }
    }
  }],
  segments: [],
});
