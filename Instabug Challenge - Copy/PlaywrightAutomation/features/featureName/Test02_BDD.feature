Feature: Change Language

    Scenario: 002 Open Google and Change the language
    
        Given I am on the google home page
        When  I click on the language button
        Then  I am directed to google home page with the choosen language
        | Current Language |
        | en-EG            |