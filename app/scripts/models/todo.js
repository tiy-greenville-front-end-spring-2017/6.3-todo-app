var Backbone = require('backbone');

var TodoItem = Backbone.Model.extend({
  idAttribute: '_id'
});

var TodoCollection = Backbone.Collection.extend({
  model: TodoItem,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/todo/'
});

module.exports = {
  TodoItem: TodoItem,
  TodoCollection: TodoCollection
};
