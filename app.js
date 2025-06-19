require('dotenv').config();

const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');

const router = require('./src/routes/router.js');
const app = express();

function initializeStaticFiles(){
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/uploads', express.static('public/uploads'));
}

function initializeHandlebars(){
    app.engine("hbs", exphbs.engine({
        extname: "hbs",
        defaultLayout: false,
        // helpers: {} 
    }));
    app.set("view engine", "hbs");
    app.set("views", "./src/views");
}

async function finalClose(){
    await disconnect().then(console.log('Server closed!'));
    process.exit();
}

async function main(){

    initializeStaticFiles();
    initializeHandlebars();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); 
    app.use(router);  

    app.listen(process.env.SERVER_PORT, async () => {
        console.log(`Express server is now listening on port ${process.env.SERVER_PORT}`);
        try {
            
            await connect();
            console.log(`Now connected to MongoDB`);
            
        } catch (err) {
            console.log('Connection to MongoDB Server failed:');
            console.error(err);
        }
    });

    process.on('SIGTERM',finalClose);  
    process.on('SIGINT', finalClose); 
    process.on('SIGQUIT', finalClose);
}

main();