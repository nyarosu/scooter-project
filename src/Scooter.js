class Scooter{
  constructor(station, user) {
      this.station = station;
      this.user = user;
      this.serial = Math.floor(Math.random() * 1001)
      this.charge = Math.floor(Math.random() * 101)
      this.isBroken = false;
      this.docked = true;
  }

  // Returns true on success, false on failure
  rent() {
      if ((this.isBroken === false) && (this.charge > 20)) {
          this.docked = false;
          console.log("Enjoy the ride!")
          return true;
      }

      else if (this.charge <= 20) {
          throw ("Scooter low on battery, please recharge.");
      }

      else {
          throw ("Scooter is broken, please send a repair request.");
      }

  }

  dock(station) {
      if (station == null) {
          throw ("Docking station required!");
      }

      else {
          this.docked = true;
          this.user = "";
      }
  }

  async recharge() {
      console.log('Starting charge');

      await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
      this.charge = 100

      console.log('Charge complete');
  }

  async requestRepair() {

      console.log('Starting repair');

      await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
      this.isBroken = false;

      console.log('Repairs complete');
    }


}


module.exports = Scooter
