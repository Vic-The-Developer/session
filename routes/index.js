var express = require('express');
var router = express.Router();

router.post('/', (req, res)=>{
    console.log(req.body.name);

    req.session.username = req.body.name;

    console.log('Username', req.session.username);
    res.redirect('/pages/session')
})

router.get('/session', (req, res)=>{

    //does not display anything
    console.log(req.session.username);
})


module.exports = router;