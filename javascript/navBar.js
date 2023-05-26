/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}


async function callEndpoint() {
  
  const url = 'http://localhost:3000/api/asd/endpoint';
const method = 'POST';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer your_token'
};
const body = {
  key1: 'value1',
  key2: 'value2'
};
  
  
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Request successful!');
      console.log('Response:', data);
    } else {
      console.log('Request failed!');
      console.log('Error:', data);
    }
  } catch (error) {
    console.log('An error occurred:', error);
  }
}


// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
  if (!e.target.matches('.customdropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        // myDropdown.classList.remove('show');
      }
  }
}


var $body = document.getElementsByTagName('body')[0];
     var $btnCopy = document.getElementById('btnCopy');
     var secretInfo = document.getElementById('secretInfo').innerHTML;
     var copyToClipboard = function(secretInfo) {
       var $tempInput = document.createElement('INPUT');
       $body.appendChild($tempInput);
       $tempInput.setAttribute('value', secretInfo)
       $tempInput.select();
       document.execCommand('copy');
       $body.removeChild($tempInput);
     }

     $btnCopy.addEventListener('click', function(ev) {
       copyToClipboard(secretInfo);
     });


//Changs the color of a button. Used in the contact dropdown to show that the text was coppied
//to the clipboard
function buttonFunction(btn) {
 btn.style.backgroundColor = "#a1a4a8";
}
