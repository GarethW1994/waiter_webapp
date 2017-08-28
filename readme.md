See <a href="https://github.com/GarethW1994/waiter_webapp/tree/about">About</a>

## Getting Started:
1. You can view this application <a href="http://waiter-webapp.herokuapp.com/">here</a> or copy this link and paste it in your browser `http://waiter-webapp.herokuapp.com/`.

2. On the welcome screen You can find some more information on what the app is all about as well as link to sign up and login screens.

##### Setting up for Waiters Account

1. As a waiter if you not have an account created yet then you'll have to sign up by clicking on the sign up link in the navigation bar:

![signup-screenshot](https://user-images.githubusercontent.com/22448019/29669142-ca62038a-88e2-11e7-8a68-74ff55dbf0a5.png)

2. On the sign up screen fill out the form as indicated. Remember your `Username` and `Password` as it will be needed for when you have to login. The Username and Password is can be anything.

3. After successful sign up, you will be redirected to the login screen where you have to login. On this screen is where you enter your `Username` and `Password` created on the sign up screen.

4. When you've successfully logged in you can now select the days that you are available to work and click on the update button. The days that you've just selected should be displayed back to you. Well Done !

![selectdays-screenshot](https://user-images.githubusercontent.com/22448019/29670208-4e2b400c-88e6-11e7-8026-aa7d4bb8668f.png)


#### Setting up for Admin Account
1. An Admin Account has already been created so on login screen enter `Admin` as Username and `$admin` as the password to log in to view the admin dashboard.
   Alternatively you can create your own admin account but the username has to be `Admin` but the password can be anything that you like.

2. You can now log in with your login credentials.

3. In the admin dashboard you can see the waiter data and on what days they're available to work.

4. You can reset this data by clicking on the `reset` link in the menu bar on the top of the page.

##  For Developers - Fork and Clone Repository

1. First get this repository on your local machine by forking it, to fork this repository click on the fork button in the upper right corner.

2. Then clone the forked repository from your github account to your local machine.

3. Click on the clone or download button on the forked repository and copy the SSH or HTTPS link to your clipboard.

4. In your terminal navigate to your projects folder and clone the repository using: `git clone link`

## Setting Up Development Environment
##### You will require the following:
- NodeJS
- ExpressJS
- Express Session
- Mongoose
- Express Handlebars
- Body Parser
- Express Flash Messages
- Cookie Parser
- MongoDB
- Mocha
- Nodemon

---

##### NodeJS
1. To check if you have NodeJS installed on your local machine run this command in the terminal - `node -v`

2. If this command fails, install Nodejs on your machine - <a href="">NodeJS Installation</a>

---

##### NPM Install
1. To install the modules used in this app run the following command in the terminal:
  ```
  npm install
  ```
2. This will install the node_modules such required and specified in the `package.json` file within the cloned repository.

---

##### MongoDB
1. Install <a href="https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04"> MongoDB</a> (Note that this is for ubuntu-16-04    distributions)
- After mongodb is set up and running the app will save all data in a database called `reg_numbers`.

---

##### Mocha
1. Install Mocha by running the following command in the terminal:
  ```
  npm install -g mocha
  ```
2. Alternatively if you want to install mocha locally that it can only be accessed within a certain path, run this command:
  ```
  npm install --save-dev mocha
  ```

3.  Now in your cloned repository you can run the `mocha` command to be able to run the tests.

See: <a href="https://mochajs.org/">Mocha</a>

---

##### Nodemon

1. Nodemon will watch files in your directory and if any changes happens nodemon will restart the node application without you having to do it manually.

2. To install Nodemon on your machine, run the following command in your terminal. Note that this is a global installation so nodemon can be accessed anywhere
in your paths.
```
npm install nodemon -g
```
- Alternatively if you want to install nodemon locally in a directory or path only, you can run the following command:
```
npm install --save-dev nodemon
```

---
##### Running Application
1. To run the app in the cloned repository run the following command: `nodemon index.js`

2. The express server will start running and in the terminal you can find on which port the application should be running, in this case, should be at port `5000`
