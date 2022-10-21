const User = require('../src/User')

describe("User constructs correctly", () => {
    test_user = new User("Ronak", "testPassword", 19)

    // test username
    test("Username is correct", () => {
        expect(test_user.username).toBe("Ronak")
    })
    test("Password is correct", () => {
        expect(test_user.password).toBe("testPassword")
    })
    test("Age is correct", () => {
        expect(test_user.age).toBe(19)
    })

})