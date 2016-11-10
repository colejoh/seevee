# Seevee
This repository contains the code for both the front-end and the back-end apps. The front-end is build with AngularJS and the back end is build on NodeJS.


## Installation
Before you can get the app up and running for some development, you're going to need to install a few things.

### Requirements
  1. npm - Node Package Manager. Lets the app run.
  2. Node.js - Needed to run the server
  3. nodemon (`sudo npm install -g nodemon`) - A package to restart the server every time a save is made.
  4. MongoDB - The database that the app pulls data from. Get this setup running on http://localhost:27017/

#### Install
  1. Run `npm install`. This will install all required dependencies

## Running
  1. `mongod` - Starts the MongoDB server
  2. `npm start` - Runs the nodemon command
  
## Git Workflow
Please follow these guidelines for submitting a new feature or fixing a bug
  1. Pull master - `git pull`
  2. Create a new branch - `git checkout -b username/feature-or-bug-fix-name`
  3. Do your code. Add and commit locally
  4. Checkout master - `git checkout master`
  5. Pull master - `git pull`
  6. Switch to your branch - `git checkout username/feature-or-bug-fix-name`
  7. Rebase against master - `git rebase master`
  8. Push your changes - `git push origin username/feature-or-bug-fix-name`
  9. Open a pull request.
