class @StoryView extends Marionette.CompositeView
  className: 'story'
  template: _.template """
    <div class="card">
      <textarea class="description" placeholder="As a User..."><%- description %></textarea>
    </div>
    <ul class="scenarios">
    </ul>
    <button class="add-scenario">Add Scenario</button>
  """

  events:
    'click': 'handleClick'
    'click .add-scenario': 'handleClickAddScenario'
    'keyup .card > textarea': 'onShow'

  itemView: ScenarioView

  initialize: ->
    @collection = @model.get('scenarios')

  itemViewContainer: ".scenarios"
  
  onShow: ->
    @$('.description').focus()
    @textarea = @$el.find('> .card textarea').get(0)
    @textarea.style.height = "#{ @textarea.scrollHeight }px"
    console.log 'collection', @model.get('collection')
  
  removeScenario: (scenario) ->
    @collection.remove scenario

  handleClick: => @$el.toggleClass('selected')

  handleClickAddScenario: (ev) =>
    ev.preventDefault()
    scenario = new Scenario( title: '', steps: new Backbone.Collection() )
    @collection.add scenario
