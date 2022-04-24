console.log('Hello! I am client.js inside client/js/...');
console.log('...This comment is on line 2 of client.js');

// Insert the 'Hey there!' text on the template page
document.getElementById('greeting').innerText = 'Hey there!';


// function hello(){
//     console.log("Hello Chetna");
// }
var hellotext = "Hello World";
function hello() {
  
    // Creating Our XMLHttpRequest object 
    var xhr = new XMLHttpRequest();

    // Making our connection  
    var url = 'http://localhost:5000/hello';
    xhr.open("GET", url, true);

    // function execute after request is successful 
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let textArea = document.getElementById("hellotext");
            console.log(this.responseText);
            // textArea.value = this.responseText;
            hellotext = this.responseText;
        }
    }
    // Sending our request 
    xhr.send();
}