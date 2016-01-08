const express = require('express')
const networks = require('./networks')
const axios = require('axios')
const app = express()
const urls = require('./urls')
const dbg = require('debug')('app')

app.use('/networks', networks)

app.get('/', (req, res) => {
  dbg('query=%j', req.query)

  const {gremlin} = req.query
  if (gremlin) {
    axios.get(urls.gremlin, {
      params: {
        gremlin
      }
    })
    .then((response) => {
      dbg('response=%j', response)
      res.json(response.data.result)
    })
    .catch((response) => {
      dbg('error=%j', response)
      res.json(response)
    })
  }
  else {
    res.json({message: 'gremlin param required'})
  }
})

const server = app.listen(3001, () => {
  const host = server.address().address
  const port = server.address().port

  dbg('listening at http://%s:%s', host, port)
})
