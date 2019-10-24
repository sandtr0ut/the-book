/* eslint-disable prettier/prettier */
var db = require("../models");

module.exports = function(app) {
    app.get("/user/auth", function(request, response) {
        const { email, password } = request.body;
        if (!email || !password) {
            response
                .status(400)
                .send({
                    errorMessage: "Authentication requires an email and password as part of the request body",
                })
                .end();
            return;
        }
        db.User.findOne({
            where: { email, password },
        }).then(authUser => {
            if (!authUser) {
                response
                    .status(404)
                    .send({
                        errorMessage: "Failed to authenticate user with the given credentials",
                    })
                    .end();
                return;
            }
            response.send(authUser).end();
        });
    });
    app.get("/user/:id", function(request, response) {
        const { id } = request.params;
        db.User.findOne({ where: { id } }).then(userData => {
            if (userData) {
                response
                    .status(200)
                    .send(userData)
                    .end();
                return;
            } else {
                response
                    .status(400)
                    .send({
                        errorMessage: `Could not find user with the given id of ${id}`,
                    })
                    .end();
            }
        });
    });
    app.post("/user", function(request, response) {
        const { firstName, lastName, email, password, preferences } = request.body;
        let responseObject = { userId: -1, errorMessage: "", success: false };
        const requiredParams = ["firstName", "lastName", "email", "password", "preferences"];
        for (reqParam of requiredParams) {
            if (!request.body[reqParam]) {
                responseObject.errorMessage = `Request is missing ${reqParam} from the request body, and is a required parameter`;
                response
                    .status(400)
                    .send(responseObject)
                    .end();
                return;
            }
        }
        db.User.findOne({
            where: { email },
        })
            .then(existingUser => {
                if (!existingUser) {
                    db.User.create({ firstName, lastName, email, password, preferences })
                        .then(newUser => {
                            responseObject.userId = newUser.id;
                            responseObject.user = newUser;
                            response
                                .status(200)
                                .send(responseObject)
                                .end();
                            return;
                        })
                        .catch(err => {
                            responseObject.error = err;
                            responseObject.errorMessage = "Encountered an unknown error";
                            response
                                .status(400)
                                .send(responseObject)
                                .end();
                            return;
                        });
                } else {
                    responseObject.errorMessage = "A user already exists with the given email address";
                    response
                        .status(400)
                        .send(responseObject)
                        .end();
                    return;
                }
            })
            .catch(err => {
                responseObject.error = err;
                responseObject.errorMessage = "Encountered an unknown error";
                response
                    .status(400)
                    .send(responseObject)
                    .end();
                return;
            });
    });
    app.put("/user/:id", function(request, response) {
        const { id } = request.params;
        db.User.findOne({ where: { id } }).then(user => {
            if (!user) {
                response
                    .status(400)
                    .send({
                        errorMessage: "Given user id is invalid",
                    })
                    .end();
                return;
            } else {
                db.User.update(request.body, { where: { id } }).then(result => {
                    response.send(result).end();
                });
            }
        });
    });
    app.delete("/user/:id", function(request, response) {
        const { id } = request.params;
        db.User.destroy({ where: { id: parseInt(id) } })
            .then(() => {
                response
                    .send({
                        message: `Successfully delete user with id ${id}`,
                    })
                    .end();
            })
            .catch(() => {
                response
                    .status(400)
                    .send({
                        errorMessage: `Could not delete a user with the id of ${id}`,
                    })
                    .end();
            });
    });
};
