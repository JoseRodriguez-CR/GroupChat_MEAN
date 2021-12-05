var socket = io();
var name = prompt("Please enter your name:","Name");
var elem = document.getElementById('chatbox');

socket.emit("new_user", {name:username});
$("#btn").click(function(){
    socket.emit("new_message", {name:username, message:$('#msg').val()});
        $('#msg').val("");
});
socket.on('existing_messages', function(data){
    for(i in data)
        $("#chatbox").append("<p>"+data[i].name+": "+data[i].message+"</p>");
    elem.scrollTop = elem.scrollHeight;
});
socket.on('update_messages', function(data){
    $("#chatbox").append("<p>"+data.name+": "+data.message+"</p>");
    elem.scrollTop = elem.scrollHeight;
});
socket.on('user_disconnect', function(data){
    $("#chatbox").append("<p style='color:red'>"+data.name+" has left the chat"+"</p>");
    elem.scrollTop = elem.scrollHeight;
});
socket.on('display_new_user', function(data){
    $("#chatbox").append("<p style='color:green'>"+data.name+" has joined the chat"+"</p>");  	
    elem.scrollTop = elem.scrollHeight;
});