# Kiwi-webapp

This is the webapp for [kiwi-cordova](https://github.com/chrisekelley/kiwi-cordova).

# Development

## Bootstrapping

This was bootstrapped using the [Generator Maryo](https://github.com/simonblee/generator-maryo).

Added jquery-mobile:

    bower install -save jquery-mobile-bower
    
## Lint

The generator does not produce 100% lint-happy code. See .jshintrc for more info. 

Also added the following code to some of the generated js to ignore "quotmark": "single"

    /*jshint -W109 */ 
    
Added the following to config.js to force recognition of require

    /*global require   */

Removed "indent":2

Changed the following to false:

    "strict": true,
    "trailing": true,




