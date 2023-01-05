function myFunc()
{
    var elem=document.getElementById('serv')
    
    elem.style.display="block"
}

function myFunc1()
{
    var elem=document.getElementById('serv')
    
    elem.style.display="none"
}

function myFunc2()
{
    var elem=document.getElementById('serv2')
    
    elem.style.display="none"
}

function myFuncer()
{
    var checkBox=document.querySelector('#checking3');
    var elem=document.getElementById('otp');
    var elem1=document.getElementById('phone1');

    var checkBox1=document.querySelector('#checking4');
    var elem2=document.getElementById('otp1');
    var elem3=document.getElementById('phone2');
    var elem4=document.getElementById('otp2');
    var elem5=document.getElementById('phone3');
    if (checkBox.checked == true){
        elem.style.display = "block";
        elem1.style.display = "block";
        elem2.style.display = "none";
        elem3.style.display = "none";
        elem4.style.display = "none";
        elem5.style.display = "none";
    } 
    else if(checkBox1.checked == true) {
        elem.style.display = "none";
        elem1.style.display = "none";
        elem2.style.display = "block";
        elem3.style.display = "block";
        elem4.style.display = "block";
        elem5.style.display = "block";
    }
    else{
        elem.style.display = "none";
        elem1.style.display = "none";
        elem2.style.display = "none";
        elem3.style.display = "none";
        elem4.style.display = "none";
        elem5.style.display = "none";
    }
}