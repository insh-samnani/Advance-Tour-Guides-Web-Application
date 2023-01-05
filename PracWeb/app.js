const express=require("express");
var nodemailer = require('nodemailer');
const path=require("path");
const app=express();
var crypto = require("crypto");
var md5 = require('md5');
const port=800;
var mysql = require('mysql');
const e = require("express");

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: 'tour'
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
});

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

var flag=0;

app.get('/',(req,res)=>{
    console.log(flag);
    const params={ }
    if(flag==0){
        message1=" ";
    }
    else if(flag==1){
        message1="OK";
    }
    res.status(200).render('home.pug',{message: message1});
});

app.get('/homeadmin',(req,res)=>{
    console.log(flag);
    const params={ }
    if(flag==0){
        message1=" ";
    }
    else if(flag==1){
        message1="OK";
    }
    res.status(200).render('Admin/adminhome.pug',{message: message1});
});

app.get('/hometourguide',(req,res)=>{
    console.log(flag);
    const params={ }
    if(flag==0){
        message1=" ";
    }
    else if(flag==1){
        message1="OK";
    }
    res.status(200).render('TourGuide/hometourguide.pug',{message: message1});
});

app.get('/logout',(req,res)=>{
    flag=0;
    const params={ }
    if(flag==0){
        message1=" ";
    }
    else if(flag==1){
        message1="OK";
    }
    res.status(200).render('home.pug',{message: message1});
});

app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params);
});

app.get('/contacttourguide',(req,res)=>{
    const params={ }
    res.status(200).render('TourGuide/contacttourguide.pug',params);
});

app.get('/loginn',(req,res)=>{
    const params={ }
    res.status(200).render('login.pug',params);
});

app.get('/forgetpass',(req,res)=>{
    const params={ }
    res.status(200).render('forgetpass.pug',params);
});

var emaill;

app.post('/loginafterforget',(req, res, next)=>{
    var email=req.body.email;
    var password=req.body.password;
    var password1=req.body.password1;
    var checkings=req.body.checking1;
     
    // function encrypt(text){
    //     var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq')
    //     var crypted = cipher.update(text,'utf8','hex')
    //     crypted += cipher.final('hex');
    //     return crypted;
    //   }

    if(checkings=="adminn"){
        var sql= `SELECT * FROM admin WHERE Email = '${email}'`;
        con.query(sql, function (err, result){
            if(result.length<=0){
                res.status(200).render('forgetpass.pug',{message1: '* Invalid Email'});
            }
            else if(password != password1){
                res.status(200).render('forgetpass.pug',{message1: '* Passwords Donot Match'});
            }
            else{
                var sql= `SELECT * from booknow`;
                    con.query(sql, function (err, result, fields){
                        if(result.length<=0){
                            
                        }
                        else{
                            for(var i=0;i<result.length;i++){
                                var datee = result[i].DepartureDate;
                                var todaydate;
                                var today = new Date();
                                var dateee = new Date(result[i].DepartureDate);
                                var Difference_In_Time = today.getTime() - dateee.getTime();
                                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                                console.log(Difference_In_Days);
                                var idd = result[i].UserID;
                                if(Difference_In_Days>=15){
                                    var transid=result[i].TransportID;
                                    if(transid != 0){
                                        var sql= `DELETE from transportbooked where TransportID = '${transid}' AND UserID = '${idd}'`;
                                        con.query(sql, function (err, result, fields){
                                            console.log("Transportbooked data has been deleted");
                                        });
                                    }
                                    var hotelid=result[i].HotelID;
                                    if(hotelid != 0){
                                        var sql= `DELETE from hotelsbooked where HotelID = '${hotelid}' AND UserID = '${idd}'`;
                                        con.query(sql, function (err, result, fields){
                                            console.log("Hotelsbooked data has been deleted");
                                        });
                                    }
                                    var today = new Date(result[i].DepartureDate);
                                    var todaydate;
                                    if(today.getMonth()+1 <=9 && today.getDate()<=9){
                                        todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
                                    }
                                    else if(today.getMonth()+1 <=9){
                                        todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
                                    }
                                    else if(today.getDate() <=9){
                                        todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
                                    }
                                    else{
                                        todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
                                    }
                                    var sql= `Insert into booknow_history values('${result[i].TourID}','${result[i].Price}','${result[i].UserID}','${result[i].TransportID}','${result[i].HotelID}','${todaydate}')`;
                                    con.query(sql, function (err, result, fields){
                                        console.log("Booknow_History data has been inserted");
                                    });
                                }
                            }
                        }
                    });
                    var sql= `SELECT * from booknow`;
                    con.query(sql, function (err, result, fields){
                        if(result.length<=0){
                            
                        }
                        else{
                            for(var i=0;i<result.length;i++){
                                var datee = result[i].DepartureDate;
                                var todaydate;
                                var today = new Date();
                                var dateee = new Date(result[i].DepartureDate);
                                var Difference_In_Time = today.getTime() - dateee.getTime();
                                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                                console.log(Difference_In_Days);
                                var idd = result[i].UserID;
                                if(Difference_In_Days>=15){
                                    var sqlwa= `Delete from toursbooked where UserID =  '${result[i].UserID}' and TourID = '${result[i].TourID}'`;
                                    con.query(sqlwa, function (err, result, fields){
                                        console.log("ToursBooked data has been deleted");
                                    });
                                    var statuswa = "Free";
                                    var sqlwa= `update tourguides set Status = '${statuswa}' where ID in (Select TourguideID from takestour where '${result[i].UserID}' and TourID = '${result[i].TourID}')`;
                                    con.query(sqlwa, function (err, result, fields){
                                        console.log("TourGuides data has been updated");
                                    });
                                    var sqlwa= `delete from takestour where '${result[i].UserID}' and TourID = '${result[i].TourID}'`;
                                    con.query(sqlwa, function (err, result, fields){
                                        console.log("TakesTour data has been deleted");
                                    });
                                }
                            }
                        }
                    });
                    var sql= `SELECT * from flights`;
                    con.query(sql, function (err, result, fields){
                        for(var i=0; i<result.length;i++){
                            var datee = new Date(result[i].Date);
                            var todaydate;
                            var dateetoday;
                            var today = new Date();
                            if(today.getMonth()+1 <=9 && today.getDate()<=9){
                                todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
                            }
                            else if(today.getMonth()+1 <=9){
                                todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
                            }
                            else if(today.getDate() <=9){
                                todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
                            }
                            else{
                                todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
                            }
                            if(datee.getMonth()+1 <=9 && datee.getDate()<=9){
                                dateetoday = datee.getFullYear()+'-0'+(datee.getMonth()+1)+'-0'+datee.getDate();
                            }
                            else if(datee.getMonth()+1 <=9){
                                dateetoday = datee.getFullYear()+'-0'+(datee.getMonth()+1)+'-'+datee.getDate();
                            }
                            else if(datee.getDate() <=9){
                                dateetoday = datee.getFullYear()+'-'+(datee.getMonth()+1)+'-0'+datee.getDate();
                            }
                            else{
                                dateetoday = datee.getFullYear()+'-'+(datee.getMonth()+1)+'-'+datee.getDate(); 
                            }
                            // if(today.getMonth()+1 <=9){
                            //     dateetoday = datee.getFullYear()+'-0'+(datee.getMonth()+1)+'-'+datee.getDate();
                            // }
                            // else{
                            //     dateetoday = datee.getFullYear()+'-'+(datee.getMonth()+1)+'-'+datee.getDate();
                            // }
                            if(dateetoday < todaydate){
                                var sqlafter= `DELETE from flights where ID = '${result[i].ID}'`;
                                con.query(sqlafter, function (err, resultafter, fields){
                                    console.log("The flights data has been deleted.")
                                });
                            }
                        }
                    });
                var hw = md5(password);
                emaill = email;
                var sql= `Update Admin set Password = '${hw}' WHERE Email = '${email}'`;
                    con.query(sql, function (err, result){
                        if (err) throw err;
                        console.log("Password reseted for admin");
                    });
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                        user: 'advancetourguides@gmail.com',
                        pass: 'crbvfzyiabzawftb'
                        }
                    });
                    var mailOptions = {
                        from: 'advancetourguides@gmail.com',
                        to: `${email}`,
                        subject: 'PASSWORD RESETED',
                        text: `Your EMAIL is: '${email}' AND Your PASSWORD is: '${password}'. AB MAT BHULNA BHAIIIII!. It is '${password}'. THANK YOU.`
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        }
                    });
                    res.status(200).render('login.pug',{message2: '* SUCCESSFULLY RESETED'});
            }
        });
    }
    else if(checkings=="tourguidee"){
        var sql= `SELECT * FROM tourguides WHERE Email = '${email}'`;
        con.query(sql, function (err, result){
            if(result.length<=0){
                res.status(200).render('forgetpass.pug',{message1: '* Invalid Email'});
            }
            else if(password != password1){
                res.status(200).render('forgetpass.pug',{message1: '* Passwords Donot Match'});
            }
            else{
                var hw = md5(password);
                emaill = email;
                var sql= `Update tourguides set Password = '${hw}' WHERE Email = '${email}'`;
                    con.query(sql, function (err, result){
                        if (err) throw err;
                        console.log("Password reseted for tourguide");
                });
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                    user: 'advancetourguides@gmail.com',
                    pass: 'crbvfzyiabzawftb'
                    }
                });
                var mailOptions = {
                    from: 'advancetourguides@gmail.com',
                    to: `${email}`,
                    subject: 'PASSWORD RESETED',
                    text: `Your EMAIL is: '${email}' AND Your PASSWORD is: '${password}'. AB MAT BHULNA BHAIIIII!. It is '${password}'. THANK YOU.`
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                });
                res.status(200).render('login.pug',{message2: '* SUCCESSFULLY RESETED'});
            }
        });
    }
    else if(checkings=="userr"){
        var sql= `SELECT * FROM users WHERE Email = '${email}'`;
        con.query(sql, function (err, result){
            if(result.length<=0){
                res.status(200).render('forgetpass.pug',{message1: '* Invalid Email'});
            }
            else if(password != password1){
                res.status(200).render('forgetpass.pug',{message1: '* Passwords Donot Match'});
            }
            else{
                var hw = md5(password);
                emaill = email;
                var sql= `Update users set Password = '${hw}' WHERE Email = '${email}'`;
                    con.query(sql, function (err, result){
                        if (err) throw err;
                        console.log("Password reseted for user");
                });
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                    user: 'advancetourguides@gmail.com',
                    pass: 'crbvfzyiabzawftb'
                    }
                });
                var mailOptions = {
                    from: 'advancetourguides@gmail.com',
                    to: `${email}`,
                    subject: 'PASSWORD RESETED',
                    text: `Your EMAIL is: '${email}' AND Your PASSWORD is: '${password}'. AB MAT BHULNA BHAIIIII!. It is '${password}'. THANK YOU.`
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                });
                res.status(200).render('login.pug',{message2: '* SUCCESSFULLY RESETED'});
            }
        });
    }
    else{
        res.status(200).render('login.pug',{message2: '* Select Either Option'});
    }
});

app.post('/signup',(req, res, next)=>{
    // function encrypt(text){
    //     var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq')
    //     var crypted = cipher.update(text,'utf8','hex')
    //     crypted += cipher.final('hex');
    //     return crypted;
    //   }
      
    var name=req.body.name;
    var email=req.body.email;
    var password=req.body.password;
    var phone=req.body.phone;
    var checkings=req.body.checking1;
    var hw = password;
    if(checkings=="adminn"){
        var otp=req.body.otp;
        console.log(otp);
        var checki="zong4Gbolt+babatutu123";
        if(otp == checki){
            var sql= `SELECT * FROM admin WHERE Email = '${email}'`;
            con.query(sql, function (err, result){
                if(result.length>0){
                    res.status(200).render('contact.pug',{message: '* Email Already Exists'});
                }
                else{
                    var sql= `SELECT * from booknow`;
                    con.query(sql, function (err, result, fields){
                        if(result.length<=0){
                            
                        }
                        else{
                            for(var i=0;i<result.length;i++){
                                var datee = result[i].DepartureDate;
                                var todaydate;
                                var today = new Date();
                                var dateee = new Date(result[i].DepartureDate);
                                var Difference_In_Time = today.getTime() - dateee.getTime();
                                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                                console.log(Difference_In_Days);
                                var idd = result[i].UserID;
                                if(Difference_In_Days>=15){
                                    var transid=result[i].TransportID;
                                    if(transid != 0){
                                        var sql= `DELETE from transportbooked where TransportID = '${transid}' AND UserID = '${idd}'`;
                                        con.query(sql, function (err, result, fields){
                                            console.log("Transportbooked data has been deleted");
                                        });
                                    }
                                    var hotelid=result[i].HotelID;
                                    if(hotelid != 0){
                                        var sql= `DELETE from hotelsbooked where HotelID = '${hotelid}' AND UserID = '${idd}'`;
                                        con.query(sql, function (err, result, fields){
                                            console.log("Hotelsbooked data has been deleted");
                                        });
                                    }
                                    var today = new Date(result[i].DepartureDate);
                                    var todaydate;
                                    if(today.getMonth()+1 <=9 && today.getDate()<=9){
                                        todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
                                    }
                                    else if(today.getMonth()+1 <=9){
                                        todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
                                    }
                                    else if(today.getDate() <=9){
                                        todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
                                    }
                                    else{
                                        todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
                                    }
                                    var sql= `Insert into booknow_history values('${result[i].TourID}','${result[i].Price}','${result[i].UserID}','${result[i].TransportID}','${result[i].HotelID}','${todaydate}')`;
                                    con.query(sql, function (err, result, fields){
                                        console.log("Booknow_History data has been inserted");
                                    });
                                }
                            }
                        }
                    });
                    var sql= `SELECT * from booknow`;
                    con.query(sql, function (err, result, fields){
                        if(result.length<=0){
                            
                        }
                        else{
                            for(var i=0;i<result.length;i++){
                                var datee = result[i].DepartureDate;
                                var todaydate;
                                var today = new Date();
                                var dateee = new Date(result[i].DepartureDate);
                                var Difference_In_Time = today.getTime() - dateee.getTime();
                                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                                console.log(Difference_In_Days);
                                var idd = result[i].UserID;
                                if(Difference_In_Days>=15){
                                    var sqlwa= `Delete from toursbooked where UserID =  '${result[i].UserID}' and TourID = '${result[i].TourID}'`;
                                    con.query(sqlwa, function (err, result, fields){
                                        console.log("ToursBooked data has been deleted");
                                    });
                                    var statuswa = "Free";
                                    var sqlwa= `update tourguides set Status = '${statuswa}' where ID in (Select TourguideID from takestour where '${result[i].UserID}' and TourID = '${result[i].TourID}')`;
                                    con.query(sqlwa, function (err, result, fields){
                                        console.log("TourGuides data has been updated");
                                    });
                                    var sqlwa= `delete from takestour where '${result[i].UserID}' and TourID = '${result[i].TourID}'`;
                                    con.query(sqlwa, function (err, result, fields){
                                        console.log("TakesTour data has been deleted");
                                    });
                                }
                            }
                        }
                    });
                    var sql= `SELECT * from flights`;
                    con.query(sql, function (err, result, fields){
                        for(var i=0; i<result.length;i++){
                            var datee = new Date(result[i].Date);
                            var todaydate;
                            var dateetoday;
                            var today = new Date();
                            if(today.getMonth()+1 <=9 && today.getDate()<=9){
                                todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
                            }
                            else if(today.getMonth()+1 <=9){
                                todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
                            }
                            else if(today.getDate() <=9){
                                todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
                            }
                            else{
                                todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
                            }
                            if(datee.getMonth()+1 <=9 && datee.getDate()<=9){
                                dateetoday = datee.getFullYear()+'-0'+(datee.getMonth()+1)+'-0'+datee.getDate();
                            }
                            else if(datee.getMonth()+1 <=9){
                                dateetoday = datee.getFullYear()+'-0'+(datee.getMonth()+1)+'-'+datee.getDate();
                            }
                            else if(datee.getDate() <=9){
                                dateetoday = datee.getFullYear()+'-'+(datee.getMonth()+1)+'-0'+datee.getDate();
                            }
                            else{
                                dateetoday = datee.getFullYear()+'-'+(datee.getMonth()+1)+'-'+datee.getDate(); 
                            }
                            if(dateetoday < todaydate){
                                var sqlafter= `DELETE from flights where ID = '${result[i].ID}'`;
                                con.query(sqlafter, function (err, resultafter, fields){
                                    console.log("The flights data has been deleted.")
                                });
                            }
                        }
                    });
                    emaill=email;
                    flag=1;
                    var sql = `INSERT INTO admin (Name, Email, Password, Cell) VALUES ('${name}', '${email}', '${hw}', '${phone}')`;
                    con.query(sql, function (err, result){
                    if (err) throw err;
                        console.log("Admins Data Has Been Saved");
                        res.redirect('/admin');
                    });
                }
            });
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'advancetourguides@gmail.com',
                pass: 'crbvfzyiabzawftb'
                }
            });
            var mailOptions = {
                from: 'advancetourguides@gmail.com',
                to: `${email}`,
                subject: 'WELCOME TO ATG',
                text: `Your EMAIL is: '${email}' AND Your PASSWORD is: '${password}'. Incase you forget the password, PLEASE REFER TO THIS EMAIL. Incase you are unable to find this email, you can avail FORGOT PASSWORD option. We HIGHLY recommend you to save this password somewhere. It is '${password}'. THANK YOU.`
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                console.log(error);
                } else {
                console.log('Email sent: ' + info.response);
                }
            });
        }
        else{
            res.status(200).render('contact.pug',{message: '* Invalid Admin OTP'});
        }
    }
    else if(checkings=="tourguidee"){
        var otp1=req.body.otp1;
        var loc=req.body.loc;
        console.log(loc);
        var nk="NK";
        var chitral = "Chitral";
        var checki="maihutourguidebabatutu123";
        if(otp1 == checki){
            var sql= `SELECT * FROM tourguides WHERE Email = '${email}'`;
            con.query(sql, function (err, result){
                if(result.length>0){
                    res.status(200).render('contact.pug',{message: '* Email Already Exists'});
                }
                else if((loc == "NK") || (loc == "Chitral") || (loc == "Hunza") || (loc == "Murree") || (loc == "Skardu") || (loc == "Swat")){
                    var status = "Free";
                    emaill=email;
                    flag=1;
                    var sql = `INSERT INTO tourguides (Name, Email, Password, Cell, Location, Status) VALUES ('${name}', '${email}', '${hw}', '${phone}', '${loc}', '${status}')`;
                    con.query(sql, function (err, result){
                    if (err) throw err;
                        console.log("Tourguides Data Has Been Saved");
                        res.status(200).render('TourGuide/tourguide1.pug');
                    });
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                        user: 'advancetourguides@gmail.com',
                        pass: 'crbvfzyiabzawftb'
                        }
                    });
                    var mailOptions = {
                        from: 'advancetourguides@gmail.com',
                        to: `${email}`,
                        subject: 'WELCOME TO ATG',
                        text: `Your EMAIL is: '${email}' AND Your PASSWORD is: '${password}'. Incase you forget the password, PLEASE REFER TO THIS EMAIL. Incase you are unable to find this email, you can avail FORGOT PASSWORD option. We HIGHLY recommend you to save this password somewhere. It is '${password}'. THANK YOU.`
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        }
                    });
                }
                else{
                    res.status(200).render('contact.pug',{message: '* Invalid Location Expertise'});
                }
            });
        }
        else{
            res.status(200).render('contact.pug',{message: '* Invalid Tourguide OTP'});
        }
    }
    else if(checkings=="userr"){
        var sql= `SELECT * FROM users WHERE Email = '${email}'`;
        con.query(sql, function (err, result){
            if(result.length>0){
                res.status(200).render('contact.pug',{message: '* Email Already Exists'});
            }
            else{
                emaill=email;
                flag=1;
                var sql = `INSERT INTO users (Name, Email, Password, Cell) VALUES ('${name}', '${email}', '${hw}', '${phone}')`;
                con.query(sql, function (err, result){
                if (err) throw err;
                    console.log("Users Data Has Been Saved");
                    flag=1;
                    res.redirect('/services');
                });
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                    user: 'advancetourguides@gmail.com',
                    pass: 'crbvfzyiabzawftb'
                    }
                });
                var mailOptions = {
                    from: 'advancetourguides@gmail.com',
                    to: `${email}`,
                    subject: 'WELCOME TO ATG',
                    text: `Your EMAIL is: '${email}' AND Your PASSWORD is: '${password}'. Incase you forget the password, PLEASE REFER TO THIS EMAIL. Incase you are unable to find this email, you can avail FORGOT PASSWORD option. We HIGHLY recommend you to save this password somewhere. It is '${password}'. THANK YOU.`
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                });
            }
        });
    }
    else{
        res.status(200).render('contact.pug',{message: '* Select Either Option'});
    }
});

