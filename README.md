CS3213VisualIDE
===============

Development environment setup:
1. git
2. Node.js v0.10.x+ (npm comes bundled with Node.js)
3. Install Yeoman toolset:
    $ npm install -g yo
  If you see permission or access errors, you will need to prepend sudo to the above command, like so:
    $ sudo npm install -g yo
4. Install Bower:
    $ npm install -g bower
5. Install Grunt:
    $ npm install -g grunt-cli
6. Install mongodb
	$ brew install mongodb 
7. Install phantomjs
	$ brew install phantomjs
8. Install mocha-phantomjs
	$ npm install -g mocha-phantomjs

9. Install dependencies for this project (Using command line):
  1). Use cd command to direct to the project folder.
  2). $ bower install
  4). $ npm install
10. start mongodb by 
	$ sudo mongod
	you may see an error about /data/db not exist, then you have to create the dir by yourself 
	use a separate termial to keep the db running
11. serve the project by 
	$ grunt



Other instructions:
1. login with google 
  direct the webpage to "localhost:9000/auth/google" 
2. store program into db
  you need to define a model for the program in server/lib/programs.js
  an example is given in server/lib/users.js
  and you should search for more instructions online
