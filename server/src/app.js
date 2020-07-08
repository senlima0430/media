import fs from 'fs'
import path from 'path'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'

export const app = express()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/thumbnail', express.static(path.resolve(__dirname, '../media')))

app.get('/probe', (req, res) => {
  res.status(200).json({ message: 'exist' })
})
app.get('/video/:folderName/:fileName', (req, res) => {
  const { folderName, fileName } = req.params
  const filePath = path.resolve(__dirname, '../media/', folderName, fileName)

  fs.stat(filePath, (err, stat) => {
    if (err !== null && err.code === 'ENOENT') res.sendStatus(404)

    const fileSize = stat.size
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    })
    fs.createReadStream(filePath).pipe(res)
  })
})
