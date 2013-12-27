// Generated by CoffeeScript 1.6.3
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.StepView = (function(_super) {
    __extends(StepView, _super);

    function StepView() {
      this.handleClickAddStepDefinition = __bind(this.handleClickAddStepDefinition, this);
      this.handleTypeChange = __bind(this.handleTypeChange, this);
      this.handleClickRemove = __bind(this.handleClickRemove, this);
      this.focusInput = __bind(this.focusInput, this);
      this.update = __bind(this.update, this);
      this.relayout = __bind(this.relayout, this);
      _ref = StepView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    StepView.prototype.template = _.template("<li class=\"step\" data-type=\"step\">\n  <select name=\"\" id=\"\" class=\"type\">\n    <option <%= type == 'given' ? 'selected' : '' %> value=\"given\">Given</option>\n    <option <%= type == 'when' ? 'selected' : '' %> value=\"when\">When</option>\n    <option <%= type == 'then' ? 'selected' : '' %> value=\"then\">Then</option>\n    <option <%= type == 'and' ? 'selected' : '' %> value=\"and\">And</option>\n  </select>\n  <input type=\"text\" class=\"step-definition\" value=\"<%= text %>\">\n  <a href=\"#\" class=\"add\">+</a> <a href=\"#\" class=\"edit\">edit</a> <a href=\"#\" class=\"remove\">x</a>\n  <ol class=\"blocks\">\n    \n    <li class=\"block prototype\" data-type=\"block\">\n      \n    </li>\n  </ol>\n</li>");

    StepView.prototype.events = {
      'click .add': 'handleClickAddStepDefinition',
      'click .remove': 'handleClickRemove',
      'change select': 'handleTypeChange',
      'keyup input': 'relayout'
    };

    StepView.prototype.onShow = function() {
      return this.focusInput();
    };

    StepView.prototype.relayout = function() {
      var exists;
      exists = app.stepDefinitions.hasStep(this.model.type = this.getType(), this.model.text = this.getText()) ? true : false;
      this.$('.step').toggleClass('exists', exists);
      this.model.trigger('change');
      this.update();
      return console.log('relayout step', exists);
    };

    StepView.prototype.getType = function() {
      return this.$('.type option:selected').val();
    };

    StepView.prototype.getText = function() {
      return this.$('.step-definition').val();
    };

    StepView.prototype.update = function() {
      this.model.set('type', this.getType());
      return this.model.set('text', this.getText());
    };

    StepView.prototype.focusInput = function() {
      return this.$('.step-definition').focus();
    };

    StepView.prototype.handleClickRemove = function(ev) {
      ev.preventDefault();
      this.parent.handleRemoveStep(this.model);
      return this.remove();
    };

    StepView.prototype.handleTypeChange = function(ev) {
      ev.preventDefault();
      this.relayout();
      return this.focusInput();
    };

    StepView.prototype.handleClickAddStepDefinition = function(ev) {
      this.update();
      app.stepDefinitions.add(this.model);
      return this.relayout();
    };

    return StepView;

  })(Marionette.ItemView);

}).call(this);
