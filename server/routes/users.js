var express = require('express');
var SaveSetting = require('../database/SaveSetting')
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(req.body.setting){
    SaveSetting.SaveSetting(req.body.email, req.body.setting, (err, result) => {
      if(result){
        res.send('Setting saved')
      }
      else{
        res.send('Change setting fail')
      }
    })
  }
  else if(req.body.editProfile){
    SaveSetting.EditProfile(req.body.editProfile, (err, result) => {
      if(result){
        res.send('Changed Profile')
      }
      else{
        res.send('Change profile fail')
      }
    })
  }
});

module.exports = router;
