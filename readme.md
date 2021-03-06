### Overview

A small CLI application for Unsplash, a platform that hosts free, CC0 images. This CLI allows you to compare the stats for "like counts" for 2 tags.

For instance, you might want to compare the like counts for the `city` and `faces` tags.

The results are saved in a CSV file called `output.csv` located at the root of this repository.

### Setup

1. Download repository and run either `yarn install` or `npm install`
2. Head over to https://unsplash.com/developers and click the `register as a developer` button to get yourself setup.
3. Accept the terms, fill in your details and when you're done click `new application` on your developer page.
4. Run `node setup.js` to create an `.env` file, and replace the fake values with your Unsplash API credentials.

### Running the app

Simply `cd` to wherever you've downloaded the repository and run `npm start -s` and follow the on-screen commands.

### Dependencies

The following depencies have been added to the package.json file for the following reasons:

1. babel-cli        - to get ES6 syntax
2. dotenv           - will be used for environment variables
3. es6-promise      - for JS promises
4. inquirer         - creates interactive command line user interface
5. unsplash-js      - official JS wrapper lib for Unsplash
6. isomorphic-fetch - required by unsplash-js