app.post('/login',(req, res, next)=>{
    var email=req.body.email;
    var password=md5(req.body.password);
    console.log(password);
    var checkings=req.body.checking1;
     
    // function decrypt(text){
    //     var decipher = crypto.createDecipher('aes-256-cbc','d6F3Efeq')
    //     var dec = decipher.update(text,'hex','utf8')
    //     dec += decipher.final('utf8');
    //     return dec;
    //   }

    if(checkings=="adminn"){
        var sql= `SELECT * FROM admin WHERE Email = '${email}'`;
        con.query(sql, function (err, result){
            if(result.length<=0){
                res.status(200).render('login.pug',{message2: '* Invalid Email'});
            }
            else{
                var pass = result[0].Password;
                if(pass!=password){
                    res.status(200).render('login.pug',{message2: '* Invalid Password'});
                }
                else{
                    var sql= `SELECT * from booknow`;
                    con.query(sql, function (err, result, fields){
                        if(result.length<=0){
                            
                        }
                        else{
                            for(var i=0;i<result.length;i++){
                                var datee = result[i].DepartureDate;
                                var todaydate;
                                var today = new Date();
                                var dateee = new Date(result[i].DepartureDate);
                                var Difference_In_Time = today.getTime() - dateee.getTime();
                                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                                console.log(Difference_In_Days);
                                var idd = result[i].UserID;
                                if(Difference_In_Days>=15){
                                    var transid=result[i].TransportID;
                                    if(transid != 0){
                                        var sql= `DELETE from transportbooked where TransportID = '${transid}' AND UserID = '${idd}'`;
                                        con.query(sql, function (err, result, fields){
                                            console.log("Transportbooked data has been deleted");
                                        });
                                    }
                                    var hotelid=result[i].HotelID;
                                    if(hotelid != 0){
                                        var sql= `DELETE from hotelsbooked where HotelID = '${hotelid}' AND UserID = '${idd}'`;
                                        con.query(sql, function (err, result, fields){
                                            console.log("Hotelsbooked data has been deleted");
                                        });
                                    }
                                    var today = new Date(result[i].DepartureDate);
                                    var todaydate;
                                    if(today.getMonth()+1 <=9 && today.getDate()<=9){
                                        todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
                                    }
                                    else if(today.getMonth()+1 <=9){
                                        todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
                                    }
                                    else if(today.getDate() <=9){
                                        todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
                                    }
                                    else{
                                        todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
                                    }
                                    var sql= `Insert into booknow_history values('${result[i].TourID}','${result[i].Price}','${result[i].UserID}','${result[i].TransportID}','${result[i].HotelID}','${todaydate}')`;
                                    con.query(sql, function (err, result, fields){
                                        console.log("Booknow_History data has been inserted");
                                    });
                                }
                            }
                        }
                    });
                    var sql= `SELECT * from booknow`;
                    con.query(sql, function (err, result, fields){
                        if(result.length<=0){
                            
                        }
                        else{
                            for(var i=0;i<result.length;i++){
                                var datee = result[i].DepartureDate;
                                var todaydate;
                                var today = new Date();
                                var dateee = new Date(result[i].DepartureDate);
                                var Difference_In_Time = today.getTime() - dateee.getTime();
                                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                                console.log(Difference_In_Days);
                                var idd = result[i].UserID;
                                if(Difference_In_Days>=15){
                                    var sqlwa= `Delete from toursbooked where UserID =  '${result[i].UserID}' and TourID = '${result[i].TourID}'`;
                                    con.query(sqlwa, function (err, result, fields){
                                        console.log("ToursBooked data has been deleted");
                                    });
                                    var statuswa = "Free";
                                    var sqlwa= `update tourguides set Status = '${statuswa}' where ID in (Select TourguideID from takestour where '${result[i].UserID}' and TourID = '${result[i].TourID}')`;
                                    con.query(sqlwa, function (err, result, fields){
                                        console.log("TourGuides data has been updated");
                                    });
                                    var sqlwa= `delete from takestour where '${result[i].UserID}' and TourID = '${result[i].TourID}'`;
                                    con.query(sqlwa, function (err, result, fields){
                                        console.log("TakesTour data has been deleted");
                                    });
                                }
                            }
                        }
                    });
                    var sql= `SELECT * from flights`;
                    con.query(sql, function (err, result, fields){
                        for(var i=0; i<result.length;i++){
                            var datee = new Date(result[i].Date);
                            var todaydate;
                            var dateetoday;
                            var today = new Date();
                            if(today.getMonth()+1 <=9 && today.getDate()<=9){
                                todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
                            }
                            else if(today.getMonth()+1 <=9){
                                todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
                            }
                            else if(today.getDate() <=9){
                                todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
                            }
                            else{
                                todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
                            }
                            if(datee.getMonth()+1 <=9 && datee.getDate()<=9){
                                dateetoday = datee.getFullYear()+'-0'+(datee.getMonth()+1)+'-0'+datee.getDate();
                            }
                            else if(datee.getMonth()+1 <=9){
                                dateetoday = datee.getFullYear()+'-0'+(datee.getMonth()+1)+'-'+datee.getDate();
                            }
                            else if(datee.getDate() <=9){
                                dateetoday = datee.getFullYear()+'-'+(datee.getMonth()+1)+'-0'+datee.getDate();
                            }
                            else{
                                dateetoday = datee.getFullYear()+'-'+(datee.getMonth()+1)+'-'+datee.getDate(); 
                            }
                            if(dateetoday < todaydate){
                                var sqlafter= `DELETE from flights where ID = '${result[i].ID}'`;
                                con.query(sqlafter, function (err, resultafter, fields){
                                    console.log("The flights data has been deleted.")
                                });
                            }
                        }
                    });
                    flag=1;
                    emaill=email;
                    res.redirect('/admin');
                }
            }
        });
    }
    else if(checkings=="tourguidee"){
        var sql= `SELECT * FROM tourguides WHERE Email = '${email}'`;
        con.query(sql, function (err, result){
            if(result.length<=0){
                res.status(200).render('login.pug',{message2: '* Invalid Email'});
            }
            else{
                var pass = result[0].Password;
                if(pass!=password){
                    res.status(200).render('login.pug',{message2: '* Invalid Password'});
                }
                else{
                    emaill=email;
                    flag=1;
                    res.redirect('/tourguideinfo');
                }
            }
        });
    }
    else if(checkings=="userr"){
        var sql= `SELECT * FROM users WHERE Email = '${email}'`;
        con.query(sql, function (err, result){
            if(result.length<=0){
                res.status(200).render('login.pug',{message2: '* Invalid Email'});
            }
            else{
                var pass = result[0].Password;
                if(pass!=password){
                    res.status(200).render('login.pug',{message2: '* Invalid Password'});
                }
                else{
                    emaill=email;
                    flag=1;
                    res.redirect('/services');
                }
            }
        });
    }
    else{
        res.status(200).render('login.pug',{message2: '* Select Either Option'});
    }
});

app.get('/tourguideinfo',(req,res)=>{
    var sqling= `SELECT * from tourguides where Email = '${emaill}'`;
    con.query(sqling, function (err, resulting, fields){
    var idwa = resulting[0].ID;
    var sql= `SELECT * from tourguidejoin1 where TourguideID = '${idwa}'`;
    con.query(sql, function (err, result, fields){
        if(result.length<=0){
            res.status(200).render('TourGuide/tourguide1.pug');
        }
        else{
            var flight={
                'TourGuideID':result[0].TourguideID,
                'UserID':result[0].UserID,
                'Name':result[0].Name,
                'Email':result[0].Email,
                'TourID':result[0].TourID,
                'Location':result[0].Location,
                'Days':result[0].Days,
                'DepartureDate':result[0].DepartureDate,
            }
            res.status(200).render('TourGuide/tourguide.pug',{"flightt": flight});
        }
    });
});
});

app.get('/services', function(req, res) {
    const params={ }
    res.status(200).render('services.pug',params);
});

app.get('/hotel',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params);
});

app.get('/flight',(req,res)=>{
    const params={ }
    res.status(200).render('Flights/flights.pug',params);
});

app.get('/showmybook',(req, res)=>{
    console.log(emaill);
    var sql= `SELECT * from showmybookjoin WHERE Email = '${emaill}'`;
    con.query(sql, function (err, result, fields){
        if(result.length<=0){
            res.status(200).render('Flights/flights.pug',{message: '* NO BOOKINGS'});
        }
        else{
            var flightlist=[];
            for (var i = 0; i < result.length; i++) {
                var flight={
                    'UserID':result[i].UserID,
                    'UserEmail':result[i].Email,
                    'FlightID':result[i].FlightID,
                    'Airline':result[i].Airline,
                    'Departure':result[i].Departure,
                    'Destination':result[i].Destination,
                    'ChildrenSeats':result[i].ChildrenSeats,
                    'AdultSeats':result[i].AdultSeats,
                    'SeatsBooked':result[i].SeatsBooked,
                    'Amount':result[i].Amount,
                    'Date':result[i].Date,
                    'Time':result[i].Time,
                }
                flightlist.push(flight); 
            }
            res.status(200).render('Flights/showmybookings',{"flightlist": flightlist});
        }
    });
});

app.post('/flightcheck',(req, res, next)=>{
    var departure=req.body.departure;
    var destination=req.body.destination;
    var date=req.body.date;
    var sql= `SELECT * FROM flights WHERE Departure = '${departure}' AND Destination = '${destination}' AND Date = '${date}'`;
    con.query(sql, function (err, result, fields){
        if(result.length<=0){
            res.status(200).render('Flights/flights.pug',{message: '* No Such Flight Exist'});
        }
        else{
            var flightlist=[];
            for (var i = 0; i < result.length; i++) {
                if(result[i].Seats!=result[i].Booked){
                    var flight={
                        'ID':result[i].ID,
                        'Airline':result[i].Airline,
                        'Departure':result[i].Departure,
                        'Destination':result[i].Destination,
                        'Date':result[i].Date,
                        'Time':result[i].Time,
                        'Amount':result[i].Amount,
                        'Seats':result[i].Seats,
                        'Booked':result[i].Booked
                    }
                    flightlist.push(flight); 
                }
            }
            res.status(200).render('Flights/showflight',{"flightlist": flightlist});
        }
    });
});

