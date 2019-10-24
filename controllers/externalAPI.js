/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
require("dotenv").config();
const axios = require("axios");
const Cycle = require("../controllers/Cycle");

const theOddsKeys = new Cycle([process.env.THE_ODDS_API_KEY_1, process.env.THE_ODDS_API_KEY_2]);
const theRundownKeys = new Cycle([process.env.THE_RUNDOWN_API_KEY_1]);

module.exports = {
    theOdds: {
        get: {
            sports: function(query = {}) {
                console.log(theOddsKeys.get());
                return axios.get("https://api.the-odds-api.com/v3/sports", {
                    params: Object.assign(query, {
                        api_key: theOddsKeys.get(),
                    }),
                });
            },
            odds: function(query = {}) {
                return axios.get("https://api.the-odds-api.com/v3/odds", {
                    params: Object.assign(query, {
                        api_key: theOddsKeys.get(),
                    }),
                });
            },
        },
    },
    theRundown: {
        get: {
            sports: function() {
                return axios.request({
                    url: "https://therundown-therundown-v1.p.rapidapi.com/sports",
                    method: "get",
                    headers: { "X-RapidAPI-Host": "therundown-therundown-v1.p.rapidapi.com" },
                    headers: { "X-RapidAPI-Key": theRundownKeys.get() },
                });
            },
            events: function(sportId) {
                return axios.request({
                    url: `https://therundown-therundown-v1.p.rapidapi.com/sports/${sportId}/events?include=all_periods%2C+scores%2C+and%2For+teams`,
                    method: "get",
                    headers: { "X-RapidAPI-Host": "therundown-therundown-v1.p.rapidapi.com" },
                    headers: { "X-RapidAPI-Key": theRundownKeys.get() },
                });
            },
        },
    },
};
