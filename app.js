const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer =require('multer');
const pesapal = require('pesapal')({
    consumerKey: 'ff9Gf3Kn7qHhqDyVCnMfTLfpt/WAQ1bW',
    consumerSecret: 'O5eCh/mjBiFxNCrVru1wAfCrVQc=',
    testing: true,
});
const fs = require('fs-extra');
const fileUpload = require('express-fileupload');
const path = require('path');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var formidable = require('formidable');
const session = require('express-session');
var os = require('os');
os.tmpDir = os.tmpdir;


// Express settings
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//sessions
app.use(session({
    secret: 'KEY_board-cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true , maxAge: 1000 * 60 * 60 * 24}
}));

//Set routes
var page = require("./routes/index");
app.use('/pages', page);

app.get('/', (req, res)=>{
    res.render('index')
})


// app.post('/', (req, res)=>{
//     const form = new formidable.IncomingForm();

//     form.options.multiples = true;
//     var n = [];
    
//     form.parse(req, (err, fields, files) => {
//         if(!Array.isArray(files.img)){
//             console.log(files);
//             let oldPath = files.img.filepath;
//             let newPath = path.join(__dirname, 'images', files.img.originalFilename);

//             fs.rename(oldPath, newPath, err => {
//                 if(err) throw err;
//                 console.log('File uploaded and moved');
//                 res.send('File uploaded');
//             })
//         }else{
//             for(let value of files.img){
//                 let oldPath = value.filepath;
//                 let newPath = path.join(__dirname, 'images', value.originalFilename);

//                 n.push(new Object({
//                     'file_name': value.name,
//                     'file_type': value.type
//                 }));

//                 fs.rename(oldPath, newPath, err => {
//                     if(err) throw err;
//                     console.log('File uploaded and moved');
//                 })
//             }
//             res.send('Multiple files uploaded');
//         }
//     });

// })

// //payments
// app.post('/api/pay/', (req,res)=>{
//     //post a direct order
//     var postParams = {
//         'oauth_callback': 'http:127.0.0.1:4000/'
//     };

//     var requestData = {
//         'Amount':'1',
//         'Description': 'Total purchased items',
//         'Type': 'MERCHANT',
//         'Reference': '12erw224dfqwdR',
//         'PhoneNumber': '0710443487'
//     };

//     var url = pesapal.postDirectOrder(postParams, requestData);
//     console.log(url);
//     res.send(url);
// })

// app.get("/api/pay/post/", (req, res)=>{
//     var postParams = {
//         'pesapal_merchant_reference': '12erw224dfqwdR'
//     }
//     var url = pesapal.queryPaymentStatusByMerchantRef(postParams);
//     console.log(url);
// })

// Define PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})