app.post('/bookflight',(req, res, next)=>{
    var id=req.body.id;
    var bookingch=req.body.bookingch;
    var bookingad=req.body.bookingad;
    var booking= +bookingch + +bookingad;
    var email=req.body.email;
    var userid;
    var totalcost;
    var sql= `SELECT * FROM users WHERE Email = '${emaill}'`;
    con.query(sql, function (err, result){
        if(result.length<=0){
            res.status(200).render('Flights/flights.pug',{message: '* Invalid Email'});
        }
        else{
            userid=result[0].ID;
            var sql= `SELECT * FROM flights WHERE ID = '${id}'`;
            con.query(sql, function (err, result, fields){
                if(result.length<=0 || result[0].Seats == result[0].Booked){
                    res.status(200).render('Flights/flights.pug',{message: '* Invalid Flight ID'});
                }
                else if(bookingch <=0 && bookingad <=0){
                    res.status(200).render('Flights/flights.pug',{message: '* Children and Adult Seats are 0'});
                }
                else{
                    var seats=result[0].Seats;
                var booked=result[0].Booked;
                var available=+seats - +booked;
                if(booking>available){
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                        user: 'advancetourguides@gmail.com',
                        pass: 'crbvfzyiabzawftb'
                        }
                    });
                    var mailOptions = {
                        from: 'advancetourguides@gmail.com',
                        to: `${emaill}`,
                        subject: 'APOLOGIES FROM FLIGHT',
                        text: `We Have Only ${available} Total Seats Available for the flight in ${result[0].Airline} Airlines, Departuring from ${result[0].Departure} to ${result[0].Destination}.`
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        res.status(200).render('Flights/flights.pug',{message: 'FLIGHT SUCCESSFULLY BOOKED'});
                        }
                    });
                }
                else{
                    var setbooked= +booking + +booked;
                    var seatprice, seatpricech, seatpricechh, seatpricead;
                    // var sql1 = `UPDATE flights SET Booked = '${setbooked}' WHERE ID = '${id}'`;
                    // con.query(sql1, function (err, result1){
                    //     if (err) throw err;
                    //     console.log("Flights Data Has Been Updated");
                    // });
                    var sql1 = `SELECT * FROM flights WHERE ID = '${id}'`;
                con.query(sql1, function (err, result){
                    if (err) throw err;
                    seatprice= result[0].Amount;
                    seatpricech= (+seatprice * 20)/100;
                    seatpricech= +seatprice - +seatpricech;
                    seatpricechh= +seatpricech * +bookingch;
                    seatpricead= +seatprice * +bookingad;
                    totalcost= +seatpricechh + +seatpricead;
                    var sql10 = `select * from users where Email = '${emaill}'`;
                    con.query(sql10, function (err, result10){
                        if (err) throw err;
                        var idd = result10[0].ID;
                    var sql9 = `SELECT ChildrenSeats, AdultSeats, SeatsBooked, Amount from flightsbooked where UserID = '${idd}' AND FlightID = '${id}'`;
                    con.query(sql9, function (err, result1){
                        if(result1.length>0){
                            var newbooksch= +bookingch + +result1[0].ChildrenSeats;
                            var newbooksad= +bookingad + +result1[0].AdultSeats;
                            var newbooksseats= +booking + +result1[0].SeatsBooked;
                            var newbooksamount= +totalcost + +result1[0].Amount;
                            var sql1 = `UPDATE flightsbooked set ChildrenSeats = '${newbooksch}', AdultSeats = '${newbooksad}', SeatsBooked = '${newbooksseats}', Amount = '${newbooksamount}' where UserID = '${idd}' AND FlightID = '${id}'`;
                            con.query(sql1, function (err, result){
                                if (err) throw err;
                                console.log("FlightsBooked Data Has Been Updated");
                            });
                        }
                        else{
                            var sql1 = `INSERT INTO flightsbooked (UserID, FlightID, ChildrenSeats, AdultSeats, SeatsBooked, Amount) VALUES ('${userid}', '${id}', '${bookingch}', '${bookingad}', '${booking}', '${totalcost}')`;
                            con.query(sql1, function (err, result){
                                if (err) throw err;
                                console.log("FlightsBooked Data Has Been Inserted");
                            });
                        }
                    });
                    });
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                        user: 'advancetourguides@gmail.com',
                        pass: 'crbvfzyiabzawftb'
                        }
                    });
                    var mailOptions = {
                        from: 'advancetourguides@gmail.com',
                        to: `${emaill}`,
                        subject: 'FLIGHT IS SUCCESSFULLY BOOKED',
                        text: `Your ${booking} Seats In Total (${bookingch} For Children AND ${bookingad} For Adults) Are Booked for the flight in ${result[0].Airline} Airlines, Departuring from ${result[0].Departure} to ${result[0].Destination}. The Total Cost Will Be PKR ${totalcost}. Further Account Details And Payment Method Will be Communicated Soon.`
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        res.status(200).render('Flights/flights.pug',{message: 'FLIGHT SUCCESSFULLY BOOKED'});
                        }
                    });
                });
                }
                }
            });
        }
    });
});

app.post('/cancelflight',(req, res, next)=>{
    var id=req.body.id;
    var bookingch=req.body.bookingch;
    var bookingad=req.body.bookingad;
    var booking= +bookingch + +bookingad;
    var email=req.body.email;
    var userid;
    var sql= `SELECT * FROM users WHERE Email = '${emaill}'`;
    con.query(sql, function (err, result){
        if(result.length<=0){
            res.status(200).render('Flights/flights.pug',{message: '* Invalid Email'});
        }
        else{
            userid=result[0].ID;
            var seatprice;
            var sql= `SELECT * FROM flights WHERE ID = '${id}'`;
            con.query(sql, function (err, result, fields){
                if(result.length<=0){
                    res.status(200).render('Flights/flights.pug',{message: '* Invalid Flight ID'});
                }
                else{
                    seatprice= result[0].Amount;
                    var sql1= `SELECT * FROM flightsbooked WHERE UserID = '${userid}' AND FlightID = '${id}'`;
                    con.query(sql1, function (err, result, fields){
                        if(result.length<=0){
                            res.status(200).render('Flights/flights.pug',{message: '* You Have Not Booked This Flight'});
                        }
                        else if(bookingch <=0 && bookingad <=0){
                            res.status(200).render('Flights/flights.pug',{message: '* Children and Adult Seats are 0.'});
                        }
                        else if(bookingch>result[0].ChildrenSeats){
                            res.status(200).render('Flights/flights.pug',{message: `* You Have Not Booked ${bookingch} Children Seats.`});
                        }
                        else if(bookingad>result[0].AdultSeats){
                            res.status(200).render('Flights/flights.pug',{message: `* You Have Not Booked ${bookingad} Adult Seats.`});
                        }
                        else if(booking>result[0].SeatsBooked){
                            res.status(200).render('Flights/flights.pug',{message: `* You Have Not Booked ${bookingad} Total Seats.`});
                        }
                        else{
                            if(booking==result[0].SeatsBooked){
                                var sql2 = `DELETE FROM flightsbooked WHERE UserID = '${userid}' AND FlightID = '${id}'`;
                                con.query(sql2, function (err, result){
                                    if (err) throw err;
                                    console.log("Flightsbooked Data Has Been Deleted");
                                });
                            }
                            else{
                                var newbookedseats= +result[0].SeatsBooked - +booking;
                                var newbookedseatsch= +result[0].ChildrenSeats - +bookingch;
                                var newbookedseatsad= +result[0].AdultSeats - +bookingad;
                                var seatpricech= (+seatprice * 20)/100;
                                var seatpricech= +seatprice - +seatpricech;
                                var seatpricechh= +seatpricech * +newbookedseatsch;
                                var seatpricead= +seatprice * +newbookedseatsad;
                                var totalcost= +seatpricechh + +seatpricead;
                                var sql3 = `UPDATE flightsbooked SET ChildrenSeats = '${newbookedseatsch}', AdultSeats = '${newbookedseatsad}', SeatsBooked = '${newbookedseats}', Amount = '${totalcost}' WHERE UserID = '${userid}' AND FlightID = '${id}'`;
                                con.query(sql3, function (err, result){
                                    if (err) throw err;
                                    console.log("Flightsbooked Data Has Been Updated");
                                });
                            }
                        }
                    });
                    var oldseats=result[0].Booked;
                    var newseats= +oldseats - +booking;
                    // var sql1 = `UPDATE flights SET Booked = '${newseats}' WHERE ID = '${id}'`;
                    // con.query(sql1, function (err, result){
                    //     if (err) throw err;
                    //     console.log("Flights Data Has Been Updated");
                    // });
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'advancetourguides@gmail.com',
                            pass: 'crbvfzyiabzawftb'
                        }
                    });
                    var mailOptions = {
                        from: 'advancetourguides@gmail.com',
                        to: `${emaill}`,
                        subject: 'FLIGHT CANCELLATION',
                        text: `We Have Canceled ${booking} Seats In Total (${bookingch} For Children AND ${bookingad} For Adults) for your upcoming flight in ${result[0].Airline} Airlines, Departuring from ${result[0].Departure} to ${result[0].Destination}. The Refund Amount As Per ATG Policies Will Be Added To Your account. Please Reply This Email With Your Bank Account Name And Number.`
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.status(200).render('Flights/flights.pug',{message: `FLIGHTS SUCCESSFULLY CANCELLED`});
                        }
                    });
                }
            });
        }
    });
});

app.get('/tour',(req,res)=>{
    const params={ }
    res.status(200).render('Tours/tours.pug',params);
});

app.get('/hunza',(req,res)=>{
    const params={ }
    res.status(200).render('Tours/hunza.pug',params);
})

app.get('/naran',(req,res)=>{
    const params={ }
    res.status(200).render('Tours/naran.pug',params);
})

app.get('/skardu',(req,res)=>{
    const params={ }
    res.status(200).render('Tours/skardu.pug',params);
})

app.get('/murree',(req,res)=>{
    const params={ }
    res.status(200).render('Tours/murree.pug',params);
})

app.get('/swat',(req,res)=>{
    const params={ }
    res.status(200).render('Tours/swat.pug',params);
})

app.get('/chitral',(req,res)=>{
    const params={ }
    res.status(200).render('Tours/chitral.pug',params);
})

app.post('/deal',(req,res,next)=>{
    var sql = `SELECT * from transport where Status = 'Free'`;
        con.query(sql, function (err, result, fields){
            if(result.length<=0){
                res.status(200).render('services.pug');
            }
            else{
                var flightlist=[];
                for (var i = 0; i < result.length; i++) {
                    if(result[i].AC == 1){
                        ac="AC";
                    }
                    else{
                        ac="No AC";
                    }
                    var flight={
                        'ID':"ID " + result[i].ID,
                        'Mode':result[i].Mode,
                        'Brand':result[i].Brand,
                        'Seats':result[i].Seats + " Seats",
                        'AC':ac,
                        'Amount':"PKR " + result[i].Amount,
                    }
                    flightlist.push(flight); 
                }
                res.status(200).render('Transport/transport.pug',{"flightlist": flightlist});
            }
        });
});

app.get('/booktransport',(req,res)=>{
    const params={ }
    res.status(200).render('Transport/booktransport.pug',params);
})

