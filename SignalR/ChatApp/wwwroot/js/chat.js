
var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

document.getElementById("sendButton").disabled = true;

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
    console.log(connection)
    console.log(connection.connectionId)

}).catch(function (err) {
    return console.error(err.toString());
});


document.getElementById("sendButton").addEventListener("click", function (e) {

    var name = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", name, message);
})


connection.on("ReceiveMessage", function (name, message) {

    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${name} says ${message}`;
})

