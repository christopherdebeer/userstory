// Generated by CoffeeScript 1.6.3
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.ScenarioView = (function(_super) {
    __extends(ScenarioView, _super);

    function ScenarioView() {
      this.handleRemoveStep = __bind(this.handleRemoveStep, this);
      this.handleClickAddStep = __bind(this.handleClickAddStep, this);
      this.handleClickRemove = __bind(this.handleClickRemove, this);
      this.onShow = __bind(this.onShow, this);
      _ref = ScenarioView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ScenarioView.prototype.tagName = 'li';

    ScenarioView.prototype.className = 'scenario';

    ScenarioView.prototype.template = _.template("<a href=\"#\" class=\"remove\">x</a>\n<textarea type=\"text\" class=\"title\" placeholder=\"Scenario...\"><%- title %></textarea>\n<ol class=\"steps\">\n</ol>\n<button class=\"add-step\">Add Step</button>");

    ScenarioView.prototype.events = {
      'click .add-step': 'handleClickAddStep',
      'click .remove': 'handleClickRemove'
    };

    ScenarioView.prototype.itemView = StepView;

    ScenarioView.prototype.itemViewContainer = ".steps";

    ScenarioView.prototype.serializeData = function() {
      return {
        title: this.model.get('title')
      };
    };

    ScenarioView.prototype.initialize = function() {
      this.collection = this.model.get('steps');
      return console.log('scenario view', this);
    };

    ScenarioView.prototype.onShow = function() {
      return this.$('.title').focus();
    };

    ScenarioView.prototype.handleClickRemove = function(ev) {
      ev.preventDefault();
      this.model.trigger('remove');
      return this.remove();
    };

    ScenarioView.prototype.updateStep = function(step) {
      return console.log('update step: ', step);
    };

    ScenarioView.prototype.handleClickAddStep = function(ev) {
      var step, type;
      ev.preventDefault();
      type = this.model.get('steps').length ? 'and' : 'given';
      step = new Step({
        type: type,
        text: ''
      });
      this.collection.add(step);
      return console.log("step -> ", step, this.collection);
    };

    ScenarioView.prototype.handleRemoveStep = function(step) {
      return this.collection.remove(step);
    };

    return ScenarioView;

  })(Marionette.CompositeView);

}).call(this);
