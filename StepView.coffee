class @StepView extends Marionette.ItemView
  template: _.template """
    <li class="step" data-type="step">
      <select name="" id="" class="type">
        <option <%= type == 'given' ? 'selected' : '' %> value="given">Given</option>
        <option <%= type == 'when' ? 'selected' : '' %> value="when">When</option>
        <option <%= type == 'then' ? 'selected' : '' %> value="then">Then</option>
        <option <%= type == 'and' ? 'selected' : '' %> value="and">And</option>
      </select>
      <input type="text" class="step-definition" value="<%= text %>">
      <a href="#" class="add">+</a> <a href="#" class="edit">edit</a> <a href="#" class="remove">x</a>
      <ol class="blocks">
        
        <li class="block prototype" data-type="block">
          
        </li>
      </ol>
    </li>
  """

  events:
    'click .add': 'handleClickAddStepDefinition'
    'click .remove': 'handleClickRemove'
    'change select': 'handleTypeChange'
    'keyup input': 'relayout'

  onShow: -> @focusInput()

  relayout: =>
    exists = if app.stepDefinitions.hasStep(@model.type = @getType(), @model.text = @getText() )
      true
    else
      false
    @$('.step').toggleClass('exists', exists)
    @model.trigger('change')
    @update()
    console.log 'relayout step', exists

  getType: -> @$('.type option:selected').val()
  getText: -> @$('.step-definition').val()

  update: =>
    @model.set 'type', @getType()
    @model.set 'text', @getText()

  focusInput: =>
     @$('.step-definition').focus()

  handleClickRemove: (ev) =>
    ev.preventDefault()
    @parent.handleRemoveStep( @model )
    @remove()

  handleTypeChange: (ev) =>
    ev.preventDefault()
    @relayout()
    @focusInput()

  handleClickAddStepDefinition: (ev) =>
    @update()
    app.stepDefinitions.add( @model )
    @relayout()