app.post('/booktransport1',(req, res, next)=>{
    var seats=req.body.seats;
    var transid=req.body.transid;
    var tourid=req.body.tourid;
    var totalcost;
    var flagwaa=0;
    var totalamount;
    var idf;
    var statuss="Free";
    var sql50 = `SELECT * from users where Email = '${emaill}'`;
        con.query(sql50, function (err, result50,fields){
            var idf = result50[0].ID;
    var sql89= `SELECT * FROM booknow`;
    con.query(sql89, function (err, result89,fields){
        console.log('1');
            for(var i=0; i<result89.length;i++){
                console.log(result89[i]);
                if(result89[i].TourID != tourid && result89[i].UserID == idf && result89[i].TransportID == transid){
                    flagwaa=1;
                    break;
                }
            }
            if(flagwaa){
                res.status(200).render('Transport/booktransport.pug',{message: '* Transport Already Booked By You For Other Tour'});
            }
            else if(seats <= 0){
                res.status(200).render('Transport/booktransport.pug',{message: 'No Seats Booked'});
            }
            else{
                var sql= `SELECT * FROM transport WHERE ID = '${transid}' and Status = '${statuss}'`;
                con.query(sql, function (err, result,fields){
                    console.log('1');
                    if(result.length<=0){
                        res.status(200).render('Transport/booktransport.pug',{message: '* Invalid Transport ID'});
                    }
                    else{
                        var sql10 = `SELECT * from users where Email = '${emaill}'`;
                            con.query(sql10, function (err, result10){
                                if (err) throw err;
                                var idd = result10[0].ID;
                                if(seats>result[0].Seats){
                                    res.status(200).render('Transport/booktransport.pug',{message: '* Invalid Total Seats'});
                                }
                                else{
                                    var amount = +result[0].Amount;
                                    totalamount = +amount * +seats;
                                    var sql9 = `SELECT * from booknow where UserID = '${idd}' and TransportID = '${transid}' and TourID = '${tourid}'`;
                                    con.query(sql9, function (err, result1){
                                        if(result1.length>0){
                                            for(var i=0; i<result1.length; i++){
                                                var newbooksamount= +totalamount + +result1[i].Price;
                                                var sql1 = `UPDATE booknow set Price = '${newbooksamount}' where UserID = '${idd}' AND TourID = '${tourid}'`;
                                                con.query(sql1, function (err, result){
                                                    if (err) throw err;
                                                    console.log("Booknow Data Has Been Updated");
                                                });
                                            }
                                            var sql9 = `SELECT * from transportbooked where UserID = '${idd}' and TransportID = '${transid}'`;
                                            con.query(sql9, function (err, result1){
                                                console.log('5');
                                                if(result1.length>0){
                                                    var newbooksseats= +seats + +result1[0].TotalSeats;
                                                    var newbooksamount= +totalamount + +result1[0].Amount;
                                                    var sql1 = `UPDATE transportbooked set TotalSeats = '${newbooksseats}', Amount = '${newbooksamount}' where UserID = '${idd}' AND TransportID = '${transid}'`;
                                                    con.query(sql1, function (err, result){
                                                        if (err) throw err;
                                                        console.log("TransportBooked Data Has Been Updated");
                                                    });
                                                }
                                                else{
                                                    var sql= `INSERT INTO transportbooked(TransportID, UserID, Amount, TotalSeats) Values('${transid}', '${idd}', '${totalamount}', '${seats}')`;
                                                    con.query(sql, function (err, result){
                                                        if (err) throw err;
                                                        console.log("Transportbooked Data Has Been Inserted");
                                                    });
                                                }
                                            });
                                            var transporter = nodemailer.createTransport({
                                                service: 'gmail',
                                                auth: {
                                                user: 'advancetourguides@gmail.com',
                                                pass: 'crbvfzyiabzawftb'
                                                }
                                            });
                                            var mailOptions = {
                                                from: 'advancetourguides@gmail.com',
                                                to: `${emaill}`,
                                                subject: 'TRANSPORT IS SUCCESSFULLY BOOKED',
                                                text: `Your ${seats} Seats In Total Are Booked for the transport in ${transid}. The Total Cost Will Be PKR ${totalamount}. Further Account Details And Payment Method Will be Communicated Soon.`
                                            };
                                            
                                            transporter.sendMail(mailOptions, function(error, info){
                                                if (error) {
                                                console.log(error);
                                                } else {
                                                console.log('Email sent: ' + info.response);
                                                }
                                            });
                                            var sql9 = `SELECT * from transport where ID = '${transid}'`;
                                            con.query(sql9, function (err, result1){
                                                    var check = result1[0].Seats - +seats;
                                                    if(check==0){
                                                        var sql= `UPDATE transport set Status = 'Booked', Seats=0 where ID = '${transid}'`;
                                                        con.query(sql, function (err, result){
                                                            if (err) throw err;
                                                            console.log("transport Data Has Been Updated");
                                                        });
                                                    }
                                                    else{
                                                        var sql= `UPDATE transport set  Seats='${check}' where ID = '${transid}'`;
                                                        con.query(sql, function (err, result){
                                                            if (err) throw err;
                                                            console.log("transport Data Has Been Updated");
                                                        });
                                                    }
                                            });    
                                            res.status(200).render('Transport/booktransport.pug',{message: 'TRANSPORT SUCCESSFULLY BOOKED'});
                                        }
                                        else{
                                            var sql11 = `SELECT * from booknow where UserID = '${idd}' and TourID = '${tourid}'`;
                                            console.log('4');
                                            con.query(sql11, function (err, result1){
                                                if(result1.length<=0){
                                                    res.status(200).render('Transport/booktransport.pug',{message: '* No Such Tour Booked'});
                                                }
                                                else if(result1[0].TransportID){
                                                    var flag=1;
                                                    for(var i=0; i<result1.length; i++){
                                                        if(result1[0].TransportID == transid){
                                                            flag=0;
                                                            break;
                                                        }
                                                    }
                                                    if(flag){
                                                        var newbooksamount= +totalamount + +result1[0].Price;
                                                        var today = new Date(result1[0].DepartureDate);
                                                        var todaydate;
                                                        if(today.getMonth()+1 <=9 && today.getDate()<=9){
                                                            todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
                                                        }
                                                        else if(today.getMonth()+1 <=9){
                                                            todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
                                                        }
                                                        else if(today.getDate() <=9){
                                                            todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
                                                        }
                                                        else{
                                                            todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
                                                        }
                                                        var sql1 = `INSERT INTO booknow(TourID, Price, UserID, TransportID, DepartureDate) Values('${result1[0].TourID}', '${newbooksamount}', '${idd}', '${transid}', '${todaydate}')`;
                                                        con.query(sql1, function (err, result){
                                                            if (err) throw err;
                                                            console.log("Booknow Data Has Been Inserted");
                                                        });
                                                        var sql1 = `UPDATE booknow SET Price = '${newbooksamount}' WHERE UserID = '${idd}' and TourID = '${tourid}'`;
                                                        con.query(sql1, function (err, result){
                                                            if (err) throw err;
                                                            console.log("Booknow Data Has Been Updated");
                                                        });
                                                        var sql9 = `SELECT * from transportbooked where UserID = '${idd}' and TransportID = '${transid}'`;
                                                        con.query(sql9, function (err, result1){
                                                            console.log('5');
                                                            if(result1.length>0){
                                                                var newbooksseats= +seats + +result1[0].TotalSeats;
                                                                var newbooksamount= +totalamount + +result1[0].Amount;
                                                                var sql1 = `UPDATE transportbooked set TotalSeats = '${newbooksseats}', Amount = '${newbooksamount}' where UserID = '${idd}' AND TransportID = '${transid}'`;
                                                                con.query(sql1, function (err, result){
                                                                    if (err) throw err;
                                                                    console.log("TransportBooked Data Has Been Updated");
                                                                });
                                                            }
                                                            else{
                                                                var sql= `INSERT INTO transportbooked(TransportID, UserID, Amount, TotalSeats) Values('${transid}', '${idd}', '${totalamount}', '${seats}')`;
                                                                con.query(sql, function (err, result){
                                                                    if (err) throw err;
                                                                    console.log("transportbooked Data Has Been Inserted");
                                                                });
                                                            }
                                                        });
                                                        var transporter = nodemailer.createTransport({
                                                            service: 'gmail',
                                                            auth: {
                                                            user: 'advancetourguides@gmail.com',
                                                            pass: 'crbvfzyiabzawftb'
                                                            }
                                                        });
                                                        var mailOptions = {
                                                            from: 'advancetourguides@gmail.com',
                                                            to: `${emaill}`,
                                                            subject: 'TRANSPORT IS SUCCESSFULLY BOOKED',
                                                            text: `Your ${seats} Seats In Total Are Booked for the transport in ${transid}. The Total Cost Will Be PKR ${totalamount}. Further Account Details And Payment Method Will be Communicated Soon.`
                                                        };
                                                        
                                                        transporter.sendMail(mailOptions, function(error, info){
                                                            if (error) {
                                                            console.log(error);
                                                            } else {
                                                            console.log('Email sent: ' + info.response);
                                                            }
                                                        });
                                                        var sql9 = `SELECT * from transport where ID = '${transid}'`;
                                                        con.query(sql9, function (err, result1){
                                                                var check = result1[0].Seats - +seats;
                                                                if(check==0){
                                                                    var sql= `UPDATE transport set Status = 'Booked', Seats=0 where ID = '${transid}'`;
                                                                    con.query(sql, function (err, result){
                                                                        if (err) throw err;
                                                                        console.log("transport Data Has Been Updated");
                                                                    });
                                                                }
                                                                else{
                                                                    var sql= `UPDATE transport set  Seats='${check}' where ID = '${transid}'`;
                                                                    con.query(sql, function (err, result){
                                                                        if (err) throw err;
                                                                        console.log("transport Data Has Been Updated");
                                                                    });
                                                                }
                                                        });    
                                                        res.status(200).render('Transport/booktransport.pug',{message: 'TRANSPORT SUCCESSFULLY BOOKED'});
                                                    }
                                                }
                                                else{
                                                    var newbooksamount= +totalamount + +result1[0].Price;
                                                    var sql= `Update booknow set Price = '${newbooksamount}', TransportID = '${transid}' where UserID = '${idd}' AND TourID = '${tourid}'`;
                                                    con.query(sql, function (err, result){
                                                        if (err) throw err;
                                                        console.log("booknow Data Has Been Updated2");
                                                    });
                                                    var sql1 = `UPDATE booknow SET Price = '${newbooksamount}' WHERE UserID = '${idd}' and TourID = '${tourid}'`;
                                                        con.query(sql1, function (err, result){
                                                            if (err) throw err;
                                                            console.log("Booknow Data Has Been Updated2");
                                                        });
                                                    var sql9 = `SELECT * from transportbooked where UserID = '${idd}' and TransportID = '${transid}'`;
                                                    con.query(sql9, function (err, result1){
                                                        console.log('5');
                                                        if(result1.length>0){
                                                            var newbooksseats= +seats + +result1[0].TotalSeats;
                                                            var newbooksamount= +totalamount + +result1[0].Amount;
                                                            var sql1 = `UPDATE transportbooked set TotalSeats = '${newbooksseats}', Amount = '${newbooksamount}' where UserID = '${idd}' AND TransportID = '${transid}'`;
                                                            con.query(sql1, function (err, result){
                                                                if (err) throw err;
                                                                console.log("TransportBooked Data Has Been Updated");
                                                            });
                                                        }
                                                        else{
                                                            var sql= `INSERT INTO transportbooked(TransportID, UserID, Amount, TotalSeats) Values('${transid}', '${idd}', '${totalamount}', '${seats}')`;
                                                            con.query(sql, function (err, result){
                                                                if (err) throw err;
                                                                console.log("transportbooked Data Has Been Inserted");
                                                            });
                                                        }
                                                    });
                                                    var transporter = nodemailer.createTransport({
                                                        service: 'gmail',
                                                        auth: {
                                                        user: 'advancetourguides@gmail.com',
                                                        pass: 'crbvfzyiabzawftb'
                                                        }
                                                    });
                                                    var mailOptions = {
                                                        from: 'advancetourguides@gmail.com',
                                                        to: `${emaill}`,
                                                        subject: 'TRANSPORT IS SUCCESSFULLY BOOKED',
                                                        text: `Your ${seats} Seats In Total Are Booked for the transport in ${transid}. The Total Cost Will Be PKR ${totalamount}. Further Account Details And Payment Method Will be Communicated Soon.`
                                                    };
                                                    
                                                    transporter.sendMail(mailOptions, function(error, info){
                                                        if (error) {
                                                        console.log(error);
                                                        } else {
                                                        console.log('Email sent: ' + info.response);
                                                        }
                                                    });
                                                    var sql9 = `SELECT * from transport where ID = '${transid}'`;
                                                    con.query(sql9, function (err, result1){
                                                            var check = result1[0].Seats - +seats;
                                                            if(check==0){
                                                                var sql= `UPDATE transport set Status = 'Booked', Seats=0 where ID = '${transid}'`;
                                                                con.query(sql, function (err, result){
                                                                    if (err) throw err;
                                                                    console.log("transport Data Has Been Updated");
                                                                });
                                                            }
                                                            else{
                                                                var sql= `UPDATE transport set  Seats='${check}' where ID = '${transid}'`;
                                                                con.query(sql, function (err, result){
                                                                    if (err) throw err;
                                                                    console.log("transport Data Has Been Updated");
                                                                });
                                                            }
                                                    });    
                                                    res.status(200).render('Transport/booktransport.pug',{message: 'TRANSPORT SUCCESSFULLY BOOKED'});
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                    }
                });
            }
    });
});
    // var sql23= `SELECT * FROM toursbooked join transportbooked on toursbooked.UserID = transportbooked.UserID where transportbooked.TransportID = '${transid}' AND toursbooked.TourID = '${tourid}' AND transportbooked.UserID = '${idf}'`;
    // con.query(sql23, function (err, result23,fields){
    //     console.log('1');
    //     if(result23.length>0){
    //     }
    //     else{
    //         res.status(200).render('Transport/booktransport.pug',{message: '* Transport Already Booked By You For Other Tour'});
    //     }
    // });
});

app.get('/showmybooktransport',(req, res)=>{
    console.log(emaill);
    var sql= `SELECT * from showmybooktransportjoin WHERE Email = '${emaill}'`;
    con.query(sql, function (err, result, fields){
        if(result.length<=0){
            res.status(200).render('Transport/booktransport.pug',{message: '* NO BOOKINGS'});
        }
        else{
            var flightlist=[];
            for (var i = 0; i < result.length; i++) {
                var flight={
                    'UserID':result[i].UserID,
                    'UserEmail':result[i].Email,
                    'TransportID':result[i].TransportID,
                    'Mode':result[i].Mode,
                    'Brand':result[i].Brand,
                    'TotalSeats':result[i].TotalSeats,
                    'AC':result[i].AC,
                    'Amount':result[i].Amount,
                }
                flightlist.push(flight); 
            }
            res.status(200).render('Transport/showmybookings',{"flightlist": flightlist});
        }
    });
});

app.post('/canceltransport',(req, res, next)=>{
    var id=req.body.id;
    var seats= req.body.seats;
    var tourid= req.body.tourid;
    var statusnow = "Free";
    var flagwa=0;
    var userid;
    var sql= `SELECT * FROM users WHERE Email = '${emaill}'`;
    con.query(sql, function (err, result){
        if(result.length<=0){
            res.status(200).render('Transport/booktransport.pug',{message: '* Invalid Email'});
        }
        else if(seats <=0){
            res.status(200).render('Transport/booktransport.pug',{message: 'No Seats Canceled'});
        }
        else{
            userid=result[0].ID;
            var seatprice;
            var sql= `SELECT * FROM transport WHERE ID = '${id}'`;
            con.query(sql, function (err, result, fields){
                if(result.length<=0){
                    res.status(200).render('Transport/booktransport.pug',{message: '* Invalid Transport ID'});
                }
                else{
                    var recentseats = result[0].Seats;
                    seatprice= result[0].Amount;
                    var sql1= `SELECT * FROM transportbooked WHERE UserID = '${userid}' AND TransportID = '${id}'`;
                    con.query(sql1, function (err, result, fields){
                        if(result.length<=0){
                            res.status(200).render('Transport/booktransport.pug',{message: '* You Have Not Booked This Transport'});
                        }
                        else if(seats>result[0].TotalSeats){
                            res.status(200).render('Transport/booktransport.pug',{message: `* You Have Not Booked ${seats} Seats.`});
                        }
                        else{
                            if(seats==result[0].TotalSeats){        
                                var sql2 = `SELECT * FROM booknow WHERE UserID = '${userid}' AND TourID = '${tourid}' AND TransportID = '${id}'`;
                                con.query(sql2, function (err, result1){
                                    if(result1.length<=0){
                                        res.status(200).render('Transport/booktransport.pug',{message: '* You Have Not Booked This Transport For This Tour'});
                                    }
                                    else{
                                        
                                        var sql3 = `SELECT * FROM booknow WHERE UserID = '${userid}' AND TourID = '${tourid}'`;
                                        con.query(sql3, function (err, result){
                                            if (err) throw err;
                                            if(result.length<=0){
                                                res.status(200).render('Transport/booktransport.pug',{message: '* You have not booked this tour'});
                                            }
                                            else{
                                                var sorry = result[0].Price;
                                                var recent = +seatprice * seats;
                                                var finalamount= +sorry - +recent;
                                                // var sql3 = `UPDATE booknow SET Price = '${finalamount}', TransportID = '${flagwa}' WHERE UserID = '${userid}' AND TourID = '${tourid}' AND TransportID = '${id}'`;
                                                //     con.query(sql3, function (err, result){
                                                //         if (err) throw err;
                                                //         console.log("Booknow Data Has Been Updated");
                                                //     });
                                                    var sql2 = `DELETE FROM transportbooked WHERE UserID = '${userid}' AND TransportID = '${id}'`;
                                                    con.query(sql2, function (err, result){
                                                        if (err) throw err;
                                                        console.log("Transportbooked Data Has Been Deleted");
                                                    });
                                                    var sql3 = `UPDATE booknow SET Price = '${finalamount}' WHERE UserID = '${userid}' AND TourID = '${tourid}'`;
                                                    con.query(sql3, function (err, result){
                                                        if (err) throw err;
                                                        console.log("Booknow Data Has Been Updated");
                                                    });
                                            }
                                    });
                                        // var updatedone = +recentseats + +seats;
                                        // var sql3 = `UPDATE transport SET Seats = '${updatedone}', Status = '${statusnow}' WHERE ID = '${id}'`;
                                        //     con.query(sql3, function (err, result){
                                        //         if (err) throw err;
                                        //         console.log("Transport Data Has Been Updated");
                                        //     });
                                            var transporter = nodemailer.createTransport({
                                                service: 'gmail',
                                                auth: {
                                                    user: 'advancetourguides@gmail.com',
                                                    pass: 'crbvfzyiabzawftb'
                                                }
                                            });
                                            var mailOptions = {
                                                from: 'advancetourguides@gmail.com',
                                                to: `${emaill}`,
                                                subject: 'TRANSPORT CANCELLATION',
                                                text: `We Have Canceled ${seats} Seats In Total for your upcoming transport id ${id}. The Refund Amount As Per ATG Policies Will Be Added To Your account. Please Reply This Email With Your Bank Account Name And Number.`
                                            };
                                            transporter.sendMail(mailOptions, function(error, info){
                                                if (error) {
                                                    console.log(error);
                                                } else {
                                                    console.log('Email sent: ' + info.response);
                                                    res.status(200).render('Transport/booktransport.pug',{message: 'TRANSPORT SUCCESSFULLY CANCELLED'});
                                                }
                                            });
                                    }
                                });
                            }
                            else{
                                var sql2 = `SELECT * FROM booknow WHERE UserID = '${userid}' AND TourID = '${tourid}' AND TransportID = '${id}'`;
                                con.query(sql2, function (err, result1){
                                if(result1.length<=0){
                                    res.status(200).render('Transport/booktransport.pug',{message: '* You Have Not Booked This Transport For This Tour'});
                                }
                                else{
                                    var newbookedseats= +result[0].TotalSeats - +seats;
                                var recent = +seatprice * seats;
                                var newamount = +result[0].Amount - recent;
                                var sql3 = `UPDATE transportbooked SET TotalSeats = '${newbookedseats}', Amount = '${newamount}' WHERE UserID = '${userid}' AND TransportID = '${id}'`;
                                con.query(sql3, function (err, result){
                                    if (err) throw err;
                                    console.log("Transportbooked Data Has Been Updated");
                                });
                                var sorry;
                                var sql3 = `SELECT * FROM booknow WHERE UserID = '${userid}' AND TourID = '${tourid}'`;
                                con.query(sql3, function (err, result){
                                    if (err) throw err;
                                    if(result.length<=0){
                                        res.status(200).render('Transport/booktransport.pug',{message: '* You have not booked this tour'});
                                    }
                                    else{
                                        sorry = result[0].Price;
                                        var finalamount= +sorry - +recent;
                                        var sql3 = `UPDATE booknow SET Price = '${finalamount}' WHERE UserID = '${userid}' AND TourID = '${tourid}'`;
                                        con.query(sql3, function (err, result){
                                            if (err) throw err;
                                            console.log("Booknow Data Has Been Updated");
                                        });
                                    }
                            });
                            var updatedone = +recentseats + +seats;
                                var sql3 = `UPDATE transport SET Seats = '${updatedone}', Status = '${statusnow}' WHERE ID = '${id}'`;
                                    con.query(sql3, function (err, result){
                                        if (err) throw err;
                                        console.log("Transport Data Has Been Updated");
                                    });
                                    var transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        auth: {
                                            user: 'advancetourguides@gmail.com',
                                            pass: 'crbvfzyiabzawftb'
                                        }
                                    });
                                    var mailOptions = {
                                        from: 'advancetourguides@gmail.com',
                                        to: `${emaill}`,
                                        subject: 'TRANSPORT CANCELLATION',
                                        text: `We Have Canceled ${seats} Seats In Total for your upcoming transport id ${id}. The Refund Amount As Per ATG Policies Will Be Added To Your account. Please Reply This Email With Your Bank Account Name And Number.`
                                    };
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log('Email sent: ' + info.response);
                                            res.status(200).render('Transport/booktransport.pug',{message: 'TRANSPORT SUCCESSFULLY CANCELLED'});
                                        }
                                    });
                                }
                            });
                            }
                        }
                    });
                }
            });
        }
    });
});

app.get('/proceedhotels',(req,res)=>{
    const params={ }
    res.status(200).render('Hotels/hotels.pug',params);
});

var touriddd;

app.post('/hotelcheck',(req,res,next)=>{
    var tourid=req.body.tourid;
    var sql = `SELECT * from tours where ID = '${tourid}'`;
        con.query(sql, function (err, result, fields){
            if(result.length<=0){
                res.status(200).render('Hotels/hotels.pug',{message: '* Invalid Tour ID'});
            }
            else{
                var loc = result[0].Location;
                var sql = `SELECT * from hotels where Location = '${loc}' and Rooms != Booked`;
                con.query(sql, function (err, result, fields){
                    if(result.length<=0){
                        res.status(200).render('Hotels/hotels.pug',{message: '* Invalid Tour ID OR No Such Location'});
                    }
                    else{
                        touriddd = tourid;
                        var flightlist=[];
                        for (var i = 0; i < result.length; i++) {
                            var flight={
                                'ID':"ID " + result[i].ID,
                                'Name':result[i].Name,
                                'Location':"At " + result[i].Location,
                                'Rooms':result[i].Rooms + " Rooms",
                                'Booked':result[i].Booked + " Booked",
                                'Amount':"PKR " + result[i].Price,
                            }
                            flightlist.push(flight); 
                        }
                        res.status(200).render('Hotels/showhotels.pug',{"flightlist": flightlist});
                    }
                });
            }
        });
});

app.post('/bookhotel',(req, res, next)=>{
    var hotelid=req.body.hotelid;
    var rooms=req.body.rooms;
    var tourid=touriddd;
    var totalcost;
    var totalamount;
    var statuss="Free";
    var sql= `SELECT * FROM hotels WHERE ID = '${hotelid}' and Rooms != (SELECT Booked from hotels WHERE ID = '${hotelid}') and Location = (SELECT Location from tours WHERE ID = '${tourid}')`;
    con.query(sql, function (err, result,fields){
        console.log('1');
        if(result.length<=0){
            res.status(200).render('Hotels/hotels.pug',{message: '* Invalid Hotel'});
        }
        else if(rooms <= 0){
            res.status(200).render('Hotels/hotels.pug',{message: 'No Rooms Booked'});
        }
        else{
            var sql10 = `SELECT * from users where Email = '${emaill}'`;
                con.query(sql10, function (err, result10){
                    if (err) throw err;
                    var idd = result10[0].ID;
                    var recentroombook = result[0].Booked;
                    var recentroom = result[0].Rooms;
                    var change = +result[0].Rooms - +result[0].Booked;
                    if(rooms>change){
                        res.status(200).render('Hotels/hotels.pug',{message: '* Invalid Rooms'});
                    }
                    else{
                        var price = +result[0].Price;
                        totalprice = +price * +rooms;
                        var sql9 = `SELECT * from booknow where UserID = '${idd}' and HotelID = '${hotelid}' and TourID = '${tourid}'`;
                        con.query(sql9, function (err, result1){
                            if(result1.length>0){
                                for(var i=0; i<result1.length; i++){
                                    var newbooksamount= +totalprice + +result1[i].Price;
                                    var sql1 = `UPDATE booknow set Price = '${newbooksamount}' where UserID = '${idd}' AND TourID = '${tourid}'`;
                                    con.query(sql1, function (err, result){
                                        if (err) throw err;
                                        console.log("Booknow Data Has Been Updated");
                                    });
                                }
                                var sql9 = `SELECT * from hotelsbooked where UserID = '${idd}' and HotelID = '${hotelid}'`;
                                con.query(sql9, function (err, result1){
                                    console.log('5');
                                    if(result1.length>0){
                                        var newbooksseats= +rooms + +result1[0].TotalRooms;
                                        var newbooksamount= +totalprice + +result1[0].Amount;
                                        var sql1 = `UPDATE hotelsbooked set TotalRooms = '${newbooksseats}', Amount = '${newbooksamount}' where UserID = '${idd}' AND HotelID = '${hotelid}'`;
                                        con.query(sql1, function (err, result){
                                            if (err) throw err;
                                            console.log("HotelsBooked Data Has Been Updated");
                                        });
                                    }
                                    else{
                                        var sql= `INSERT INTO hotelsbooked(HotelID, UserID, Amount, TotalRooms) Values('${hotelid}', '${idd}', '${totalprice}', '${rooms}')`;
                                        con.query(sql, function (err, result){
                                            if (err) throw err;
                                            console.log("Hotelsbooked Data Has Been Inserted");
                                        });
                                    }
                                });
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                    user: 'advancetourguides@gmail.com',
                                    pass: 'crbvfzyiabzawftb'
                                    }
                                });
                                var mailOptions = {
                                    from: 'advancetourguides@gmail.com',
                                    to: `${emaill}`,
                                    subject: 'Hotel IS SUCCESSFULLY BOOKED',
                                    text: `Your ${rooms} Rooms In Total Are Booked for the hotel in ${hotelid}. The Total Cost Will Be PKR ${totalprice}. Further Account Details And Payment Method Will be Communicated Soon.`
                                };
                                
                                transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                    console.log(error);
                                    } else {
                                    console.log('Email sent: ' + info.response);
                                    }
                                });
                                var sql9 = `SELECT * from hotels where ID = '${hotelid}'`;
                                con.query(sql9, function (err, result1){
                                        var recentroomsbooked = result1[0].Booked;
                                        var now = +recentroomsbooked + +rooms;
                                        var sql= `UPDATE hotels set Booked = '${now}' where ID = '${hotelid}'`;
                                        con.query(sql, function (err, result){
                                            if (err) throw err;
                                            console.log("hotels Data Has Been Updated");
                                        }); 
                                });    
                                res.status(200).render('Hotels/hotels.pug',{message: 'HOTEL SUCCESSFULLY BOOKED'});
                            }
                            else{
                                var sql11 = `SELECT * from booknow where UserID = '${idd}' and TourID = '${tourid}'`;
                                console.log('4');
                                con.query(sql11, function (err, result1){
                                    if(result1.length<=0){
                                        res.status(200).render('Hotels/hotels.pug',{message: '* No Such Tour Booked'});
                                    }
                                    else if(result1[0].HotelID){
                                        var flag=1;
                                        for(var i=0; i<result1.length; i++){
                                            if(result1[0].HotelID == hotelid){
                                                flag=0;
                                                break;
                                            }
                                        }
                                        if(flag){
                                            var newbooksamount= +totalprice + +result1[0].Price;
                                            console.log(totalprice);
                                            console.log(result1[0].Price);
                                            var today = new Date(result1[0].DepartureDate);
                                            var todaydate;
                                            if(today.getMonth()+1 <=9 && today.getDate()<=9){
                                                todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
                                            }
                                            else if(today.getMonth()+1 <=9){
                                                todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
                                            }
                                            else if(today.getDate() <=9){
                                                todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
                                            }
                                            else{
                                                todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
                                            }
                                            var sql1 = `INSERT INTO booknow(TourID, Price, UserID, TransportID, HotelID, DepartureDate) Values('${result1[0].TourID}', '${newbooksamount}', '${idd}', '${result1[0].TransportID}', '${hotelid}', '${todaydate}')`;
                                            con.query(sql1, function (err, result){
                                                if (err) throw err;
                                                console.log("Booknow Data Has Been Inserted");
                                            });
                                            var sql1 = `UPDATE booknow SET Price = '${newbooksamount}' WHERE UserID = '${idd}' and TourID = '${tourid}'`;
                                            con.query(sql1, function (err, result){
                                                if (err) throw err;
                                                console.log("Booknow Data Has Been Updated");
                                            });
                                            var sql9 = `SELECT * from hotelsbooked where UserID = '${idd}' and HotelID = '${hotelid}'`;
                                            con.query(sql9, function (err, result1){
                                                console.log('5');
                                                if(result1.length>0){
                                                    var newbooksseats= +rooms + +result1[0].TotalRooms;
                                                    var newbooksamount= +totalprice + +result1[0].Amount;
                                                    var sql1 = `UPDATE hotelsbooked set TotalRooms = '${newbooksseats}', Amount = '${newbooksamount}' where UserID = '${idd}' AND HotelID = '${hotelid}'`;
                                                    con.query(sql1, function (err, result){
                                                        if (err) throw err;
                                                        console.log("HotelsBooked Data Has Been Updated");
                                                    });
                                                }
                                                else{
                                                    var sql= `INSERT INTO hotelsbooked(HotelID, UserID, Amount, TotalRooms) Values('${hotelid}', '${idd}', '${totalprice}', '${rooms}')`;
                                                    con.query(sql, function (err, result){
                                                        if (err) throw err;
                                                        console.log("Hotelsbooked Data Has Been Inserted");
                                                    });
                                                }
                                            });
                                            var transporter = nodemailer.createTransport({
                                                service: 'gmail',
                                                auth: {
                                                user: 'advancetourguides@gmail.com',
                                                pass: 'crbvfzyiabzawftb'
                                                }
                                            });
                                            var mailOptions = {
                                                from: 'advancetourguides@gmail.com',
                                                to: `${emaill}`,
                                                subject: 'HOTEL IS SUCCESSFULLY BOOKED',
                                                text: `Your ${rooms} Rooms In Total Are Booked for the hotel in ${hotelid}. The Total Cost Will Be PKR ${totalprice}. Further Account Details And Payment Method Will be Communicated Soon.`
                                            };
                                
                                            transporter.sendMail(mailOptions, function(error, info){
                                                if (error) {
                                                console.log(error);
                                                } else {
                                                console.log('Email sent: ' + info.response);
                                                }
                                            });
                                            var sql9 = `SELECT * from hotels where ID = '${hotelid}'`;
                                            con.query(sql9, function (err, result1){
                                                    var recentroomsbooked = result1[0].Booked;
                                                    var now = +recentroomsbooked + +rooms;
                                                    var sql= `UPDATE hotels set Booked = '${now}' where ID = '${hotelid}'`;
                                                    con.query(sql, function (err, result){
                                                        if (err) throw err;
                                                        console.log("hotels Data Has Been Updated");
                                                    }); 
                                            });  
                                            res.status(200).render('Hotels/hotels.pug',{message: 'HOTEL SUCCESSFULLY BOOKED'});
                                        }
                                    }
                                    else{
                                        var newbooksamount= +totalprice + +result1[0].Price;
                                        var sql= `Update booknow set Price = '${newbooksamount}', HotelID = '${hotelid}' where UserID = '${idd}' AND TourID = '${tourid}'`;
                                        con.query(sql, function (err, result){
                                            if (err) throw err;
                                            console.log("booknow Data Has Been Updated2");
                                        });
                                        var sql1 = `UPDATE booknow SET Price = '${newbooksamount}' WHERE UserID = '${idd}' and TourID = '${tourid}'`;
                                            con.query(sql1, function (err, result){
                                                if (err) throw err;
                                                console.log("Booknow Data Has Been Updated2");
                                            });
                                        var sql9 = `SELECT * from hotelsbooked where UserID = '${idd}' and HotelID = '${hotelid}'`;
                                        con.query(sql9, function (err, result1){
                                            console.log('5');
                                            if(result1.length>0){
                                                var newbooksseats= +rooms + +result1[0].TotalRooms;
                                                var newbooksamount= +totalprice + +result1[0].Amount;
                                                var sql1 = `UPDATE hotelsbooked set TotalSeats = '${newbooksseats}', Amount = '${newbooksamount}' where UserID = '${idd}' AND HotelID = '${hotelid}'`;
                                                con.query(sql1, function (err, result){
                                                    if (err) throw err;
                                                    console.log("HotelsBooked Data Has Been Updated");
                                                });
                                            }
                                            else{
                                                var sql= `INSERT INTO hotelsbooked(HotelID, UserID, Amount, TotalRooms) Values('${hotelid}', '${idd}', '${totalprice}', '${rooms}')`;
                                                con.query(sql, function (err, result){
                                                    if (err) throw err;
                                                    console.log("Hotelsbooked Data Has Been Inserted");
                                                });
                                            }
                                        });
                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                            user: 'advancetourguides@gmail.com',
                                            pass: 'crbvfzyiabzawftb'
                                            }
                                        });
                                        var mailOptions = {
                                            from: 'advancetourguides@gmail.com',
                                            to: `${emaill}`,
                                            subject: 'Hotel IS SUCCESSFULLY BOOKED',
                                            text: `Your ${rooms} Rooms In Total Are Booked for the hotel in ${hotelid}. The Total Cost Will Be PKR ${totalprice}. Further Account Details And Payment Method Will be Communicated Soon.`
                                        };
                                        
                                        transporter.sendMail(mailOptions, function(error, info){
                                            if (error) {
                                            console.log(error);
                                            } else {
                                            console.log('Email sent: ' + info.response);
                                            }
                                        });
                                        var sql9 = `SELECT * from hotels where ID = '${hotelid}'`;
                                        con.query(sql9, function (err, result1){
                                                var recentroomsbooked = result1[0].Booked;
                                                var now = +recentroomsbooked + +rooms;
                                                var sql= `UPDATE hotels set Booked = '${now}' where ID = '${hotelid}'`;
                                                con.query(sql, function (err, result){
                                                    if (err) throw err;
                                                    console.log("hotels Data Has Been Updated");
                                                }); 
                                        });     
                                        res.status(200).render('Hotels/hotels.pug',{message: 'HOTEL SUCCESSFULLY BOOKED'});
                                    }
                                });
                            }
                        });
                    }
                });
        }
    });
});

