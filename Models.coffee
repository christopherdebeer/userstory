String::capitalize = ->
  @.charAt(0).toUpperCase() + @slice(1)

class @Step extends Backbone.Model
  defaults:
    type: 'given'
    text: ''

  initialize: ({@type, @text}) ->

class @Scenario extends Backbone.Model
  defaults:
    title: ''
    steps: new Backbone.Collection()

  initialize: ({@title, @steps}) ->

  toJSON: ->
    title: @get( 'title' )
    steps: @get( 'steps' ).toJSON()

class @Story extends Backbone.Model
  defaults:
    description: ''
    scenarios: new Backbone.Collection()

  initialize: ({@description, @scenarios}) ->

  toJSON: ->
    description: @get( 'description' )
    scenarios: @get( 'scenarios' ).toJSON()

  toCucumber: ->
    story = @toJSON()
    cuke = "Feature: Story\n\t#{story.description}\n"
    for scenario in story.scenarios
      cuke += "\n\tScenario: #{scenario.title}\n"
      for step in scenario.steps
        cuke += "\t\t#{step.type.capitalize()} #{step.text}\n"
    cuke

class @StepDefinitions
  constructor: ({@steps} = { steps: {'default': true} }) -> 
  hasStep: (type, text) => @steps[text]?
  add: (step) =>
    console.log 'adding step: ', step
    @steps[ step.get('text') ] = true

  toJSON: => @steps



