

devStory = new Story
  description: 'As a developer...'
  scenarios: new Backbone.Collection( [new Scenario( title: 'Test 1' ) ] )


$(document).ready ->
  storyView = new StoryView
    model: devStory
  
  regionEl = $('.project .container')[0]
  window.app = 
    stepDefinitions:  new StepDefinitions()
    region: new Marionette.Region( el: regionEl )
  app.region.show storyView