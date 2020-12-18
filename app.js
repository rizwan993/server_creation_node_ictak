var http = require('http');
var os   = require('os');
var osName = require('os-name');
var fs = require('fs');
var nodemailer = require('nodemailer');


var server = http.createServer(function(req,res){

    if(req.url === "/"){
        res.write("Welcome to the server");
        res.end();
    }

    else if(req.url === "/serverdetails"){
        res.write("OS Name:"+ osName());
        res.write("\n OS Arch:"+ os.arch());
        res.end();
    }

    else if(req.url === "/html/page") {
        fs.readFile('index.html', (_err, data) => {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
            
    }

    else if(req.url === "/textme"){
        fs.writeFile('newfile.txt', 'Mohamed Rizwan AZ', (err) => {
                if (err)
                    res.write('Failed!');

                else
                    res.write('File is created successfully.');

                return res.end();
            }); 
           
    }

    else if(req.url === "/mailer"){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rizwanzakariya09@gmail.com',
              pass: '**********'
            }
          });
          
          var mailOptions = {
            from: 'rizwanzakariya09@gmail.com',
            to: 'gokul.g@ictkerala.org',
            subject: 'AUTOMATED EMAIL FROM NODE',
            text: 'Successfully completed the given activity! :) by Mohamed Rizwan AZ'
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      console.log(error);
                  } else {
                      console.log('Email sent: ' + info.response);
                  }
              });
    }

    else{
        res.write("Bad Request");
        res.end();
    }


});

server.listen(8888);