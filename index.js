import Unsplash, { toJson } from "unsplash-js";
import "isomorphic-fetch";

var inquirer    = require('inquirer'),
    fs          = require('fs'),
    dotenv      = require('dotenv'),
    csvWriter   = require('csv-write-stream');

// Array where we'll store the API response data
// to be written to output.csv
let resultsArray = [];

// fetch Unsplash API credentials from environment file
dotenv.load();

// Prompt question array for getting the photo tag to search the API
var searchQuestions = [
  {
    type: 'input',
    name: 'tagOne',
    message: "What photo tag would you like to search?",
    default: '*'
  },
  {
    type: 'input',
    name: 'tagTwo',
    message: "What photo tag would you like to compare against your previous tag?",
    default: '*'
  }
];

// Initialize a new Unsplash instance
const unsplash = new Unsplash({
  applicationId: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  callbackUrl: process.env.CALLBACK_URL
});

// hi hi hi greet the user
console.log('Hi, welcome to the Unsplash CLI.');
console.log("Let's compare 2 tags");

// prompt user for photo tag
inquirer.prompt(searchQuestions)
  .then(function(searchTermObject) {
    Object.values(searchTermObject).forEach(function(tagName) {
      console.log(`Retrieving ${tagName} images...`)
      searchUnsplashApi(tagName);
    });
  })

// do the actual API call to fetch the photo data
function searchUnsplashApi(tagToSearch) {
  unsplash.search.photos(tagToSearch, 1, 15)
    .then(toJson)
    .then(function(json) {
      storeResultsInArray(tagToSearch, json)
    })
    .then(function(something) {
      writeToCsv();
    })
}

function storeResultsInArray(tagToSearch, json) {
  var imageResults = json['results'];

  imageResults.forEach(function(image) {
    resultsArray.push({ tag: tagToSearch, likes: image.likes, categories: image.categories.length })
  });
}

function writeToCsv() {
  var writer = csvWriter();
  writer.pipe(fs.createWriteStream('output.csv'), { flags: 'a+' })

  resultsArray.forEach(function(result) {
    writer.write({ tag: result.tag, likes: result.likes, categories: result.categories })
  })

  writer.end();
}