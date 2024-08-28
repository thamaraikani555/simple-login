(function (routeConfig) {
    'use strict';
  
    routeConfig.init = function (app, prefix) {

        // *** routes *** //
        const authRoute = require('../routes/authRoute');
        const userRoute = require('../routes/userRoute');
        
        app.use(`${prefix}/auth`, authRoute);
        app.use(`${prefix}/user`, userRoute);

        
    };

})(module.exports);
  