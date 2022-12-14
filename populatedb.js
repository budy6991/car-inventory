#! /usr/bin/env node

console.log(
  "This script populates some test cars, car instances, brands, car bodies, and manufacturers to the database"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");
var Car = require("./models/car");
var Brand = require("./models/brand");
var CarBody = require("./models/carBody");
var CarInstance = require("./models/carInstance");
var Manufacturer = require("./models/manufacturer");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var cars = [];
var brands = [];
var carBodies = [];
var carInstances = [];
var manufacturers = [];

function carCreate(
  name,
  model,
  year,
  description,
  manufacturer,
  car_body,
  brand,
  cb
) {
  cardetail = {
    name: name,
    model: model,
    year: year,
    description: description,
    manufacturer: manufacturer,
    car_body: car_body,
    brand: brand,
  };

  var car = new Car(cardetail);

  car.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New car: " + car);
    cars.push(car);
    cb(null, car);
  });
}

function brandCreate(name, description, cb) {
  var brand = new Brand({ name: name, description: description });

  brand.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Brand: " + brand);
    brands.push(brand);
    cb(null, brand);
  });
}

function carBodyCreate(name, description, cb) {
  var carBody = new CarBody({ name: name, description: description });
  carBody.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New CarBody: " + carbBody);
    carBodies.push(carBody);
    cb(null, carBody);
  });
}

function carInstanceCreate(car, authorized_dealer, status, available, cb) {
  carinstancedetail = {
    car: car,
    authorized_dealer: authorized_dealer,
  };
  if (available != false) carinstancedetail.available = available;
  if (status != false) carinstancedetail.status = status;

  var carinstance = new CarInstance(carinstancedetail);
  carinstance.save(function (err) {
    if (err) {
      console.log("ERROR CREATING CarInstance: " + carinstance);
      cb(err, null);
      return;
    }
    console.log("New CarInstance: " + carinstance);
    carInstances.push(carinstance);
    cb(null, car);
  });
}

function manufacturerCreate(name, description, headquarters, cb) {
  var manufacturer = new Manufacturer({
    name: name,
    description: description,
    headquarters: headquarters,
  });

  manufacturer.save(function (err) {
    if (err) {
      console.log("Error creating Manufacturer: " + manufacturer);
      cb(err, null);
      return;
    }
    console.log("New Manufacturer: " + manufacturer);
    manufacturers.push(manufacturer);
    cb(null, manufacturer);
  });
}

function createCarManufacturerBodyBrand(cb) {
  async.series(
    [
      function (callback) {
        manufacturerCreate(
          "Honda Motor Company",
          "Honda Motor Co., Ltd. is a Japanese public multinational conglomerate manufacturer of automobiles, motorcycles, and power equipment, headquartered in Minato, Tokyo, Japan",
          "Tokyo, Japan",
          callback
        );
      },
      function (callback) {
        manufacturerCreate(
          "Stellantis",
          "Stellantis N.V. is a multinational automotive manufacturing corporation formed in 2021 on the basis of a 50–50 cross-border merger between the Italian-American conglomerate Fiat Chrysler Automobiles and the French PSA Group. The company is headquartered in Amsterdam",
          "Amsterdam, The Netherlands",
          callback
        );
      },
      function (callback) {
        manufacturerCreate(
          "Volkswagen Group",
          "Volkswagen AG, known internationally as the Volkswagen Group, is a German multinational automotive manufacturer headquartered in Wolfsburg, Lower Saxony, Germany",
          "Wolfsburg, Germany",
          callback
        );
      },
      function (callback) {
        manufacturerCreate(
          "Toyota Motor Coorporation",
          "Toyota Motor Corporation is a Japanese multinational automotive manufacturer headquartered in Toyota City, Aichi, Japan. It was founded by Kiichiro Toyoda and incorporated on August 28, 1937. Toyota is one of the largest automobile manufacturers in the world, producing about 10 million vehicles per year.",
          "Aichi, Japan",
          callback
        );
      },
      function (callback) {
        manufacturerCreate(
          "General Motors",
          "The General Motors Company is an American multinational automotive manufacturing company headquartered in Detroit, Michigan, United States. It is the largest automaker in the United States and was the largest in the world for 77 years before losing the top spot to Toyota in 2008",
          "Flint, Michigan, USA",
          callback
        );
      },
      function (callback) {
        manufacturerCreate(
          "Zhejiang Geely Holding Group",
          "Zhejiang Geely Holding Group Co., Ltd, commonly known as Geely, is a Chinese multinational automotive company headquartered in Hangzhou, Zhejiang. The company is privately held by Chinese billionaire entrepreneur Li Shufu.",
          "Hong Kong, China",
          callback
        );
      },
      function (callback) {
        manufacturerCreate(
          "Renault-Nissan-Mitsubishi Alliance",
          "The Renault-Nissan-Mitsubishi Alliance, originally known as the Renault-Nissan Alliance, is a French-Japanese strategic alliance between the automobile manufacturers Renault, Nissan and Mitsubishi Motors, which together sell more than 1 in 9 vehicles worldwide.",
          "Chennai, India",
          callback
        );
      },
      function (callback) {
        genreCreate("Fantasy", callback);
      },
      function (callback) {
        genreCreate("Science Fiction", callback);
      },
      function (callback) {
        genreCreate("French Poetry", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createBooks(cb) {
  async.parallel(
    [
      function (callback) {
        bookCreate(
          "The Name of the Wind (The Kingkiller Chronicle, #1)",
          "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
          "9781473211896",
          authors[0],
          [genres[0]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
          "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
          "9788401352836",
          authors[0],
          [genres[0]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "The Slow Regard of Silent Things (Kingkiller Chronicle)",
          "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
          "9780756411336",
          authors[0],
          [genres[0]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "Apes and Angels",
          "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
          "9780765379528",
          authors[1],
          [genres[1]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "Death Wave",
          "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
          "9780765379504",
          authors[1],
          [genres[1]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "Test Book 1",
          "Summary of test book 1",
          "ISBN111111",
          authors[4],
          [genres[0], genres[1]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "Test Book 2",
          "Summary of test book 2",
          "ISBN222222",
          authors[4],
          false,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createBookInstances(cb) {
  async.parallel(
    [
      function (callback) {
        bookInstanceCreate(
          books[0],
          "London Gollancz, 2014.",
          false,
          "Available",
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[1],
          " Gollancz, 2011.",
          false,
          "Loaned",
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[2],
          " Gollancz, 2015.",
          false,
          false,
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[3],
          "New York Tom Doherty Associates, 2016.",
          false,
          "Available",
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[3],
          "New York Tom Doherty Associates, 2016.",
          false,
          "Available",
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[3],
          "New York Tom Doherty Associates, 2016.",
          false,
          "Available",
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[4],
          "New York, NY Tom Doherty Associates, LLC, 2015.",
          false,
          "Available",
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[4],
          "New York, NY Tom Doherty Associates, LLC, 2015.",
          false,
          "Maintenance",
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(
          books[4],
          "New York, NY Tom Doherty Associates, LLC, 2015.",
          false,
          "Loaned",
          callback
        );
      },
      function (callback) {
        bookInstanceCreate(books[0], "Imprint XXX2", false, false, callback);
      },
      function (callback) {
        bookInstanceCreate(books[1], "Imprint XXX3", false, false, callback);
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createGenreAuthors, createBooks, createBookInstances],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("BOOKInstances: " + bookinstances);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
