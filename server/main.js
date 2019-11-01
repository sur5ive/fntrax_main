import { Meteor } from 'meteor/meteor';
import puppeteer from 'puppeteer';
import loginPage from './actions/login';
import populateGameWeekData from './actions/populate_gameweek';
import populateTeamsData from './actions/populate_teams';

const CONFIG = require('./config/config');

Meteor.startup(() => {

  run();
  
});

async function run() {

  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
        width: 1920,
        height: 1080
    },
    args: [`--window-size=1920,1080`] // set browser size
  });
  console.log("Browser created");

  let page = await browser.newPage();

  // Login to Fantrax
  try {
    // Populate current Gameweek data
    await populateGameWeekData(page);

    // Start login function with tries counter set to 1
    page = await loginPage(page, 1);

    // Populate League Teams' data
    await populateTeamsData(page);

    // Close the browser page
    browser.close();
    console.log("Browser closed");
    
  } catch (e) {
    console.log(e);
  }
}