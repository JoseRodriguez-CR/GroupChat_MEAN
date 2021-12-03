//Imports
const express = require("express");
const app = express();
const server = app.listen(1337);
const io = require("socket.io")(server);
console.log( "The users server is running in port 1337." );
let id = 0;
let messages = {};
let users = {};


//Config
app.use(express.static(__dirname + "/static"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//Sockets
io.on("connection", function(socket){
    console.log("Connected!");

	socket.on("new_user", function(data){
		users[socket.id] = {name:data.name};
		socket.emit('existing_messages', messages);
		io.emit("display_new_user", {name:data.name})
	});
	socket.on("new_message", function(data){
		messages[id] = {name:data.name, message:data.message};
		io.emit("update_messages", messages[id]);
		id++;
	})
	socket.on("disconnect", function(){
		io.emit("user_disconnect", users[socket.id])
	})
})

//Routes
app.get("/", function(req, res){
    res.render("index");
})