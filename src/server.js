'use strict'

// Module Includes
//=============================================================================================
const express = require('express')
const session = require('express-session')
const methodOverride = require('method-override')
const passport = require('passport')
const { config } = require('dotenv')
const http = require('http')
const socket = require('socket.io')
const MongoStore = require('connect-mongo')

//routers
const routerPublic = require('./routes/routes-public')
const routerAuthenticated = require('./routes/routes-authenticated')
const routerAdmin = require('./routes/routes-admin')
const socketIoAuthenticated = require('./routes/socket-io-authenticated')

//xcore
const Advlog = require('./xcore/adv-log')
const initializePassport = require('./xcore/passport-config')
const auth = require('./xcore/authentication')
const Mongodb = require('./xcore/mongodb')
const UserManager = require('./xcore/user-manager')
const StatusCodes = require('./xcore/status-codes')
const socketAuth = require('./xcore/socket-auth')


/**
 * Webcore main function
 */
const main = (root) => {

    // Module Setups
    //=============================================================================================
    config({ path: "./config.env" });
    Advlog.overrideConsoleAll(process.env.LOG_PATH);


    // Connect to MongoDB
    //=============================================================================================
    Mongodb(process.env.DATABASE_URL, process.env.DATABASE_NAME)
    const sessionStore = MongoStore.create({ mongoUrl: (process.env.DATABASE_URL + process.env.DATABASE_NAME) })


    // Setup Passport
    //=============================================================================================
    initializePassport(passport, UserManager.getUserByEmail, UserManager.getUserById);
    

    // Configure Express
    //=============================================================================================
    const app = express();
    const server = http.createServer(app);

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(methodOverride('_method'))
    app.use(express.static(root + '/public'));

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    //disable ejs
    //app.set('view engine', 'ejs');
    //app.set('views', (__dirname + '/views'));

    auth.setup(app, passport, UserManager.registerUser);


    // Configure Socket.io with authentifikation
    //=============================================================================================

    const io = socket(server, {
        serveClient: true
    })
    socketAuth.setup(io, process.env.SESSION_SECRET, sessionStore)
    /**
     * sets a socketio variable to express to use socket in routes
     * Example: ```var io = req.app.get('socketio');
     * io.to(//socket.id//).emit("message", data);```
     */
    app.set('socketio', io);

    
    // SocketIO Routes
    //=============================================================================================
    socketIoAuthenticated.setup(io);

    
    // API Routes
    //=============================================================================================

    /**
     * prefixes the api routes with the REST-API version.
     * Example: `POST /v1/users`
     */
    const API_PREFIX = '*'

    app.post(API_PREFIX, routerPublic);
    app.get(API_PREFIX, routerPublic);
    app.delete(API_PREFIX, routerPublic);

    app.post(API_PREFIX, auth.checkAuthenticated, routerAuthenticated);
    app.get(API_PREFIX, auth.checkAuthenticated, routerAuthenticated);
    app.delete(API_PREFIX, auth.checkAuthenticated, routerAuthenticated);

    app.post(API_PREFIX, auth.checkAdmin, routerAdmin);
    app.get(API_PREFIX, auth.checkAdmin, routerAdmin);
    app.delete(API_PREFIX, auth.checkAdmin, routerAdmin);

    //custom 404 response :)
    app.get("*", StatusCodes.notFound);


    // Run Server
    //=============================================================================================
    if (process.env.AUTO_IP == true ?? false) {
        server.listen(process.env.PORT, function () {
            console.log(`Bind to http://localhost:${process.env.PORT}`);
        })
    } else {
        server.listen(process.env.PORT, process.env.IP, function () {
            console.log(`Bind to http://${process.env.IP}:${process.env.PORT}`);
        })
    }
}

module.exports.main = main;