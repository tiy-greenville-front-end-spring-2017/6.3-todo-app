var $ = require('jquery');

var models = require('./models/todo.js');
var views = require('./views/todo.js');

// DOM Ready
$(function(){

  var myTodos = new models.TodoCollection();

  var instructions = new views.Instructions();
  $('.instructions-container').html(instructions.render().$el);

  var todoForm = new views.TodoForm({collection: myTodos});
  $('.app').append(todoForm.render().el);

  var todoList = new views.TodoList({collection: myTodos});
  $('.app').append(todoList.render().el);

  myTodos.fetch();
});
