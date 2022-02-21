# WebCoreGameServer
 The backend API for Browser games with a simple login system.



## Installation

This application is based on the MX Webcore and requires a mongoDB Database as backend. Supported platforms are Linux and Windows.


### Linux

1. **[Install MongoDB](https://docs.mongodb.com/manual/administration/install-on-linux/)** on your system and start it as a service.

2. **Install Node & NPM** on your system:

   Start by adding add the NodeSource repository to your system by running the following [`curl`](https://linuxize.com/post/curl-command-examples/) command:

   ```
   curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
   ```

   (Make sure to install at least node 14.x on your system)

   Once the repository is added to install Node.js and npm type:
   
   ```
   sudo apt install nodejs
   ```

   Ensure that Node.js is properly installed by typing:
   
   ```
   node --version
   ```
   
   ```
   Output:
   v14.15.1
   ```

3. **Install the node_modules**

   Navigate in the `/WebCoreGameServer/` folder and run `npm install` or run `install-modules` from vsCode.

   


### Windows

1. **[Install MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)** on your system and make sure to install mongoDB as a Network Service.

2. **[Install Node & NPM](https://nodejs.org/en/download/)** on your system by using the installer.

3. **Install the node_modules**

   Navigate in the `\WebCoreGameServer\` folder and run `npm install` or run `install-modules` from vsCode.




## Routing and Authentication 

To add Routes use the Routers in the `/src/routes/` folder. The core autochecks the Connections and authentication.

Users can create a Account by using the `POST /register {email: "xxx", username: "xxx", password: "xxx"}`  route. With `POST /login {email: "xxx", password: "xxx"}` you can login and use the authenticated routes. To give users Admin rights you have to edit the isAdmin property of the user in the database.

Logout with `DELETE /logout {}`.

SocketIO connections are also Protected and need a user account.
