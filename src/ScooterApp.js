const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
    // Static scooterSessions array to track all sessions of scooterSessions.
    static scooterSessions = [];
    constructor() {
        this.stations = {
            "Manhattan": [],
            "Brooklyn": [],
            "Queens": [],
            "Bronx": [],
            "StatenIsland": []
        }

        this.registeredUsers = [];

        ScooterApp.scooterSessions.push(this)

        }

    register(user) {

        // Check age first to avoid wasting computation checking if they are already registered, if we can't register them anyway.
        if (user.age <= 17) {
            console.log("Too young to register!")
            return;
        }

        for (let i=0; i < this.registeredUsers.length; i++) {
            if (this.registeredUsers[i].Username === user.username) {
                console.log("Already registered!");
                return;
            }
        }

        // Only runs if user is old enough, and not already registered
        this.registeredUsers.push({"Username" : user.username, "Password" : user.password, "Age" : user.age, "loggedIn" : false, "accountChange" : 0})
        console.log("User has been registered!")

    }

    logIn(username, password) {
        // Check to see if user is registered
        for (let i=0; i < this.registeredUsers.length; i++) {
            if (this.registeredUsers[i].Username === username) {
                // If user is registered, check if password matches, and if it does, update user to be logged in.
                if (this.registeredUsers[i].Password === password) {
                    this.registeredUsers[i].loggedIn = true;
                    console.log("Welcome %s!", username)
                    return;
                }

                else {
                    // Error message should be the same if either match is false, so we break here to reach the error message directly outside the loop.
                    break;
                }
            }
        }
        console.log("Username or password is incorrect.");

    }

    addScooter(location, scooter) {

        if (location in this.stations) {
            scooter.station = location;
            this.stations[location].push(scooter);
        }

        else {
            throw ("Invalid location!");
        }

    }

    removeScooter(scooterToRemove) {
        // Find the scooter, and raise an error if it's not found.
        let i = this.stations[scooterToRemove.station].indexOf(scooterToRemove)

        // indexOf returns -1 if the element wasn't found
        if (i === -1) {
            throw ("Scooter not found!");
        }

        // Scooter was found, use splice to remove the scooter from the array, then update scooter's location.
        else {
            this.stations[scooterToRemove.station].splice(i, 1);
            scooterToRemove.station = null;
        }
    }

}

module.exports = ScooterApp