app.post('/cancelhotel',(req, res, next)=>{
    var id=req.body.id;
    var rooms= req.body.rooms;
    var tourid= req.body.tourid;
    var flagwa=0;
    var userid;
    var sql= `SELECT * FROM users WHERE Email = '${emaill}'`;
    con.query(sql, function (err, result){
        if(result.length<=0){
            res.status(200).render('Hotels/hotels.pug',{message: '* Invalid Email'});
        }
        else if(rooms <= 0){
            res.status(200).render('Hotels/hotels.pug',{message: 'No Rooms Canceled'});
        }
        else{
            userid=result[0].ID;
            var roomprice;
            var sql= `SELECT * FROM hotels WHERE ID = '${id}'`;
            con.query(sql, function (err, result, fields){
                if(result.length<=0){
                    res.status(200).render('Hotels/hotels.pug',{message: '* Invalid Hotel ID'});
                }
                else{
                    var recentroombooked = result[0].Booked;
                    roomprice= result[0].Price;
                    var sql1= `SELECT * FROM hotelsbooked WHERE UserID = '${userid}' AND HotelID = '${id}'`;
                    con.query(sql1, function (err, result, fields){
                        if(result.length<=0){
                            res.status(200).render('Hotels/hotels.pug',{message: '* You Have Not Booked This Hotel'});
                        }
                        else if(rooms>result[0].TotalRooms){
                            res.status(200).render('Hotels/hotels.pug',{message: `* You Have Not Booked ${rooms} Rooms.`});
                        }
                        else{
                            if(rooms==result[0].TotalRooms){
                        
                                var sql2 = `SELECT * FROM booknow WHERE UserID = '${userid}' AND TourID = '${tourid}' AND HotelID = '${id}'`;
                                con.query(sql2, function (err, result){
                                    if(result.length<=0){
                                        res.status(200).render('Hotels/hotels.pug',{message: `* You Have Not Booked This Hotel for This Tour`});
                                    }
                                    else{
                                        var sorry = result[0].Price;
                                        var recent = +roomprice * rooms;
                                        var finalamount= +sorry - +recent;
                                        // var sql3 = `UPDATE booknow SET Price = '${finalamount}', HotelID = '${flagwa}' WHERE UserID = '${userid}' AND TourID = '${tourid}' AND HotelID = '${id}'`;
                                        //     con.query(sql3, function (err, result){
                                        //         if (err) throw err;
                                        //         console.log("Booknow Data Has Been Updated");
                                        //     });
                                        // var updatedone = +recentroombooked - +rooms;
                                        // var sql3 = `UPDATE hotels SET Booked = '${updatedone}' WHERE ID = '${id}'`;
                                        //     con.query(sql3, function (err, result){
                                        //         if (err) throw err;
                                        //         console.log("Hotels Data Has Been Updated");
                                        //     });
                                            var sql2 = `DELETE FROM hotelsbooked WHERE UserID = '${userid}' AND HotelID = '${id}'`;
                                            con.query(sql2, function (err, result){
                                                if (err) throw err;
                                                console.log("Hotelsbooked Data Has Been Deleted");
                                            });
                                            var sql3 = `UPDATE booknow SET Price = '${finalamount}' WHERE UserID = '${userid}' AND TourID = '${tourid}'`;
                                            con.query(sql3, function (err, result){
                                                if (err) throw err;
                                                console.log("Booknow Data Has Been Updated");
                                            });
                                            var transporter = nodemailer.createTransport({
                                                service: 'gmail',
                                                auth: {
                                                    user: 'advancetourguides@gmail.com',
                                                    pass: 'crbvfzyiabzawftb'
                                                }
                                            });
                                            var mailOptions = {
                                                from: 'advancetourguides@gmail.com',
                                                to: `${emaill}`,
                                                subject: 'HOTEL CANCELLATION',
                                                text: `We Have Canceled ${rooms} Rooms In Total for your hotel id ${id}. The Refund Amount As Per ATG Policies Will Be Added To Your account. Please Reply This Email With Your Bank Account Name And Number.`
                                            };
                                            transporter.sendMail(mailOptions, function(error, info){
                                                if (error) {
                                                    console.log(error);
                                                } else {
                                                    console.log('Email sent: ' + info.response);
                                                    res.status(200).render('Hotels/hotels.pug',{message: 'HOTEL SUCCESSFULLY CANCELLED'});
                                                }
                                            });
                                    }
                                });
                            }
                            else{
                                var sql2 = `SELECT * FROM booknow WHERE UserID = '${userid}' AND TourID = '${tourid}' AND HotelID = '${id}'`;
                                con.query(sql2, function (err, result1){
                                    if(result1.length<=0){
                                        res.status(200).render('Hotels/hotels.pug',{message: `* You Have Not Booked This Hotel for This Tour`});
                                    }
                                    else{
                                        var newbookedseats= +result[0].TotalRooms - +rooms;
                                var recent = +roomprice * rooms;
                                var newamount = +result[0].Amount - recent;
                                var sql3 = `UPDATE hotelsbooked SET TotalRooms = '${newbookedseats}', Amount = '${newamount}' WHERE UserID = '${userid}' AND HotelID = '${id}'`;
                                con.query(sql3, function (err, result){
                                    if (err) throw err;
                                    console.log("hotelsbooked Data Has Been Updated");
                                });
                                var sorry;
                                var sql3 = `SELECT * FROM booknow WHERE UserID = '${userid}' AND TourID = '${tourid}'`;
                                con.query(sql3, function (err, result){
                                    if (err) throw err;
                                    if(result.length<=0){
                                        res.status(200).render('Hotels/hotels.pug',{message: '* You have not booked this tour'});
                                    }
                                    else{
                                        sorry = result[0].Price;
                                        var finalamount= +sorry - +recent;
                                        var sql3 = `UPDATE booknow SET Price = '${finalamount}' WHERE UserID = '${userid}' AND TourID = '${tourid}'`;
                                        con.query(sql3, function (err, result){
                                            if (err) throw err;
                                            console.log("Booknow Data Has Been Updated");
                                        });
                                    }
                            });
                            var updatedone = +recentroombooked - +rooms;
                                var sql3 = `UPDATE hotels SET Booked = '${updatedone}' WHERE ID = '${id}'`;
                                    con.query(sql3, function (err, result){
                                        if (err) throw err;
                                        console.log("Hotels Data Has Been Updated");
                                    });
                                    }
                                });
                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: 'advancetourguides@gmail.com',
                                        pass: 'crbvfzyiabzawftb'
                                    }
                                });
                                var mailOptions = {
                                    from: 'advancetourguides@gmail.com',
                                    to: `${emaill}`,
                                    subject: 'HOTEL CANCELLATION',
                                    text: `We Have Canceled ${rooms} Rooms In Total for your hotel id ${id}. The Refund Amount As Per ATG Policies Will Be Added To Your account. Please Reply This Email With Your Bank Account Name And Number.`
                                };
                                transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log('Email sent: ' + info.response);
                                        res.status(200).render('Hotels/hotels.pug',{message: 'HOTEL SUCCESSFULLY CANCELLED'});
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    });
});

app.get('/showmybookhotel',(req, res)=>{
    console.log(emaill);
    var sql= `SELECT * from showmybookhoteljoin WHERE Email = '${emaill}'`;
    con.query(sql, function (err, result, fields){
        if(result.length<=0){
            res.status(200).render('Hotels/hotels.pug',{message: '* NO BOOKINGS'});
        }
        else{
            var flightlist=[];
            for (var i = 0; i < result.length; i++) {
                var flight={
                    'UserID':result[i].UserID,
                    'UserEmail':result[i].Email,
                    'HotelID':result[i].HotelID,
                    'Name':result[i].Name,
                    'Location':result[i].Location,
                    'Amount':result[i].Amount,
                    'TotalRooms':result[i].TotalRooms,
                }
                flightlist.push(flight); 
            }
            res.status(200).render('Hotels/showmybookings',{"flightlist": flightlist});
        }
    });
});

app.post('/testtour',(req,res)=>{
    const params={ }
    res.status(200).render('Tours/booktours.pug',params);
});

app.post('/tourcheck',(req, res, next)=>{
    var countch=req.body.countch;
    var countad=req.body.countad;
    var tourid=req.body.tourid;
    var userid;
    var totalcost;
    var sql= `SELECT * FROM tours WHERE ID = '${tourid}'`;
    con.query(sql, function (err, result){
        if(result.length<=0){
            res.status(200).render('Tours/tours.pug',{message: '* Invalid Tour ID'});
        }
        else if(countch <=0 && countad <=0){
            res.status(200).render('Tours/tours.pug',{message: 'No Seats Booked'});
        }
        else{
            var sql= `SELECT * FROM tours where ID = '${tourid}'`;
            con.query(sql, function (err, result, fields){
                if(result.length<=0){
                    res.status(200).render('Tours/tours.pug',{message: '* Invalid Tour ID'});
                }
                else{
                    var idfinal;
                    var sqlfinal1= `SELECT * FROM users where Email = '${emaill}'`;
                    con.query(sqlfinal1, function (err, resultfinal1, fields){
                    idfinal = resultfinal1[0].ID;
                    var sqlfinal= `SELECT * FROM takestour where UserID = '${idfinal}' and TourID = '${tourid}'`;
                    con.query(sqlfinal, function (err, resultfinal, fields){
                        if(resultfinal.length<=0){
                            var loci = result[0].Location;
                    var statuss = "Free";
                    var sqlll= `SELECT * FROM tourguides where Location = '${loci}' and Status = '${statuss}'`;
                    con.query(sqlll, function (err, resulttt, fields){
                        if(resulttt.length<=0){
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                user: 'advancetourguides@gmail.com',
                                pass: 'crbvfzyiabzawftb'
                                }
                            });
                            var mailOptions = {
                                from: 'advancetourguides@gmail.com',
                                to: `${emaill}`,
                                subject: 'APOLOGIES FROM ATG',
                                text: `Hi Folks. This tour is currently on hype and we are not having enough tour guiders for this tour. We recoomend you to check for this tour 8-9 days later so that we can get completed with one tour slot. Otherwise you can also look for some other tour. OUR ALL TOURS ROCKS. Thank You.`
                            };
                            
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                console.log(error);
                                } else {
                                console.log('Email sent: ' + info.response);
                                }
                            });
                            res.status(200).render('Tours/tours.pug',{message: '* Check Your Email!!!'});
                        }
                        else{
                            var sql10 = `SELECT * from users where Email = '${emaill}'`;
                            con.query(sql10, function (err, result10){
                            if (err) throw err;
                            var idd = result10[0].ID;
                            var price = result[0].Price;
                            var pricedis = price - (price*20/100);
                            var amountch = pricedis*countch;
                            var amountad = price*countad;
                            var totalprice = amountch + amountad;
                            var totalcount = +countad + +countch;
                            // var sql9 = `SELECT * from booknow where UserID = '${idd}' and TourID = '${tourid}'`;
                            // con.query(sql9, function (err, result1){
                            //     if(result1.length>0){
                            //         var newbooksamount= +totalprice + +result1[0].Price;
                            //         var sql1 = `UPDATE booknow set Price = '${newbooksamount}' where UserID = '${idd}' AND TourID = '${tourid}'`;
                            //         con.query(sql1, function (err, result){
                            //             if (err) throw err;
                            //             console.log("ToursBooked Data Has Been Updated");
                            //         });
                                
                            //     }
                            //     else{
                            //         var today=new Date();
                            //         var todaydate;
                            //         if(today.getMonth()+1 <=9){
                            //             todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
                            //         }
                            //         else{
                            //             todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
                            //         }
                            //         var sql= `INSERT INTO booknow(TourID, Price, UserID, DepartureDate) Values('${tourid}', '${totalprice}', '${idd}', '${todaydate}')`;
                            //         con.query(sql, function (err, result){
                            //             if (err) throw err;
                            //             console.log("booknow Data Has Been Inserted");
                            //         });
                            //     }
                            // });
                            var sql9 = `SELECT * from toursbooked where UserID = '${idd}' and TourID = '${tourid}'`;
                            con.query(sql9, function (err, result1){
                                if(result1.length>0){
                                    var newbooksch= +countch + +result1[0].ChildrenSeats;
                                    var newbooksad= +countad + +result1[0].AdultSeats;
                                    var newbooksseats= +totalcount + +result1[0].TotalSeats;
                                    var newbooksamount= +totalprice + +result1[0].Amount;
                                    var sql1 = `UPDATE toursbooked set ChildrenSeats = '${newbooksch}', AdultSeats = '${newbooksad}', TotalSeats = '${newbooksseats}', Amount = '${newbooksamount}' where UserID = '${idd}' AND TourID = '${tourid}'`;
                                    con.query(sql1, function (err, result){
                                        if (err) throw err;
                                        console.log("ToursBooked Data Has Been Updated");
                                    });
                                }
                                else{
                                    var sql= `INSERT INTO toursbooked(TourID, UserID, ChildrenSeats, AdultSeats, TotalSeats, Amount) Values('${tourid}', '${idd}', '${countch}', '${countad}', '${totalcount}', '${totalprice}')`;
                                    con.query(sql, function (err, result){
                                        if (err) throw err;
                                        console.log("toursbooked Data Has Been Inserted");
                                    });
                                }
                            });
                            var sqlll= `SELECT * FROM tourguides where Location = '${loci}' and Status = '${statuss}'`;
                            var statuswa = "Booked";
                            var today=new Date();
                            var todaydate;
                            if(today.getMonth()+1 <=9 && today.getDate()<=9){
                                todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
                            }
                            else if(today.getMonth()+1 <=9){
                                todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
                            }
                            else if(today.getDate() <=9){
                                todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
                            }
                            else{
                                todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
                            }
                            con.query(sqlll, function (err, resulttt, fields){
                                var tourguideassign = resulttt[0].ID;
                                var sqlll1= `update tourguides set Status = '${statuswa}' where Location = '${resulttt[0].Location}' and Status = '${statuss}' and ID = '${tourguideassign}'`;
                                con.query(sqlll1, function (err, resulttt1, fields){
                                    var sqlll2= `Insert into takestour values('${tourguideassign}','${idd}','${tourid}','${todaydate}')`;
                                    con.query(sqlll2, function (err, resulttt2, fields){
                                        console.log("TakesTour Data Has Been Inserted");
                                    });
                                    console.log("TourGuides Data Has Been Updated");
                                    var transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        auth: {
                                        user: 'advancetourguides@gmail.com',
                                        pass: 'crbvfzyiabzawftb'
                                        }
                                    });
                                    var mailOptions = {
                                        from: 'advancetourguides@gmail.com',
                                        to: `${resulttt[0].Email}`,
                                        subject: 'PACK YOUR BAGS MY GUIDE',
                                        text: `Your tour has been booked for UserID ${idd}. You need to reach at ${loci} on ${todaydate}. For further coordination, you can contact to your customer. Their Email is: ${emaill}. THANKYOU.`
                                    };
                                    
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                        console.log(error);
                                        } else {
                                        console.log('Email sent: ' + info.response);
                                        }
                                    });
                                        

                                        var transporter = nodemailer.createTransport({
                                            service: 'gmail',
                                            auth: {
                                            user: 'advancetourguides@gmail.com',
                                            pass: 'crbvfzyiabzawftb'
                                            }
                                        });
                                        var mailOptions = {
                                            from: 'advancetourguides@gmail.com',
                                            to: `${emaill}`,
                                            subject: 'TOUR IS SUCCESSFULLY BOOKED',
                                            text: `Your ${totalcount} Seats In Total (${countch} For Children AND ${countad} For Adults) Are Booked for the tour in ${tourid}. The Total Cost Will Be PKR ${totalprice}. Further Account Details And Payment Method Will be Communicated Soon. Moreover, your tourguide will be tourguide ${tourguideassign}. You can contact to them on their Email: ${resulttt[0].Email}. THANKYOU.`
                                        };
                                        
                                        transporter.sendMail(mailOptions, function(error, info){
                                            if (error) {
                                            console.log(error);
                                            } else {
                                            console.log('Email sent: ' + info.response);
                                            }
                                        });
                                });
                            });

                            var sql = `SELECT * from transport where Status = 'Free'`;
                                con.query(sql, function (err, result, fields){
                                    if(result.length<=0){
                                        res.status(200).render('Flights/booktours.pug',{message: '* NO Transport Available.'});
                                    }
                                    else{
                                        var flightlist=[];
                                        for (var i = 0; i < result.length; i++) {
                                            var ac;
                                            if(result[i].AC == 1){
                                                ac="AC";
                                            }
                                            else{
                                                ac="No AC";
                                            }
                                            var flight={
                                                'ID': "ID " + result[i].ID,
                                                'Mode':result[i].Mode,
                                                'Brand':result[i].Brand,
                                                'Seats':result[i].Seats + " Seats",
                                                'AC': ac,
                                                'Amount': "PKR " + result[i].Amount,
                                            }
                                            flightlist.push(flight)
                                        }
                                        res.status(200).render('Transport/transport.pug',{"flightlist": flightlist});
                                    }
                                });
                        });
                        }
                    });
                        }
                        else{
                            var sql10 = `SELECT * from users where Email = '${emaill}'`;
                            con.query(sql10, function (err, result10){
                            if (err) throw err;
                            var idd = result10[0].ID;
                            var price = result[0].Price;
                            var pricedis = price - (price*20/100);
                            var amountch = pricedis*countch;
                            var amountad = price*countad;
                            var totalprice = amountch + amountad;
                            var totalcount = +countad + +countch;
                            // var sql9 = `SELECT * from booknow where UserID = '${idd}' and TourID = '${tourid}'`;
                            // con.query(sql9, function (err, result1){
                            //     if(result1.length>0){
                            //         var newbooksamount= +totalprice + +result1[0].Price;
                            //         var sql1 = `UPDATE booknow set Price = '${newbooksamount}' where UserID = '${idd}' AND TourID = '${tourid}'`;
                            //         con.query(sql1, function (err, result){
                            //             if (err) throw err;
                            //             console.log("ToursBooked Data Has Been Updated");
                            //         });
                                
                            //     }
                            //     else{
                            //         var today=new Date();
                            //         var todaydate;
                            //         if(today.getMonth()+1 <=9){
                            //             todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
                            //         }
                            //         else{
                            //             todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
                            //         }
                            //         var sql= `INSERT INTO booknow(TourID, Price, UserID, DepartureDate) Values('${tourid}', '${totalprice}', '${idd}', '${todaydate}')`;
                            //         con.query(sql, function (err, result){
                            //             if (err) throw err;
                            //             console.log("booknow Data Has Been Inserted");
                            //         });
                            //     }
                            // });
                            var sql9 = `SELECT * from toursbooked where UserID = '${idd}' and TourID = '${tourid}'`;
                            con.query(sql9, function (err, result1){
                                if(result1.length>0){
                                    var newbooksch= +countch + +result1[0].ChildrenSeats;
                                    var newbooksad= +countad + +result1[0].AdultSeats;
                                    var newbooksseats= +totalcount + +result1[0].TotalSeats;
                                    var newbooksamount= +totalprice + +result1[0].Amount;
                                    var sql1 = `UPDATE toursbooked set ChildrenSeats = '${newbooksch}', AdultSeats = '${newbooksad}', TotalSeats = '${newbooksseats}', Amount = '${newbooksamount}' where UserID = '${idd}' AND TourID = '${tourid}'`;
                                    con.query(sql1, function (err, result){
                                        if (err) throw err;
                                        console.log("ToursBooked Data Has Been Updated");
                                    });
                                }
                                else{
                                    var sql= `INSERT INTO toursbooked(TourID, UserID, ChildrenSeats, AdultSeats, TotalSeats, Amount) Values('${tourid}', '${idd}', '${countch}', '${countad}', '${totalcount}', '${totalprice}')`;
                                    con.query(sql, function (err, result){
                                        if (err) throw err;
                                        console.log("toursbooked Data Has Been Inserted");
                                    });
                                }
                            });

                            var sql = `SELECT * from transport where Status = 'Free'`;
                                con.query(sql, function (err, result, fields){
                                    if(result.length<=0){
                                        res.status(200).render('Flights/booktours.pug',{message: '* NO Transport Available.'});
                                    }
                                    else{
                                        var flightlist=[];
                                        for (var i = 0; i < result.length; i++) {
                                            var ac;
                                            if(result[i].AC == 1){
                                                ac="AC";
                                            }
                                            else{
                                                ac="No AC";
                                            }
                                            var flight={
                                                'ID': "ID " + result[i].ID,
                                                'Mode':result[i].Mode,
                                                'Brand':result[i].Brand,
                                                'Seats':result[i].Seats + " Seats",
                                                'AC': ac,
                                                'Amount': "PKR " + result[i].Amount,
                                            }
                                            flightlist.push(flight)
                                        }
                                        res.status(200).render('Transport/transport.pug',{"flightlist": flightlist});
                                    }
                                });
                        });
                        }
                    });
                });
                }
            });
        }
    });
});

