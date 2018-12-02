var express = require('express')
var app=express()

app.use(express.static('./build'))

app.listen(9891, function (err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('Listening at http://localhost:' + 9891 + '\n')
  })
