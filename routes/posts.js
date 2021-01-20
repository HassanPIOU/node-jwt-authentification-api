const router = require('express').Router();
const verified = require('../helpers/jwtTokenVerify')


router.get('/',verified, (req,res) => {
  res.json({
      posts : {
          title : "My first  Post",
          description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad asperiores assumenda consequuntur deserunt dolores est et expedita libero modi nihil perferendis provident quia quidem ratione sit tempora, ullam ut vero.\n'
      }
  })
})


module.exports = router;