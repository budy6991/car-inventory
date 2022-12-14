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
          "Stellantis N.V. is a multinational automotive manufacturing corporation formed in 2021 on the basis of a 50-50 cross-border merger between the Italian-American conglomerate Fiat Chrysler Automobiles and the French PSA Group. The company is headquartered in Amsterdam",
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
        manufacturerCreate(
          "Ford Motor Company",
          "Ford Motor Company is an American multinational automobile manufacturer headquartered in Dearborn, Michigan, United States. It was founded by Henry Ford and incorporated on June 16, 1903. The company sells automobiles and commercial vehicles under the Ford brand, and luxury cars under its Lincoln luxury brand.",
          "Dearborn, Michigan, United States",
          callback
        );
      },
      function (callback) {
        manufacturerCreate(
          "Hyundai Motor Group",
          "Hyundai Motor Company, often abbreviated to Hyundai Motors and commonly known as Hyundai, is a South Korean multinational automotive manufacturer headquartered in Seoul, South Korea, and founded in 1967.",
          "Seoul, South Korea",
          callback
        );
      },
      function (callback) {
        carBodyCreate(
          "Hatchback",
          "A hatchback is a car body configuration with a rear door that swings upward to provide access to a cargo area. Hatchbacks may feature fold-down second row seating, where the interior can be reconfigured to prioritize passenger or cargo volume. Hatchbacks may feature two- or three-box design.",
          callback
        );
      },
      function (callback) {
        carBodyCreate(
          "Minivan",
          "Minivan is a North American car classification for vehicles designed to transport passengers in the rear seating row, with reconfigurable seats in two or three rows. The equivalent classification in Europe is MPV.",
          callback
        );
      },
      function (callback) {
        carBodyCreate(
          "Crossover",
          "A crossover, crossover SUV, or crossover utility vehicle is a type of automobile with increased ride height that is built on unibody chassis construction shared with passenger cars, as opposed to traditional sport utility vehicles which are built on a body-on-frame chassis construction similar to pickup trucks",
          callback
        );
      },
      function (callback) {
        carBodyCreate(
          "Coupe",
          "A coupe or coupé is a passenger car with a sloping or truncated rear roofline and two doors. The term coupé was first applied to horse-drawn carriages for two passengers without rear-facing seats. It comes from the French past participle of couper, 'cut'.",
          callback
        );
      },
      function (callback) {
        carBodyCreate(
          "Supercar",
          "A supercar - also called exotic car - is a loosely defined description of street-legal, high-performance sports cars. Since the 2010s, the term hypercar has come into use for the highest performing supercars.",
          callback
        );
      },
      function (callback) {
        carBodyCreate(
          "Kammback",
          "A Kammback—also known as a Kamm tail or K-tail—is an automotive styling feature wherein the rear of the car slopes downwards before being abruptly cut off with a vertical or near-vertical surface.",
          callback
        );
      },
      function (callback) {
        carBodyCreate(
          "Cabriolet/Convertible",
          "A convertible or cabriolet is a passenger car that can be driven with or without a roof in place. The methods of retracting and storing the roof vary among eras and manufacturers. A convertible car's design allows an open-air driving experience, with the ability to provide a roof when required.",
          callback
        );
      },
      function (callback) {
        carBodyCreate(
          "Sedan",
          "A sedan or saloon is a passenger car in a three-box configuration with separate compartments for an engine, passengers, and cargo. The first recorded use of the word 'sedan' in reference to an automobile body occurred in 1912.",
          callback
        );
      },
      function (callback) {
        carBodyCreate(
          "Campervan",
          "A camper van, also referred to as a camper, caravanette, motor caravan or RV (recreational vehicle) in North America, is a self-propelled vehicle that provides both transport and sleeping accommodation.",
          callback
        );
      },
      function (callback) {
        carBodyCreate(
          "Micro Car",
          "Microcar is a term often used for the smallest size of cars, with three or four wheels and often an engine smaller than 700 cc (43 cu in).",
          callback
        );
      },
      function (callback) {
        carBodyCreate(
          "SUV",
          "A sport utility vehicle is a car classification that combines elements of road-going passenger cars with features from off-road vehicles, such as raised ground clearance and four-wheel drive. There is no commonly agreed-upon definition of an SUV and usage of the term varies between countries.",
          callback
        );
      },
      function (callback) {
        carBodyCreate(
          "Roadster",
          "A roadster is an open two-seat car with emphasis on sporting appearance or character. Initially an American term for a two-seat car with no weather protection, usage has spread internationally and has evolved to include two-seat convertibles.",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "BMW",
          "Bayerische Motoren Werke AG, abbreviated as BMW, is a German multinational manufacturer of performance luxury vehicles and motorcycles headquartered in Munich, Bavaria, Germany.",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Ford",
          "One of the main brands of vehicles worlwide which belongs to Ford Motor Company. Alternatively, it has an upper division of cars under the name of Ford Performance, utilized for racing and competition. ",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Acura",
          "Acura is the luxury and performance division of Japanese automaker Honda, based primarily in North America. The brand was launched in the United States and Canada on March 27, 1986, marketing luxury and performance automobiles. ",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Honda",
          "One of the main brands of Honda Motor Company, specialized on automobiles, motorcycles and power equipment",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Kia",
          "Kia Corporation is a South Korean multinational automobile manufacturer headquartered in Seoul, South Korea. It is South Korea's second largest automobile manufacturer, after its parent company, Hyundai Motor Company, with sales of over 2.8 million vehicles in 2019.",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Hyundai",
          "Hyundai Automobiles is one of the main brands of Hyundai Motor Company.",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Lexus",
          "Lexus is the luxury vehicle division of the Japanese automaker Toyota. The Lexus brand is marketed in more than 90 countries and territories worldwide and is Japan's largest-selling make of premium cars. It has ranked among the 10 largest Japanese global brands in market value.",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Toyota",
          "Toyota Automobile, is along with Lexus one of the main brands of the Toyota Motor Corporation headquartered in Japan.",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Fiat",
          "Fiat Automobiles S.p.A. is an Italian automobile manufacturer, formerly part of Fiat Chrysler Automobiles, and since 2021 a subsidiary of Stellantis through its Italian division Stellantis Italy.",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Masserati",
          "Maserati S.p.A. is an Italian luxury vehicle manufacturer. Established on 1 December 1914, in Bologna, Italy, the company's headquarters are now in Modena, and its emblem is a trident. The company has been owned by Stellantis since 2021. Maserati was initially associated with Ferrari. ",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Alfa Romeo",
          "Alfa Romeo Automobiles S.p.A. is an Italian luxury car manufacturer and a subsidiary of Stellantis. The company was founded on 24 June 1910, in Milan, Italy. 'Alfa' is an acronym of its founding name, 'Anonima Lombarda Fabbrica Automobili.' 'Anonima' means 'anonymous', which was a legal form of company at the time.",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Citroën",
          "Citroen is a French automobile brand. The 'Automobiles Citroën' manufacturing company was founded in March 1919 by André Citroën. Citroën is owned by Stellantis since 2021 and previously was part of the PSA Group after Peugeot acquired 89.95% share in 1976.",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Opel",
          "Opel Automobile GmbH usually shortened to Opel, is a German automobile manufacturer which has been a subsidiary of Stellantis since 16 January 2021.",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Peugeot",
          "Peugeot is a French brand of automobiles owned by Stellantis. The family business that preceded the current Peugeot companies was founded in 1810, with a steel foundry that soon started making hand tools and kitchen equipment, and then bicycles. On 20 November 1858, Émile Peugeot applied for the lion trademark.",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Audi",
          "Audi AG is a German automotive manufacturer of luxury vehicles headquartered in Ingolstadt, Bavaria, Germany. As a subsidiary of its parent company, the Volkswagen Group, Audi produces vehicles in nine production facilities worldwide.",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Porsche",
          "Dr. Ing. h.c. F. Porsche AG, usually shortened to Porsche, is a German automobile manufacturer specializing in high-performance sports cars, SUVs and sedans, headquartered in Stuttgart, Baden-Württemberg, Germany.",
          callback
        );
      },
      function (callback) {
        brandCreate(
          "Volkswagen",
          "Volkswagen, abbreviated as VW, is a German motor vehicle manufacturer headquartered in Wolfsburg, Lower Saxony, Germany. ",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createCars(cb) {
  async.parallel(
    [
      // Name, model,  year, description, price, manufacturer, car_body, brand
      function (callback) {
        carCreate(
          "Volkswagen",
          "Golf R",
          "2023",
          "Redesigned version of the popular Volkswagen Golf from 2022",
          45090,
          manufacturers[2],
          carBodies[0],
          brands[18],
          callback
        );
      },
      function (callback) {
        carCreate(
          "Acura",
          "Integra",
          "2023",
          "An upscale version of the famour Honda Civic",
          35800,
          manufacturers[0],
          carBodies[7],
          brands[2],
          callback
        );
      },
      function (callback) {
        carCreate(
          "Kia",
          "Sportage",
          "2023",
          "Redesigned version of the famour SUV",
          30800,
          manufacturers[8],
          carBodies[10],
          brands[4],
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
