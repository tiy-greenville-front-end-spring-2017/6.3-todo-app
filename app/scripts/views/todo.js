var $ = require('jquery');
var Backbone = require('backbone');

var todoForm = require('../../templates/todoForm.hbs');
var todoItemTemplate = require('../../templates/todoItem.hbs');

var Instructions = Backbone.View.extend({
  tagName: 'p',
  // attributes: {
  //   id: 'instructions',
  //   'class': 'todo-instructions well col-md-12'
  // },
  id: 'instructions',
  className: 'todo-instructions well col-md-12',
  render: function(){
    this.$el.text('Please add your efficient todos');

    // always return this from render
    return this;
  }
});

var TodoForm = Backbone.View.extend({
  tagName: 'form',
  events: {
    'submit': 'addTodo'
  },
  id: 'todo-form',
  className: 'well',
  render: function(){
    console.log(todoForm);
    this.$el.html(todoForm());
    return this;
  },
  addTodo: function(event){
    event.preventDefault();

    var $todoTitle = $('#title');
    this.collection.create({title: $todoTitle.val()});

    $todoTitle.val('');
  }
});

var TodoList = Backbone.View.extend({
  tagName: 'ul',
  className: 'list-group',
  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderTodoItem);
  },
  render: function(){
    return this;
  },
  renderTodoItem: function(todo){
    // todo: model that was just added to this.collection
    var todoItem = new TodoItemView({model: todo});
    this.$el.append(todoItem.render().el);
  }
});

var TodoItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'list-group-item clearfix todo-item',
  template: todoItemTemplate,
  events: {
    'click .clickme': 'markComplete'
  },
  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
  },
  render: function(){
    var context = this.model.toJSON();

    this.$el.html(this.template(context));

    return this;
  },
  markComplete: function(event){
    event.preventDefault();
    this.model.destroy();
  },
  // remove: function(){
  //   this.$el.remove();
  // }
});

module.exports = {
  Instructions: Instructions,
  TodoForm: TodoForm,
  TodoList: TodoList,
  TodoItemView: TodoItemView
};
