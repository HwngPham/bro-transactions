const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
app.use('*', (req, res, next) => {
  console.log('first middleware')
  res.redirect('http://localhost:3000/foo')
  next()
})

app.use(
  '*',
  createProxyMiddleware({
    target: 'http://localhost:3000/',
    changeOrigin: true,
    pathRewrite: function (path, req) {
      console.log(path)
      return path == '/' ? '/auth/login' : path
    },
  })
)

app.listen(5000, () => console.log('...'))
