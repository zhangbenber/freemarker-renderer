const express = require('express')
const Freemarker = require('freemarker.js')
const bodyParser = require('body-parser')
const multipart = require('connect-multiparty')

let app = express()
let multipartMiddleware = multipart()

let render = (root, tpl, data) => {	
	let freemarker = new Freemarker({
		viewRoot: root
	})
	
	return new Promise((resolve, reject) => {
		freemarker.render(tpl, data, (err, html, output) => {
			resolve({ err, html, output })
		})
	})
}

app.post('/render', multipartMiddleware, (req, res) => {
	console.log(req.body)
	let body = req.body
	console.log(body.data)
	console.log(JSON.parse(body.data))
	render(body.root, body.file, JSON.parse(body.data)).then(data => {
		res.json(data)
	})
})

app.use(express.static('static'))

let server = app.listen(6068)