app.get('/showmytourbook',(req, res)=>{
    console.log(emaill);
    var sql= `SELECT * from showmytourbookjoin WHERE Email = '${emaill}'`;
    con.query(sql, function (err, result, fields){
        if(result.length<=0){
            res.status(200).render('Tours/booktours.pug',{message: '* NO BOOKINGS'});
        }
        else{
            var flightlist=[];
            for (var i = 0; i < result.length; i++) {
                var flight={
                    'UserID':result[i].UserID,
                    'UserEmail':result[i].Email,
                    'TourID':result[i].TourID,
                    'Location':result[i].Location,
                    'ChildrenSeats':result[i].ChildrenSeats,
                    'AdultSeats':result[i].AdultSeats,
                    'SeatsBooked':result[i].TotalSeats,
                    'Amount':result[i].Amount,
                }
                flightlist.push(flight); 
            }
            res.status(200).render('Tours/showmybookings',{"flightlist": flightlist});
        }
    });
});

app.post('/canceltour',(req, res, next)=>{
    var id=req.body.id;
    var bookingch=req.body.bookingch;
    var bookingad=req.body.bookingad;
    var booking= +bookingch + +bookingad;
    var email=req.body.email;
    var statusnow = "Free";
    var userid;
    var sql= `SELECT * FROM users WHERE Email = '${emaill}'`;
    con.query(sql, function (err, result){
        if(result.length<=0){
            res.status(200).render('Tours/booktours.pug',{message: '* Invalid Email'});
        }
        else if(bookingch <=0 && bookingad<=0){
            res.status(200).render('Tours/booktours.pug',{message: 'No Seats Canceled'});
        }
        else{
            userid=result[0].ID;
            var seatprice;
            var sql= `SELECT * FROM tours WHERE ID = '${id}'`;
            con.query(sql, function (err, result, fields){
                if(result.length<=0){
                    res.status(200).render('Tours/booktours.pug',{message: '* Invalid Tour ID'});
                }
                else{
                    seatprice= result[0].Price;
                    var sql1= `SELECT * FROM toursbooked WHERE UserID = '${userid}' AND TourID = '${id}'`;
                    con.query(sql1, function (err, result, fields){
                        if(result.length<=0){
                            res.status(200).render('Tours/booktours.pug',{message: '* You Have Not Booked This Tour'});
                        }
                        else if(bookingch>result[0].ChildrenSeats){
                            res.status(200).render('Tours/booktours.pug',{message: `* You Have Not Booked ${bookingch} Children Seats.`});
                        }
                        else if(bookingad>result[0].AdultSeats){
                            res.status(200).render('Tours/booktours.pug',{message: `* You Have Not Booked ${bookingad} Adult Seats.`});
                        }
                        else if(booking>result[0].TotalSeats){
                            res.status(200).render('Tours/booktours.pug',{message: `* You Have Not Booked ${bookingad} Total Seats.`});
                        }
                        else{
                            if(booking==result[0].TotalSeats){
                                var sqltata = `SELECT * FROM booknow WHERE UserID = '${userid}' AND TourID = '${id}'`;
                                con.query(sqltata, function (err, resulttata){
                                    if (err) throw err;
                                    for(var i=0; i<resulttata.length;i++){
                                        var transportid = resulttata[i].TransportID;
                                        var hotelid = resulttata[i].HotelID;
                                        var sql2 = `DELETE FROM transportbooked WHERE UserID = '${userid}' AND TransportID = '${transportid}'`;
                                        con.query(sql2, function (err, result){
                                            if (err) throw err;
                                            console.log("TransportBooked Data Has Been Deleted");
                                        });
                                        var sql2 = `DELETE FROM hotelsbooked WHERE UserID = '${userid}' AND HotelID = '${hotelid}'`;
                                        con.query(sql2, function (err, result){
                                            if (err) throw err;
                                            console.log("HotelsBooked Data Has Been Deleted");
                                        });
                                    }
                                });
                                var sql2 = `DELETE FROM toursbooked WHERE UserID = '${userid}' AND TourID = '${id}'`;
                                con.query(sql2, function (err, result){
                                    if (err) throw err;
                                    console.log("Toursbooked Data Has Been Deleted");
                                });
                                var sql2 = `SELECT * from takestour WHERE UserID = '${userid}' AND TourID = '${id}'`;
                                con.query(sql2, function (err, result){
                                    if (err) throw err;
                                    var tourguideid=result[0].TourguideID;
                                    var sqltour = `SELECT * from tourguides WHERE ID = '${tourguideid}'`;
                                    con.query(sqltour, function (err, result){
                                    var emailtourguide = result[0].Email;
                                    var sql2 = `DELETE FROM takestour WHERE UserID = '${userid}' AND TourID = '${id}'`;
                                    con.query(sql2, function (err, result){
                                        if (err) throw err;
                                        console.log("Takestour Data Has Been Deleted");
                                    });
                                    var statuswa = "Free";
                                    var sql2 = `UPDATE tourguides set Status = '${statuswa}' WHERE ID = '${tourguideid}'`;
                                    con.query(sql2, function (err, result){
                                        if (err) throw err;
                                        console.log("Tourguides Data Has Been Updated");
                                    });
                                    var transporter = nodemailer.createTransport({
                                        service: 'gmail',
                                        auth: {
                                            user: 'advancetourguides@gmail.com',
                                            pass: 'crbvfzyiabzawftb'
                                        }
                                    });
                                    var mailOptions = {
                                        from: 'advancetourguides@gmail.com',
                                        to: `${emailtourguide}`,
                                        subject: 'TOUR CANCELLATION',
                                        text: `We Have Canceled your upcoming tour. Kindly ask the customer about if they felt any flaw in ADVANCE TOUR GUIDES?`
                                    };
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            console.log('Email sent: ' + info.response);
                                            res.status(200).render('Tours/booktours.pug',{message: 'TOUR SUCCESSFULLY CANCELLED'});
                                        }
                                    });
                                });
                                });
                            }
                            else{
                                var newbookedseats= +result[0].TotalSeats - +booking;
                                var newbookedseatsch= +result[0].ChildrenSeats - +bookingch;
                                var newbookedseatsad= +result[0].AdultSeats - +bookingad;
                                var seatpricech= (+seatprice * 20)/100;
                                var seatpricech= +seatprice - +seatpricech;
                                var seatpricechh= +seatpricech * +newbookedseatsch;
                                var seatpricead= +seatprice * +newbookedseatsad;
                                var totalcost= +seatpricechh + +seatpricead;
                                var sql3 = `UPDATE toursbooked SET ChildrenSeats = '${newbookedseatsch}', AdultSeats = '${newbookedseatsad}', TotalSeats = '${newbookedseats}', Amount = '${totalcost}' WHERE UserID = '${userid}' AND TourID = '${id}'`;
                                con.query(sql3, function (err, result){
                                    if (err) throw err;
                                    console.log("Toursbooked Data Has Been Updated");
                                });
                                var newadprice = +seatprice * +bookingad;
                                var newchprice = +seatpricech * +bookingch;
                                var totalpr = +newadprice + +newchprice;
                                var recentpr;
                                // var sql2 = `SELECT * FROM booknow WHERE UserID = '${userid}' AND TourID = '${id}'`;
                                // con.query(sql2, function (err, result){
                                //     if (err) throw err;
                                //     for (var i = 0; i < result.length; i++) {
                                //         recentpr= +result[i].Price;
                                //         var newprice = +recentpr - +totalpr;
                                //         var sql2 = `UPDATE booknow set Price = '${newprice}' WHERE UserID = '${userid}' AND TourID = '${id}' AND TransportID = '${result[i].TransportID}' AND HotelID = '${result[i].HotelID}'`;
                                //         con.query(sql2, function (err, result){
                                //             if (err) throw err;
                                //             console.log("BookNow Data Has Been Updated");
                                //         });
                                //     }
                                // });
                            }
                        }
                    });
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'advancetourguides@gmail.com',
                            pass: 'crbvfzyiabzawftb'
                        }
                    });
                    var mailOptions = {
                        from: 'advancetourguides@gmail.com',
                        to: `${emaill}`,
                        subject: 'TOUR CANCELLATION',
                        text: `We Have Canceled ${booking} Seats In Total (${bookingch} For Children AND ${bookingad} For Adults) for your upcoming tour of ${result[0].Location}. The Refund Amount As Per ATG Policies Will Be Added To Your account. Please Reply This Email With Your Bank Account Name And Number.`
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.status(200).render('Tours/booktours.pug',{message: 'TOUR SUCCESSFULLY CANCELLED'});
                        }
                    });
                }
            });
        }
    });
});

