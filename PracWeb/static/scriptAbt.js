

function setWidth()
{
    const e1 = document.getElementById("sub");
    const e2 = document.getElementById("Insha");
    const e3 = document.getElementById("Ismail");
    const e4 = document.getElementById("Yusra");

    var a = parseInt(e1.offsetWidth);
    var b = parseInt(e2.offsetWidth);
    var c = parseInt(e3.offsetWidth);
    var d = parseInt(e4.offsetWidth);

    var total=a+b+c+d+16;
    total=total+"px";
    alert(total);

    document.getElementById("set").style.width = total;
    document.getElementById("wasooli").style.width = total;
    document.getElementById("Hotels").style.width = total;
    document.getElementById("Flights").style.width = total;
    document.getElementById("Tours").style.width = total;
    document.getElementById("Transport").style.width = total;
    document.getElementById("phone").style.width = total;
}


function meso() {
    document.getElementById("dada").style.opacity=1;
    document.getElementById("m1").style.visibility="hidden";
    document.getElementById("m2").style.visibility="hidden";
  }
  
  function insha() {
    document.getElementById("dada").style.opacity=0.5;
    document.getElementById("m1").style.visibility="visible";
    document.getElementById("m2").style.visibility="visible";
  }
  
  
  
  function turtle() {
    document.getElementById("turt").style.opacity=1;
    document.getElementById("m3").style.visibility="hidden";
    document.getElementById("m4").style.visibility="hidden";
  }
  
  function ismail() {
    document.getElementById("turt").style.opacity=0.5;
    document.getElementById("m3").style.visibility="visible";
    document.getElementById("m4").style.visibility="visible";
  }
  
  
  function adam() {
    document.getElementById("ada").style.opacity=1;
    document.getElementById("m5").style.visibility="hidden";
    document.getElementById("m6").style.visibility="hidden";
    
  }
  
  function yus() {
    document.getElementById("ada").style.opacity=0.5;
    document.getElementById("m5").style.visibility="visible";
    document.getElementById("m6").style.visibility="visible";
  }



  function hotels() {
    document.getElementById("c1").style.opacity=1;
    document.getElementById("p1").style.visibility="hidden";
  }
  
  function hot() {
    document.getElementById("c1").style.opacity=0.5;
    document.getElementById("p1").style.visibility="visible";
  }
  

  function flights() {
    document.getElementById("c2").style.opacity=1;
    document.getElementById("p2").style.visibility="hidden";
  }
  
  function fli() {
    document.getElementById("c2").style.opacity=0.5;
    document.getElementById("p2").style.visibility="visible";
  }
  

  function tours() {
    document.getElementById("c3").style.opacity=1;
    document.getElementById("p3").style.visibility="hidden";
  }
  
  function tou() {
    document.getElementById("c3").style.opacity=0.5;
    document.getElementById("p3").style.visibility="visible";
  }
  

  function transport() {
    document.getElementById("c4").style.opacity=1;
    document.getElementById("p4").style.visibility="hidden";
  }
  
  function trans() {
    document.getElementById("c4").style.opacity=0.5;
    document.getElementById("p4").style.visibility="visible";
  }