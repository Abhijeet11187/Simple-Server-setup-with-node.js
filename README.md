# Creating of server

## Starts with npm init
<b>npm init </b> creates package.json file <br/>
For creating and spinning up the server we have to create the <b>server.js</b> file
<br/>
In the server.js file we are creating server by using <b>http.createServer(app)</b> where app is the app.js file which handles actual requests depending upon URL
<br/>For the seperate URL we have to make seperate js files to handle the get,post,delete,put request<br/>
Supppose for the products related operations we have to use the product.js file which actually handles all the requests<br/>
All these Routes selection carries at the app.js file


## Adding Nodemon
<br/>Nodemon is an development dependency so for installing it<br/> <b>npm install --save-dev nodemon</b>
<br/>For executing the nodemon we have to write a script because we cannot install nodeom globally.<br/>
For writing the script in <b>package.json</b> file under script add script for start<br/>
"start":"nodemon server.js"


## Adding Morgan
<br/>Morgan is a logger package for the node.js. Morgan logs the incomming requests to the console.
<br/>After installing Morgan in the app.js before handling the routes use<br/>
<b>app.use(morgan('dev'));<b>


## Handlind URL not found error
<br/>In the app.js file after handling the routes suppose user enters url which is not valid we also have to manage it.<br/>
So for that after handling all routes in app.js file 

 <br/> <br/>
app.use((req, res, next) => { <br/>
    const error = new Error('URL not found'); <br/>
    error.status = 404; <br/>
    next(error); <br/>
}) <br/> <br/>
app.use((error,req, res, next) => { <br/>
           res.status(error.status || 500); <br/>
            res.json({ <br/>
           error: { <br/>
                 message: error.message <br/>
        } <br/>
    }) <br/>
}); <br/> <br/> <br/>
