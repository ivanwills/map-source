Feature: default test suite

    Scenario: Loading default
        Given I have loaded widget "default" with use case "dataDriven"
        Then the element "dummy" should have the text "TODO default contents here."
