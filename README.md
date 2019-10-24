# Project2
Group 3 - Project 2

---

# **theBook**

> ## Your Personalized Sports Dashboard for Wagering Information, Execution and Tracking

<br>

This project is ultimately intended to be able to perform the following tasks:
- Provide a consolidated listing of sports betting odds for in-season sports and upcoming events
- Authenticate users.
- Allow users to store their team/sports genre/betting information to their personal profile.
- Allow users to access that stored data from their personal profile.
- Allow users to submit and track simulated bets.

<br>

## *Buyer/User Persona:*

As a die-hard sports fan, I love having skin in the game. It gives me a personal stake and makes players and teams that I otherwise wouldn't think about relevant.  A few good wagers, whether for dollars, fantasy points, or bragging rights, make watching the games more interesting and fun and make me a more knowledgable and well-rounded sports fan.

<br>

# Agile: Epics

## *Epic #1:*
As a user, I want to have a `customized dashboard` so I can quickly access the information that is important to me.
<br>
### *Epic #2:*
As a user, I want to have access to the `upcoming game schedule` so I can avoid searching through different websites
<br>
### *Epic #3:*
As a user, I want to have access to the `betting odds` so I can evaluate potential wagers without searching through different websites
<br>
### *Epic #4:*
As a user, I want to be able to `place & track "paper' bets` so I can emulate the excitement of cash bets, without risking the rent money.
<br>
### *Epic #5:*
As a user, I want to be able to keep a running tally of my wagering `finances` so I can keep track of how well I am doing.
<br>
### *Epic #6:*
As a user, I want my dashboard to display `links to relevant news stories` so I can quickly gain context for my wagering and entertainment
<br>

### Project Structure


```
└── config
│   ├── config.json
│   └── middleware
│       └── isAuthenticated.js
│
└── controllers
│   ├── Cycle.js
│   └── externalAPI.js
│ 
└── models
│   └── schema.sql
│   └── index.js
│   └── user.js
│
└── node_modules
│ 
└── package.json
│
└── public
│   └── assets
│       ├── css
│       │   └── bulma.css
│       │   └── bulma.css.map.css
│       │   └── bulma.min.css
│       │   └── index.css
│       └── images
│       └── js
│           └── bulma.js
│           └── index.js
└── routes
│   └── apiRoutes.js
│   └── htmlRoutes.js
│   └── userRoutes.js
│
└── test
│   └── canary.test.js
│
└── views
│   ├── layouts
│   │   └── main.handlebars
│   ├── 404.handlebars
│   ├── index.handlebars
│   ├── login.handlebars
│   ├── signup.handlebars
│   ├── preferences.handlebars
│   └── mlb.handlebars
│
└── .eslintrc.json
└── .gitignore
└── .env
└── package-lock.json
└── package.json
└── README.md
└── Procfile
│ 
└── server.js



``` 