app.get('/proceedend',(req,res)=>{
    res.status(200).render('end.pug',{});
});

var revenuetot;
var revenuetottour;
var revenuetottransport;
var revenuetothotel;
var revenuetotal;
var revenuetotaltour;
var revenuetotaltransport;
var revenuetotalhotel;

app.get('/admin',(req,res)=>{
    var sql= `SELECT * from adminjoin`;
    var revenuelist=[];
    revenuetotal=0;
    con.query(sql, function (err, result, fields){
        for (var i = 0; i < result.length; i++) {
            var single_amount=result[i].Amount;
            var single_amount_ch=single_amount - ((single_amount*20)/100);
            var revenue_ad=result[i].AdultSeats*single_amount;
            revenue_ad=revenue_ad*10/100;
            var revenue_ch=result[i].ChildrenSeats*single_amount_ch;
            revenue_ch=revenue_ch*10/100;
            revenuetotal=revenuetotal + revenue_ch + revenue_ad;
        }
    var sql= `SELECT * from adminjoin1`;
    var revenuelisttour=[];
    revenuetotaltour=0;
    con.query(sql, function (err, result, fields){
        for (var i = 0; i < result.length; i++) {
            var single_amount=result[i].Price;
            var single_amount_ch=single_amount - ((single_amount*20)/100);
            var revenue_ad=result[i].AdultSeats*single_amount;
            revenue_ad=revenue_ad*30/100;
            var revenue_ch=result[i].ChildrenSeats*single_amount_ch;
            revenue_ch=revenue_ch*30/100;
            revenuetotaltour=revenuetotaltour + revenue_ch + revenue_ad;
        }
    var sql= `SELECT * from adminjoin2`;
    var revenuelisttransport=[];
    revenuetotaltransport=0;
    con.query(sql, function (err, result, fields){
        for (var i = 0; i < result.length; i++) {
            var single_amount=result[i].Amount;
            var revenue=result[i].TotalSeats*single_amount;
            revenue=revenue*30/100;
            revenuetotaltransport=revenuetotaltransport + revenue;
        }
    var sql= `SELECT * from adminjoin3`;
    var revenuelisthotel=[];
    revenuetotalhotel=0;
    con.query(sql, function (err, result, fields){
        for (var i = 0; i < result.length; i++) {
            console.log(result[i]);
            var single_amount=result[i].Price;
            var revenue=result[i].TotalRooms*single_amount;
            revenue=revenue*30/100;
            revenuetotalhotel=revenuetotalhotel + revenue;
        }
        revenuetot={
            'flight':revenuetotal,
        }
        revenuetottour={
            'tour' : revenuetotaltour,
        }
        revenuetottransport={
            'transport' : revenuetotaltransport,
        }
        revenuetothotel={
            'hotel' : revenuetotalhotel,
        }
        res.status(200).render('Admin/admin.pug',{"revenuelist": revenuetot, "revenuelisttour":revenuetottour, "revenuelisttransport": revenuetottransport, "revenuelisthotel": revenuetothotel});
    });
    });
    });
    });
});

app.post('/admin1',(req,res)=>{
    var sql= `SELECT * from adminjoin`;
    var revenuelist=[];
    revenuetotal=0;
    var countflight=0;
    var countflightind=0;
    con.query(sql, function (err, result, fields){
        for (var i = 0; i < result.length; i++) {
            var single_amount=result[i].Amount;
            var single_amount_ch=single_amount - ((single_amount*20)/100);
            var revenue_ad=result[i].AdultSeats*single_amount;
            revenue_ad=revenue_ad*10/100;
            var revenue_ch=result[i].ChildrenSeats*single_amount_ch;
            revenue_ch=revenue_ch*10/100;
            revenuetotal=revenuetotal + revenue_ch + revenue_ad;
        }
        var id=req.body.idflight;
        var sql= `SELECT count(UserID) as "COUNT", FlightID, SUM(SeatsBooked) as "SUM" FROM flightsbooked where FlightID='${id}' group by FlightID`;
        con.query(sql, function (err, result, fields){
            if(result.length>0){
                countflight=result[0].COUNT;
                countflightind=result[0].SUM;
            }
            console.log(countflight);
            revenuetot={
                'flight':revenuetotal,
                'flightbook':countflight,
                'flightbookind':countflightind,
                'group':"Group Bookings",
                'ind':"Individual Bookings",
            }
            res.status(200).render('Admin/admin.pug',{"revenuelist": revenuetot, "revenuelisttour":revenuetottour, "revenuelisttransport": revenuetottransport, "revenuelisthotel": revenuetothotel});
        });
    });
});

app.post('/admin2',(req,res)=>{
    var sql= `SELECT * from adminjoin1`;
    var revenuelisttour=[];
    revenuetotaltour=0;
    var countflight=0;
    var countflightind=0;
    con.query(sql, function (err, result, fields){
        for (var i = 0; i < result.length; i++) {
            var single_amount=result[i].Price;
            var single_amount_ch=single_amount - ((single_amount*20)/100);
            var revenue_ad=result[i].AdultSeats*single_amount;
            revenue_ad=revenue_ad*30/100;
            var revenue_ch=result[i].ChildrenSeats*single_amount_ch;
            revenue_ch=revenue_ch*30/100;
            revenuetotaltour=revenuetotaltour + revenue_ch + revenue_ad;
        }
        var id=req.body.idtour;
        var sql= `SELECT count(UserID) as "COUNT", TourID, SUM(TotalSeats) as "SUM" FROM toursbooked where TourID='${id}' group by TourID`;
        con.query(sql, function (err, result, fields){
            if(result.length>0){
                countflight=result[0].COUNT;
                countflightind=result[0].SUM;
            }
            console.log(countflight);
            revenuetottour={
                'tour':revenuetotaltour,
                'flightbook':countflight,
                'flightbookind':countflightind,
                'group':"Group Bookings",
                'ind':"Individual Bookings",
            }
            res.status(200).render('Admin/admin.pug',{"revenuelist": revenuetot, "revenuelisttour":revenuetottour, "revenuelisttransport": revenuetottransport, "revenuelisthotel": revenuetothotel});
        });
    });
});

app.post('/admin3',(req,res)=>{
    var sql= `SELECT * from adminjoin2`;
    var revenuelisttransport=[];
    revenuetotaltransport=0;
    var countflight=0;
    var countflightind=0;
    con.query(sql, function (err, result, fields){
        for (var i = 0; i < result.length; i++) {
            var single_amount=result[i].Amount;
            var revenue=result[i].TotalSeats*single_amount;
            revenue=revenue*30/100;
            revenuetotaltransport=revenuetotaltransport + revenue;
        }
        var id=req.body.idtransport;
        var sql= `SELECT count(UserID) as "COUNT", TransportID, SUM(TotalSeats) as "SUM" FROM transportbooked where TransportID='${id}' group by TransportID`;
        con.query(sql, function (err, result, fields){
            if(result.length>0){
                countflight=result[0].COUNT;
                countflightind=result[0].SUM;
            }
            console.log(countflight);
            revenuetottransport={
                'transport':revenuetotaltransport,
                'flightbook':countflight,
                'flightbookind':countflightind,
                'group':"Group Bookings",
                'ind':"Individual Bookings",
            }
            res.status(200).render('Admin/admin.pug',{"revenuelist": revenuetot, "revenuelisttour":revenuetottour, "revenuelisttransport": revenuetottransport, "revenuelisthotel": revenuetothotel});
        });
    });
});

app.post('/admin4',(req,res)=>{
    var sql= `SELECT * from adminjoin3`;
    revenuelisthotel=[];
    var revenuetotalhotel=0;
    var countflight=0;
    var countflightind=0;
    con.query(sql, function (err, result, fields){
        for (var i = 0; i < result.length; i++) {
            var single_amount=result[i].Price;
            var revenue=result[i].TotalRooms*single_amount;
            revenue=revenue*30/100;
            revenuetotalhotel=revenuetotalhotel + revenue;
        }
        var id=req.body.idhotel;
        var sql= `SELECT count(UserID) as "COUNT", HotelID, SUM(TotalRooms) as "SUM" FROM hotelsbooked where HotelID='${id}' group by HotelID`;
        con.query(sql, function (err, result, fields){
            if(result.length>0){
                countflight=result[0].COUNT;
                countflightind=result[0].SUM;
            }
            console.log(countflight);
            revenuetothotel={
                'hotel':revenuetotalhotel,
                'flightbook':countflight,
                'flightbookind':countflightind,
                'group':"Group Bookings",
                'ind':"Individual Bookings",
            }
            res.status(200).render('Admin/admin.pug',{"revenuelist": revenuetot, "revenuelisttour":revenuetottour, "revenuelisttransport": revenuetottransport, "revenuelisthotel": revenuetothotel});
        });
    });
});

app.get('/adminup',(req,res)=>{
    const params={ }
    res.status(200).render('Admin/adminupdates.pug',params);
});

app.get('/adminhotel',(req,res)=>{
    const params={ }
    res.status(200).render('Admin/adminhotel.pug',params);
});

