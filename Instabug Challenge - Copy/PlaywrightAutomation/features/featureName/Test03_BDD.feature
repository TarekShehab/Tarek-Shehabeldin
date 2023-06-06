Feature: Search with text

    Scenario: 003 Search for a website
    
        Given I am on the google home page
        When  I search for a website name
        | website     |
        | sa3dawy.com |
        Then  I can find the website in the results
        | Result Heading  |
        | sa3dawy garage. |