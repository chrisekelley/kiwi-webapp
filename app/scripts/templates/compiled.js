(function(){dust.register("UserMainView",body_0);function body_0(chk,ctx){return chk.write("<h1>ID verification Confirmed</h1><p>You have been registered to use this device.</p><p>Do you want to:</p><p><a href=\"#\" data-role=\"button\" id=\"registrationLink\" class=\"scanner-buttons\">Register a new individual</a></p><p><a href=\"#\" data-role=\"button\" id=\"registrationLink\" class=\"scanner-buttons\">Enter a new report</a></p><p><a href=\"#\" data-role=\"button\" id=\"registrationLink\" class=\"scanner-buttons\">Log out</a></p>");}return body_0;})();
(function(){dust.register("UserRegistrationView",body_0);function body_0(chk,ctx){return chk.write("<p>You do not appear to be registered to use this device.</p><p>Please register with the following information before continuing.</p><input type=\"text\" name=\"name\" id=\"name\" placeholder=\"Name\"/><input type=\"text\" name=\"profession\" id=\"profession\" placeholder=\"Profession\"/><input type=\"text\" name=\"association\" id=\"association\" placeholder=\"Association\"/><input type=\"text\" name=\"district\" id=\"district\" placeholder=\"District\"/><p><a href=\"#\" data-role=\"button\" id=\"submitUserRegistration\" class=\"scanner-buttons\">Press to Register</a></p>");}return body_0;})();
(function(){dust.register("VerifyView",body_0);function body_0(chk,ctx){return chk.write("<!-- <div id=\"deviceready\" class=\"blink\"><p class=\"event listening\">Connecting to Device</p><p class=\"event received\">Device is Ready</p></div> --><!-- <p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p> --><p>To start please verify User Identification by placing thumb on the scanner and pressing the \"Scan\" button.</p><p><!--<a href=\"#\" data-role=\"button\" id=\"register\" class=\"scanner-buttons\">Register</a>--><a href=\"#\" data-role=\"button\" id=\"verify\" class=\"scanner-buttons\">Scan</a><!--<a href=\"#\" data-role=\"button\" id=\"blink\" class=\"scanner-buttons\">Test</a>--></p><input type=\"range\" name=\"slider\" id=\"slider\" data-highlight=\"true\" min=\"0\" max=\"50\" value=\"50\" style=\"display: none\">");}return body_0;})();