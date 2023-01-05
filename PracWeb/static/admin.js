function showAdd(){
    document.getElementById("update").setAttribute("style","display: none;");
    document.getElementById("add").setAttribute("style","display: block;");
    document.getElementById("delete").setAttribute("style","display: none;");
    document.getElementById("h3remove1").innerHTML="";
}

function showUpdate(){
    document.getElementById("update").setAttribute("style","display: block;");
    document.getElementById("add").setAttribute("style","display: none;");
    document.getElementById("delete").setAttribute("style","display: none;");
    document.getElementById("h3remove2").innerHTML="";
}

function showDelete(){
    document.getElementById("update").setAttribute("style","display: none;");
    document.getElementById("add").setAttribute("style","display: none;");
    document.getElementById("delete").setAttribute("style","display: block;");
    document.getElementById("h3remove3").innerHTML="";
}