app.post('/hoteladd',(req, res, next)=>{
    var name=req.body.name;
    var location=req.body.location;
    var rooms=req.body.rooms;
    var booked=req.body.booked;
    var amount=req.body.amount;
    var sql= `SELECT * FROM hotels WHERE Name = '${name}' AND Location = '${location}'`;
    con.query(sql, function (err, result){
        if(result.length>0){
            res.status(200).render('Admin/adminhotel.pug',{message: '* Hotel Name Already Exists'});
        }
        else if(booked>rooms){
            res.status(200).render('Admin/adminhotel.pug',{message: '* Rooms Booked Cannot Exceed Rooms Available'});
        }
        else if((location == "NK") || (location == "Chitral") || (location == "Hunza") || (location == "Murree") || (location == "Skardu") || (location == "Swat")){
            var sql = `INSERT INTO hotels (Name, Location, Rooms, Booked, Price) VALUES ('${name}', '${location}', '${rooms}', '${booked}', '${amount}')`;
            con.query(sql, function (err, result){
                if (err) throw err;
                    console.log("Hotels Data Has Been Saved");
                    res.status(200).render('Admin/adminhotel.pug',{message: 'HOTEL SUCCESSFULLY INSERTED'});
            });
        }
        else{
            res.status(200).render('Admin/adminhotel.pug',{message: '* Please Enter Valid Location'});
        }
    });
});

app.post('/hotelupdate',(req, res, next)=>{
    var name=req.body.name;
    var location=req.body.location;
    var rooms=req.body.rooms;
    var booked=req.body.booked;
    var amount=req.body.amount;
    var sql= `SELECT * FROM hotels WHERE name = '${name}' AND Location = '${location}'`;
    con.query(sql, function (err, result){
        if(result.length<=0){
            res.status(200).render('Admin/adminhotel.pug',{message: '* No Such Hotel Exist'});
        }
        else{
            if(rooms==""){
                rooms=result[0].Rooms;
            }
            if(booked==""){
                booked=result[0].Booked;
            }
            if(amount==""){
                amount=result[0].Price;
            }
            if(booked>rooms){
                res.status(200).render('Admin/adminhotel.pug',{message: '* Rooms Booked Cannot Exceed Rooms Available'});
            }
            else{
                var id = result[0].ID;
                var sql = `SELECT * from hotelsbooked where HotelID = '${id}'`;
                con.query(sql, function (err, result1){
                    if(result1.length>0){
                        res.status(200).render('Admin/adminhotel.pug',{message: 'HOTEL CURRENTLY IN USE'});
                    }
                    else{
                        var sql = `UPDATE hotels SET Rooms = '${rooms}', Booked = '${booked}', Price = '${amount}' WHERE Name = '${name}' AND Location = '${location}'`;
                        con.query(sql, function (err, result){
                            if (err) throw err;
                                console.log("Hotels Data Has Been Updated");
                                res.status(200).render('Admin/adminhotel.pug',{message: 'HOTEL SUCCESSFULLY UPDATED'});
                        });
                    }
                });
            }
        }
    });
});

app.post('/hoteldelete',(req, res, next)=>{
    var name=req.body.name;
    var location=req.body.location;
    var sql= `SELECT * FROM hotels WHERE Name = '${name}' AND Location = '${location}'`;
    con.query(sql, function (err, result){
        if(result.length<=0){
            res.status(200).render('Admin/adminhotel.pug',{message: '* No Such Hotel Exist'});
        }
        else{
            var id = result[0].ID;
            var sql = `SELECT * from hotelsbooked where HotelID = '${id}'`;
                con.query(sql, function (err, result1){
                    if(result1.length>0){
                        res.status(200).render('Admin/adminhotel.pug',{message: 'HOTEL CURRENTLY IN USE'});
                    }
                    else{
                        var sql = `DELETE FROM hotels WHERE Name = '${name}' AND Location = '${location}'`;
                        con.query(sql, function (err, result){
                            if (err) throw err;
                                console.log("Hotels Data Has Been Deleted");
                                res.status(200).render('Admin/adminhotel.pug',{message: 'HOTEL SUCCESSFULLY DELETED'});
                        });
                    }
                });
        }
    });
});

app.post('/tourupdate',(req, res, next)=>{
    var id=req.body.id;
    var location=req.body.location;
    var price=req.body.price;
    var days=req.body.days;
    var sql= `SELECT * FROM tours WHERE ID = '${id}' and Location = '${location}'`;
    con.query(sql, function (err, result){
        if(result.length<=0){
            res.status(200).render('Admin/admintour.pug',{message: '* No Such Tour Exist'});
        }
        else{
            if(price==""){
                price=result[0].Price;
            }
            if(days==""){
                amount=result[0].Days;
            }
            var sql = `SELECT * from toursbooked where TourID = '${id}'`;
            con.query(sql, function (err, result1){
                if(result1.length>0){
                    res.status(200).render('Admin/admintour.pug',{message: 'TOUR CURRENTLY GOING ON'});
                }
                else{
                    var sql = `UPDATE tours SET Price = '${price}', Days = '${days}' where ID = '${id}'`;
                    con.query(sql, function (err, result){
                        if (err) throw err;
                            console.log("tours Data Has Been Updated");
                            res.status(200).render('Admin/admintour.pug',{message: 'TOUR SUCCESSFULLY UPDATED'});
                    });
                }
            });
        }
    });
});

app.get('/admintransport',(req,res)=>{
    const params={ }
    res.status(200).render('Admin/admintransport.pug',params);
});

app.post('/transportadd',(req, res, next)=>{
    var name=req.body.name;
    var brand=req.body.brand;
    var seats=req.body.seats;
    var amount=req.body.amount;
    var status=req.body.status;
    var ac=req.body.checking;
    if(ac=="on"){
        ac=1;
    }
    else{
        ac=0;
    }
    if(seats==0 && status == "Free"){
        res.status(200).render('Admin/admintransport.pug',{message: '* Make seats >0 OR Status as Booked'});
    }
    else if(seats>0 && status == "Booked"){
        res.status(200).render('Admin/admintransport.pug',{message: '* Make seats as 0 OR Status as Free'});
    }
    else{
        var sql= `SELECT * FROM transport WHERE Mode = '${name}' AND Brand = '${brand}' AND AC = '${ac}'`;
    con.query(sql, function (err, result){
        if(result.length>0){
            res.status(200).render('Admin/admintransport.pug',{message: '* Transport Mode Already Exists'});
        }
        else{
            var sql = `INSERT INTO transport (Mode, Brand, Seats, AC, Amount, Status) VALUES ('${name}', '${brand}', '${seats}', '${ac}', '${amount}', '${status}')`;
            con.query(sql, function (err, result){
                if (err) throw err;
                    console.log("Transports Data Has Been Saved");
                    res.status(200).render('Admin/admintransport.pug',{message: 'TRANSPORT SUCCESSFULLY INSERTED'});
            });
        }
    });
    }
});

app.post('/transportupdate',(req, res, next)=>{
    var name=req.body.name;
    var brand=req.body.brand;
    var seats=req.body.seats;
    var amount=req.body.amount;
    var ac=req.body.checking;
    var status=req.body.status;
    if(ac=="on"){
        ac=1;
    }
    else{
        ac=0;
    }
    if(seats==0 && status == "Free"){
        res.status(200).render('Admin/admintransport.pug',{message: '* Make seats >0 OR Status as Booked'});
    }
    else if(seats>0 && status == "Booked"){
        res.status(200).render('Admin/admintransport.pug',{message: '* Make seats as 0 OR Status as Free'});
    }
    else{
        var sql= `SELECT * FROM transport WHERE Mode = '${name}' AND Brand = '${brand}' AND AC = '${ac}'`;
    con.query(sql, function (err, result){
        if(result.length<=0){
            res.status(200).render('Admin/admintransport.pug',{message: '* No Such Transport Exist'});
        }
        else{
            var id = result[0].ID;
            if(seats==""){
                seats=result[0].Seats;
            }
            if(amount==""){
                amount=result[0].Amount;
            }
            if(status==""){
                status=result[0].Status;
            }
                var sql = `SELECT * from transportbooked where TransportID = '${id}'`;
                con.query(sql, function (err, result1){
                    if(result1.length>0){
                        res.status(200).render('Admin/admintransport.pug',{message: 'TRANSPORT CURRENTLY IN USE'});
                    }
                    else{
                        var sql = `UPDATE transport SET Seats = '${seats}', Amount = '${amount}', Status = '${status}' WHERE Mode = '${name}' AND Brand = '${brand}' AND AC = '${ac}'`;
                        con.query(sql, function (err, result){
                            if (err) throw err;
                                console.log("Transports Data Has Been Updated");
                                res.status(200).render('Admin/admintransport.pug',{message: 'TRANSPORT SUCCESSFULLY UPDATED'});
                        });
                    }
                });
        }
    });
    }
});

app.post('/transportdelete',(req, res, next)=>{
    var name=req.body.name;
    var brand=req.body.brand;
    var ac=req.body.checking;
    if(ac=="on"){
        ac=1;
    }
    else{
        ac=0;
    }
    var sql= `SELECT * FROM transport WHERE Mode = '${name}' AND Brand = '${brand}' AND AC = '${ac}'`;
    con.query(sql, function (err, result){
        if(result.length<=0){
            res.status(200).render('Admin/admintransport.pug',{message: '* No Such Transport Exist'});
        }
        else{
            var id = result[0].ID;
            var sql = `SELECT * from transportbooked where TransportID = '${id}'`;
                con.query(sql, function (err, result1){
                    if(result1.length>0){
                        res.status(200).render('Admin/admintransport.pug',{message: 'TRANSPORT CURRENTLY IN USE'});
                    }
                    else{
                        var sql = `DELETE FROM transport WHERE Mode = '${name}' AND Brand = '${brand}' AND AC = '${ac}'`;
                        con.query(sql, function (err, result){
                            if (err) throw err;
                                console.log("Transports Data Has Been Deleted");
                                res.status(200).render('Admin/admintransport.pug',{message: 'TRANSPORT SUCCESSFULLY DELETED'});
                        });
                    }
                });
        }
    });
});

app.get('/adminflight',(req,res)=>{
    const params={ }
    res.status(200).render('Admin/adminflight.pug',params);
});

app.get('/admintour',(req,res)=>{
    const params={ }
    res.status(200).render('Admin/admintour.pug',params);
});

app.get('/admintransport',(req,res)=>{
    const params={ }
    res.status(200).render('Admin/admintransport.pug',params);
});

app.post('/flightadd',(req, res, next)=>{
    var airport=req.body.airport;
    var departure=req.body.departure;
    var destination=req.body.destination;
    var date=req.body.date;
    var time=req.body.time;
    var amount=req.body.amount;
    var available=req.body.available;
    var booked=req.body.booked;
    var todaydate;
    var today=new Date();
    if(today.getMonth()+1 <=9 && today.getDate()<=9){
        todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
    }
    else if(today.getMonth()+1 <=9){
        todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
    }
    else if(today.getDate() <=9){
        todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
    }
    else{
        todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
    }
    var sql= `SELECT * FROM flights WHERE Airline = '${airport}' AND Departure = '${departure}' AND Destination = '${destination}' AND Date = '${date}' AND Time = '${time}'`;
    con.query(sql, function (err, result){
        if(result.length>0){
            res.status(200).render('Admin/adminflight.pug',{message: '* Flight Already Exists'});
        }
        else if(date<todaydate){
            res.status(200).render('Admin/adminflight.pug',{message: '* Flight Has Been Passed'});
        }
        else if(departure == destination){
            res.status(200).render('Admin/adminflight.pug',{message: '* Departure and Destination Cannot be Same'});
        }
        else if(booked>available){
            res.status(200).render('Admin/adminflight.pug',{message: '* Seats Booked Cannot Exceed Seats Available'});
        }
        else{
            var sql = `INSERT INTO flights (Airline, Departure, Destination, Date, Time, Amount, Seats, Booked) VALUES ('${airport}', '${departure}', '${destination}', '${date}', '${time}', '${amount}', '${available}', '${booked}')`;
            con.query(sql, function (err, result){
                if (err) throw err;
                    console.log("Flights Data Has Been Saved");
                    res.status(200).render('Admin/adminflight.pug',{message: 'Flight Has Been Added Successfully'});
            });
        }
    });
});

app.post('/flightupdate',(req, res, next)=>{
    var airport=req.body.airport;
    var departure=req.body.departure;
    var destination=req.body.destination;
    var date=req.body.date;
    var time=req.body.time;
    var amount=req.body.amount;
    var available=req.body.available;
    var booked=req.body.booked;
    var today=new Date();
    var sql= `SELECT * FROM flights WHERE Airline = '${airport}' AND Departure = '${departure}' AND Destination = '${destination}' AND Date = '${date}' AND Time = '${time}'`;
    con.query(sql, function (err, result){
        if(result.length<=0){
            res.status(200).render('Admin/adminflight.pug',{message: '* No Such Flight Exist'});
        }
        else{
            if(amount==""){
                amount=result[0].Amount;
            }
            if(available==""){
                available=result[0].Seats;
            }
            if(booked==""){
                booked=result[0].Booked;
            }
            if(booked>available){
                res.status(200).render('Admin/adminflight.pug',{message: '* Seats Booked Cannot Exceed Seats Available'});
            }
            else{
                if(today.getMonth()+1 <=9 && today.getDate()<=9){
                    todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-0'+today.getDate();
                }
                else if(today.getMonth()+1 <=9){
                    todaydate = today.getFullYear()+'-0'+(today.getMonth()+1)+'-'+today.getDate();
                }
                else if(today.getDate() <=9){
                    todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-0'+today.getDate();
                }
                else{
                    todaydate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(); 
                }
                if(date<todaydate){
                    res.status(200).render('Admin/adminflight.pug',{message: '* Flight Has Been Passed'});
                }
                else{
                    var id = result[0].ID;
                    var sql = `SELECT * from flightsbooked where FlightID = '${id}'`;
                    con.query(sql, function (err, result1){
                        if(result1.length>0){
                            res.status(200).render('Admin/adminflight.pug',{message: 'FLIGHT CURRENTLY IN USE'});
                        }
                        else{
                            var sql = `UPDATE flights SET Amount = '${amount}', Seats= '${available}', Booked = '${booked}' WHERE Airline = '${airport}' AND Departure = '${departure}' AND Destination = '${destination}' AND Date = '${date}' AND Time = '${time}'`;
                            con.query(sql, function (err, result){
                                if (err) throw err;
                                    console.log("Flights Data Has Been Updated");
                                    res.status(200).render('Admin/adminflight.pug',{message: 'FLIGHT HAS BEEN UPDATED'});
                            });
                        }
                    });
                }
            }
        }
    });
});

app.post('/flightdelete',(req, res, next)=>{
    var airport=req.body.airport;
    var departure=req.body.departure;
    var destination=req.body.destination;
    var date=req.body.date;
    var time=req.body.time;
    var sql= `SELECT * FROM flights WHERE Airline = '${airport}' AND Departure = '${departure}' AND Destination = '${destination}' AND Date = '${date}' AND Time = '${time}'`;
    con.query(sql, function (err, result){
        if(result.length<=0){
            res.status(200).render('Admin/adminflight.pug',{message: '* No Such Flight Exist'});
        }
        else{
            var id = result[0].ID;
            var sql = `SELECT * from flightsbooked where FlightID = '${id}'`;
                con.query(sql, function (err, result1){
                    if(result1.length>0){
                        res.status(200).render('Admin/adminflight.pug',{message: 'FLIGHT CURRENTLY IN USE'});
                    }
                    else{
                        var sql = `DELETE FROM flights WHERE Airline = '${airport}' AND Departure = '${departure}' AND Destination = '${destination}' AND Date = '${date}' AND Time = '${time}'`;
                        con.query(sql, function (err, result){
                            if (err) throw err;
                                console.log("Flights Data Has Been Deleted");
                                res.status(200).render('Admin/adminflight.pug',{message: 'FLIGHT HAS BEEN DELETED'});
                        });
                    }
                });
        }
    });
});

app.get('/about',(req,res)=>{
    console.log(flag);
    const params={ }
    if(flag==0){
        message1=" ";
    }
    else if(flag==1){
        message1="OK";
    }
    res.status(200).render('about.pug',{message: message1});
});

app.get('/aboutadmin',(req,res)=>{
    console.log(flag);
    const params={ }
    if(flag==0){
        message1=" ";
    }
    else if(flag==1){
        message1="OK";
    }
    res.status(200).render('Admin/admin.pug',{"revenuelist": revenuetot, "revenuelisttour":revenuetottour, "revenuelisttransport": revenuetottransport, "revenuelisthotel": revenuetothotel});
});

app.get('/abouttourguide',(req,res)=>{
    console.log(flag);
    const params={ }
    if(flag==0){
        message1=" ";
    }
    else if(flag==1){
        message1="OK";
    }
    res.status(200).render('TourGuide/abouttourguide.pug',{message: message1});
});

app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});