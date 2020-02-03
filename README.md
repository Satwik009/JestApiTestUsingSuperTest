# JestApiTestUsingSuperTest
JestBasicApiFrameWork using SuperTest



Before Initiating please delete node modules and do a fresh install 
by command npm install. 

If you get any permission issues do sudo npm install 

To run a Test File from Jest, within the VScode itself open terminal 
and run command  "npm run test filename.js" 
you can also run the same through terminal by navigating on the same folder.

Steps to run:
=============
1. Setup local application:
git clone https://github.com/bestbuy/api-playground/
cd api-playground
npm install
npm start

2. On different command prompt, in this project folder, run below command to do setup and execution

--Setup-----------
# Install puppeteer
npm i puppeteer
# Install current project
npm install

3. Jest Running commands :
jest
Run only the tests that were specified with a pattern or filename:

jest my-test #or
jest path/to/my-test.js
Run tests related to changed files based on hg/git (uncommitted files):

jest -o
Run tests related to path/to/fileA.js and path/to/fileB.js:

jest --findRelatedTests path/to/fileA.js path/to/fileB.js
Run tests that match this spec name (match against the name in describe or test, basically).

jest -t name-of-spec
Run watch mode:

jest --watch #runs jest -o by default
jest --watchAll #runs all tests

# Install allure on windows manually from below
https://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline
Download latest version of allure (we used 2.13.1)
Unpack the archive to allure-commandline directory.
Navigate to bin directory.
Use allure.bat for Windows or allure for other Unix platforms.
Add allure to system PATH.


Now to serve report, run below command
allure serve

To generate report for offline, run below command
allure generate

--Setup------------

Execution--------



Execution--------


********* For Contributors *********
  If you are working on this project please create your separate branch and then proceed.
