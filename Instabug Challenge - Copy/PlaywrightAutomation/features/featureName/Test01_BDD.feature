Feature: Try Your Luck Button

    Scenario: 001 Open Google and go to Try My Luck
    
        Given I am on the google home page
        When  I click on try my luck button
        Then  I am directed to doodles page
        | Doodles URL                    |
        | https://www.google.com/doodles |