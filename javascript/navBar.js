/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
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
