const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('scooter object', () => {
  test('Constructs correctly', () => {

    let test_scooter = new Scooter("Monaco", "Ronak")
    expect(test_scooter.user).toEqual("Ronak");
    expect(test_scooter.station).toEqual("Monaco");

    // Test serial is between 0 and 1000
    expect(test_scooter.serial).toBeGreaterThanOrEqual(0);
    expect(test_scooter.serial).toBeLessThanOrEqual(1000);

    // Test charge is between 0 and 100
    expect(test_scooter.charge).toBeGreaterThanOrEqual(0);
    expect(test_scooter.charge).toBeLessThanOrEqual(100);

    expect(test_scooter.isBroken).toBe(false);
    expect(test_scooter.docked).toBe(true);

  }
)
})

//Method tests
describe('scooter methods', () => {
  //rent method
  test('Rent method works correctly (Happy Path)', () => {
    let test_scooter = new Scooter("Monaco", "Ronak")
    // Ensure that conditions are right for happy path execution, and that the scooter was docked before.
    test_scooter.charge = 50;
    test_scooter.isBroken = false;
    expect(test_scooter.docked).toBe(true)

    // Now we rent the scooter, and ensure that the scooter is now undocked - this proves happy path was executed.
    test_scooter.rent();
    expect(test_scooter.docked).toBe(false)

  })

  test('Rent method works correctly (Low Battery)', () => {
    let test_scooter = new Scooter("Monaco", "Ronak")
    // Ensure that conditions are right for low battery path execution, and that the scooter was docked before.
    test_scooter.charge = 10;
    test_scooter.isBroken = false;
    expect(test_scooter.docked).toBe(true)

    // Now we rent the scooter, and ensure that the correct exception is thrown
    expect(() => { test_scooter.rent(); }).toThrow("Scooter low on battery, please recharge.")
  })

  test('Rent method works correctly (Broken)', () => {
    let test_scooter = new Scooter("Monaco", "Ronak")
    // Ensure that conditions are right for low battery path execution, and that the scooter was docked before.
    test_scooter.charge = 30;
    test_scooter.isBroken = true;
    expect(test_scooter.docked).toBe(true)

    // Now we rent the scooter, and ensure that the correct exception is thrown
    expect(() => { test_scooter.rent(); }).toThrow("Scooter is broken, please send a repair request.")

  })



  //dock method
  test("Dock method works correctly (Happy Path)", () => {
    let test_scooter = new Scooter("Monaco", "Ronak")
    test_scooter.charge = 100;
    test_scooter.rent()
    expect(test_scooter.docked).toBe(false)

    test_scooter.dock("TestStation");

    expect(test_scooter.docked).toBe(true)
    expect(test_scooter.user).toBe("")

  })

  test("Dock method works correctly (Station not provided)", () => {
    let test_scooter = new Scooter("Monaco", "Ronak")
    test_scooter.charge = 100;
    test_scooter.rent()
    expect(test_scooter.docked).toBe(false);

    // Forget to include the station
    expect(() => { test_scooter.dock(); }).toThrow("Docking station required!")

  })


  //requestRepair method
  test("requestRepair works correctly", async () => {
    const test_scooter = new Scooter("Monaco", "Ronak");

    // Scooter should be broken before
    test_scooter.isBroken = true;
    expect(test_scooter.isBroken).toBe(true);

    await test_scooter.requestRepair();

    // Scooter should be fixed!
    expect(test_scooter.isBroken).toBe(false);
  });

  //charge method
  test("recharge works correctly", async () => {
    const test_scooter = new Scooter("Monaco", "Ronak");
    test_scooter.charge = 0;

    // Charge should be 0 before
    expect(test_scooter.charge).toBe(0);

    await test_scooter.recharge();

    // Charge should now be 100
    expect(test_scooter.charge).toBe(100);
  })
})
