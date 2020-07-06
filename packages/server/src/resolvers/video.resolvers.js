import path from 'path'
import fs from 'fs-extra'
import { v4 as uuidv4 } from 'uuid'
import { ApolloError, UserInputError } from 'apollo-server-express'

import { storeFS, thumbnailFS } from '../utils'

export default {
  Query: {
    video: async (_parents, { id }, { models }) =>
      await models.video.findOne({
        where: {
          id,
        },
      }),
    videos: async (_parents, _args, { models }) =>
      await models.video.findAll(),
  },
  Mutation: {
    createVideo: async (_parents, { file }, { models }) => {
      try {
        const { filename, createReadStream } = await file
        const stream = createReadStream()

        const result = await storeFS({ stream, filename }).then(
          async ({ filePath, fileFullPath, folderName, folderPath }) => {
            return await thumbnailFS(fileFullPath, folderPath).then(
              thumbnailPath => {
                return models.video.create({
                  id: uuidv4(),
                  title: filename.split('.')[0],
                  filePath,
                  thumbnailPath: `${folderName}/${thumbnailPath}`,
                })
              }
            )
          }
        )

        return result
      } catch {
        fs.removeSync(folderPath)
        return new ApolloError('Failed to create video')
      }
    },
    updateVideo: async (_parents, { id, title, description }, { models }) => {
      try {
        const target = await models.video.findOne({ where: { id } })
        if (!target) throw new UserInputError('Video no exist')

        await target.update({
          ...target,
          title: title || target.title,
          description: description || target.description,
        })

        return true
      } catch (err) {
        console.error(err)
        return new ApolloError('Failed to update video')
      }
    },
    deleteVideo: async (_parents, { id }, { models }) => {
      try {
        const target = await models.video.findOne({ where: { id } })
        if (!target) throw new UserInputError('Video no exist')

        const targetFolderPath = path.resolve(
          __dirname,
          `../../media/${target.filePath.split('/')[0]}`
        )
        fs.removeSync(targetFolderPath)

        await target.destroy()

        return true
      } catch (err) {
        console.error(err)
        return new ApolloError('Failed to delete video')
      }
    },
  },
}
