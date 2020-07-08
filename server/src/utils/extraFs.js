import fs from 'fs'
import path from 'path'
import cryptoRandomString from 'crypto-random-string'
import ThumbnailGenerator from 'video-thumbnail-generator'

const mediaFolderPath = path.resolve(__dirname, '../../media/')

export const storeFS = ({ stream, filename }) => {
  return new Promise((resolve, reject) => {
    const folderName = cryptoRandomString({ length: 20 })
    const fileName =
      cryptoRandomString({ length: 10 }) + '.' + filename.split('.')[1]

    const folderPath = path.resolve(mediaFolderPath, folderName)
    const filePath = path.resolve(folderPath, fileName)
    const oldFilePath = path.resolve(folderPath, filename)

    fs.mkdirSync(folderPath)

    stream
      .on('error', error => {
        if (stream.truncated) fs.rmdirSync(folderPath, { recursive: true })
        reject(error)
      })
      .pipe(fs.createWriteStream(oldFilePath))
      .on('error', error => reject(error))
      .on('finish', () => {
        fs.renameSync(oldFilePath, filePath)
        resolve({
          filePath: `${folderName}/${fileName}`,
          fileFullPath: filePath,
          folderName,
          folderPath,
        })
      })
  })
}

export const thumbnailFS = (fileFullPath, folderPath) => {
  return new Promise((resolve, reject) => {
    const tg = new ThumbnailGenerator({
      sourcePath: fileFullPath,
      thumbnailPath: folderPath,
    })

    tg.generateOneByPercent(50, { size: '720x404' })
      .then(result => {
        const realThumbnailName = `${cryptoRandomString({ length: 10 })}.png`
        fs.renameSync(
          path.resolve(folderPath, result),
          path.resolve(folderPath, realThumbnailName)
        )
        resolve(realThumbnailName)
      })
      .catch(err => {
        reject(err)
      })
  })
}
