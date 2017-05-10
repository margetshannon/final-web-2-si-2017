var quotes = [
  {Quote: "Advertising is based on one thing, happiness. And you know what happiness is? Happiness is the smell of a new car. It’s freedom from fear. It’s a billboard on the side of the road that screams reassurance that whatever you are doing is okay. You are okay.", author: "Don Draper"},
  {Quote: "Knowing is not enough, we must apply. Willing is not enough, we must do.", author: "Johann Wolfgang von Goethe"},
  {Quote: "You cannot push any one up a ladder unless he be willing to climb a little himself.", author: "Andrew Carnegie"},
  {Quote: "Men are moved by two levers only: fear and self interest.", author: "Napoleon Bonaparte"},
  {Quote: "Do what you can, with what you have, with where you are.", author: "Theodore Roosevelt"}
]
 
var generate = function() { 
  var i = Math.floor((Math.random() * 5) + 1);  
  document.getElementById("saying").textContent=quotes[i].Quote;
  document.getElementById("author").textContent=quotes[i].author;
};

function page() {
  var a = document.getElementById("saying").innerText;
  var b = document.getElementById("author").innerText;
  var a1 = a.split(" ").join("%20");
  var b1 = b.split(" ").join("%20");
  console.log(a1)
  window.open("https://twitter.com/intent/tweet?text=" + a1 +"%20%5B" + b1 + "%5D");
   };

document.getElementById("generator").onclick=generate;