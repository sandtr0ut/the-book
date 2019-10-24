/* eslint-disable prettier/prettier */
const apis = require("../controllers/externalAPI");

module.exports = function(app) {
    // App will take an id from the request body, get the preferences from the database (via Sequelize),
    // then make a request to the external API, returning both the pulled data combined with the user data
    app.get("/api/theodds/odds", function(request, response) {
        apis.theOdds.get
            .odds(request.query)
            .then(requestedData => {
                const { data } = requestedData;
                response.json(data);
            })
            .catch(err => console.log(err));
    });

    // TODO: Add documentation
    app.get("/api/theodds/sports", function(request, response) {
        apis.theOdds.get
            .sports(request.query)
            .then(requestedData => {
                console.log(requestedData);
                const { data } = requestedData;
                response.json(data);
            })
            .catch(err => console.log(err));
    });

    // Route will serve a list of available sports and their corresponding id's, mainly to provide a choice of sports to follow.
    // Sports data changes by season so list is updated dynamically through external api
    app.get("/api/rundown/sports", function(request, response) {
        apis.theRundown.get
            .sports(request.query)
            .then(requestedData => {
                const { data } = requestedData;
                response.json(data);
            })
            .catch(err => console.log(err));
    });

    // Route will serve a list of available sports and their corresponding id's, mainly to provide a choice of sports to follow.
    // Sports data changes by season so list is updated dynamically through external api
    app.get("/api/rundown/:id/events", function(request, response) {
        const id = request.params.id;
        apis.theRundown.get
            .events(id, request.query)
            .then(requestedData => {
                const { data } = requestedData;
                response.json(data);
            })
            .catch(err => console.log(err));
    });
};
