/* eslint-disable dot-notation */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
// var db = require("../models");

const apis = require("../controllers/externalAPI");

const sportList = [
    {
        "sport_id": 1,
        "sport_name": "NCAA Football"
    },
    {
        "sport_id": 2,
        "sport_name": "NFL"
    },
    {
        "sport_id": 3,
        "sport_name": "Major League Baseball"
    },
    {
        "sport_id": 4,
        "sport_name": "NBA"
    },
    {
        "sport_id": 5,
        "sport_name": "NCAA Men's Basketball"
    },
    {
        "sport_id": 6,
        "sport_name": "NHL"
    },
    {
        "sport_id": 7,
        "sport_name": "UFC/MMA"
    },
    {
        "sport_id": 8,
        "sport_name": "WNBA"
    },
    {
        "sport_id": 9,
        "sport_name": "CFL"
    }
];

function getSports(id, request, response) {
    apis.theRundown.get
        .events(id)
        .then(requestedData => {
            const { data } = requestedData;
            let eventsArray = [];
            
            let current = parseInt(id) - 1;
            let currSport = sportList[current];
            console.log("Current Sport = " + currSport);
            let currentSport = currSport.sport_name;

            for (var i = 0; i < data.events.length; i++) {
                var game = data.events[i];

                var details = {
                    eventDate: game.event_date,
                    awayTeam: game.teams[0].name,
                    homeTeam: game.teams[1].name,
                    awayPoints: game.lines["1"]["spread"]["point_spread_away"],
                    homePoints: game.lines["1"]["spread"]["point_spread_home"],
                    awayMoney: game.lines["1"]["moneyline"]["moneyline_away"],
                    homeMoney: game.lines["1"]["moneyline"]["moneyline_home"],
                    totalOver: game.lines["1"]["total"]["total_over"],
                    totalUnder: game.lines["1"]["total"]["total_under"],
                    totalOverMoney: game.lines["1"]["total"]["total_over_money"],
                    totalUnderMoney: game.lines["1"]["total"]["total_under_money"],
                };
                eventsArray.push(details);
            }
            response.render("sports", {
                currentSport: currentSport,
                eventsArray,
            });
        })
        .catch(err => console.log(err));
}

module.exports = function(app) {
    // Load index page
    app.get("/", function(request, response) {
        response.render("index", request);
    });
    // Load example page and pass in an example by id
    app.get("/login", function(request, response) {
        response.render("login", request);
    });
    app.get("/signup", function(request, response) {
        response.render("signup", request);
    });
    app.get("/preferences", function(request, response) {
        response.render("preferences", request);
    });
    app.get("/mlb", function(request, response) {
        getSports(3, request, response);
    });
    app.get("/nba", function(request, response) {
        getSports(4, request, response);
    });    
    app.get("/ncaab", function(request, response) {
        getSports(5, request, response);
    });
    app.get("/nfl", function(request, response) {
        getSports(2, request, response);
    });    
    app.get("/ncaaf", function(request, response) {
        getSports(1, request, response);
    });
    app.get("/nhl", function(request, response) {
        getSports(6, request, response);
    });
    app.get("/ufcmma", function(request, response) {
        getSports(7, request, response);
    });
    app.get("/wnba", function(request, response) {
        getSports(8, request, response);
    });
    app.get("/mls", function(request, response) {
        getSports(10, request, response);
    });
    app.get("/cfl", function(request, response) {
        getSports(9, request, response);
    });
    // Render 404 page for any unmatched routes
    app.get("*", function(request, response) {
        response.render("404", response);
    });
};
