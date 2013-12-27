class @ScenarioView extends Marionette.CompositeView
  tagName: 'li'
  className: 'scenario'
  
  template: _.template """
    <a href="#" class="remove">x</a>
    <textarea type="text" class="title" placeholder="Scenario..."><%- title %></textarea>
    <ol class="steps">
    </ol>
    <button class="add-step">Add Step</button>
  """
  events:
    'click .add-step': 'handleClickAddStep'
    'click .remove': 'handleClickRemove'

  itemView: StepView
  itemViewContainer: ".steps"

  serializeData: ->
    title: @model.get( 'title' )

  initialize: ->
    @collection = @model.get('steps')
    console.log 'scenario view', @

  onShow: =>
    @$('.title').focus()

  handleClickRemove: (ev) =>
    ev.preventDefault()
    @model.trigger( 'remove' )
    @remove()

  updateStep: (step) ->
    console.log 'update step: ', step

  handleClickAddStep: (ev) =>
    ev.preventDefault()
    type = if @model.get('steps').length then 'and' else 'given'
    step = new Step( type: type, text: '' )
    @collection.add step
    console.log "step -> ", step, @collection

  handleRemoveStep: (step) =>
    @collection.remove step
        