const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')

// ScooterApp tests here
describe("Test ScooterApp", () => {

    // register user
    test("Registration (Happy path)", () => {
    let testScooterApp = new ScooterApp();
    let otherTestUser = new User("Ronak2", "test2", 20)
    let testUser = new User("Ronak", "testPassword", 19);

    testScooterApp.register(testUser);
    testScooterApp.register(otherTestUser);

    // Our expected return should be an object with all of the fields from testUser, plus accountChange and loggedIn.
    let expectedReturn = {"Username": testUser.username, "Password": testUser.password, "Age": testUser.age, "accountChange": 0, "loggedIn": false}

    expect(testScooterApp.registeredUsers[0]).toEqual(expectedReturn);

    })

    test("Registration (User is too young)", () => {
        let testScooterApp = new ScooterApp();
        let testUser = new User("Ronak", "testPassword", 15);

        testScooterApp.register(testUser);

        // Check that the user was not registered
        expect(testScooterApp.registeredUsers[0]).toEqual();

    })

    test("Registration (User is already registered)", () => {
        let testScooterApp = new ScooterApp();
        let testUser = new User("Ronak", "testPassword", 19);

        testScooterApp.register(testUser);
        testScooterApp.register(testUser);

        // Check that registered users is an array of length 1 (not 2)
        expect(testScooterApp.registeredUsers.length).toEqual(1)

    })

    // log in
    test("Login (Username and password are both correct)", () => {
        let testScooterApp = new ScooterApp();
        let testUser = new User("Ronak", "testPassword", 19);

        testScooterApp.register(testUser)

        // Should be false before logging in, and true after
        expect(testScooterApp.registeredUsers[0].loggedIn).toBe(false)
        testScooterApp.logIn("Ronak", "testPassword")
        expect(testScooterApp.registeredUsers[0].loggedIn).toBe(true)
    })

    test("Login (Username is wrong)", () => {
        let testScooterApp = new ScooterApp();
        let testUser = new User("Ronak", "testPassword", 19);

        testScooterApp.register(testUser)

        // Should be false before logging in, and stay false after - there should also be a console message indicating that login was not successful.
        expect(testScooterApp.registeredUsers[0].loggedIn).toBe(false)
        testScooterApp.logIn("NotRonak", "testPassword")
        expect(testScooterApp.registeredUsers[0].loggedIn).toBe(false)
    })

    test("Login (Username is correct, but password is wrong)", () => {
        let testScooterApp = new ScooterApp();
        let testUser = new User("Ronak", "testPassword", 19);

        testScooterApp.register(testUser)

        // Should be false before logging in, and stay false after
        expect(testScooterApp.registeredUsers[0].loggedIn).toBe(false)
        testScooterApp.logIn("Ronak", "notTestPassword")
        expect(testScooterApp.registeredUsers[0].loggedIn).toBe(false)
    })

    // add scooter
    test("Add scooter (Valid location)", () => {
        let testScooterApp = new ScooterApp();
        let testScooter = new Scooter("Manhattan", "Ronak")

        // Before adding, our scooter is at Manhattan, and no scooters are at brooklyn.
        expect(testScooter.station).toBe("Manhattan")
        expect(testScooterApp.stations["Brooklyn"].length).toBe(0)

        testScooterApp.addScooter("Brooklyn", testScooter)

        // Now, our scooter should be at Brooklyn, and there should be one scooter at Brooklyn.
        expect(testScooter.station).toBe("Brooklyn")
        expect(testScooterApp.stations["Brooklyn"].length).toBe(1)


    })

    test("Add scooter (Invalid location)", () => {
        let testScooterApp = new ScooterApp();
        let testScooter = new Scooter("Manhattan", "Ronak")

        // Add a scooter, but with an invalid location
        expect(() => { testScooterApp.addScooter("Monaco", testScooter); }).toThrow("Invalid location!")

    })
    // remove scooter
    test("Remove scooter (Scooter is found)", () => {
        let testScooterApp = new ScooterApp();
        let testScooter = new Scooter("Manhattan", "Ronak");

        testScooterApp.addScooter("Brooklyn", testScooter);

        // Scooter should be in the station before removal
        expect(testScooterApp.stations["Brooklyn"].length).toBe(1);

        testScooterApp.removeScooter(testScooter)

        // Scooter should be no longer in the station, and the scooter's station attribute should also be null
        expect(testScooterApp.stations["Brooklyn"].length).toBe(0);
        expect(testScooter.station).toBe(null)
    })

    test("Remove scooter (Scooter is not found)", () => {
        let testScooterApp = new ScooterApp();
        let testScooter = new Scooter("Manhattan", "Ronak");

        expect(() => { testScooterApp.removeScooter(testScooter); }).toThrow("Scooter not found!")

    })


})