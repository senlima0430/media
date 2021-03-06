import React, { Fragment } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery } from '@apollo/react-hooks'

import { VideoBlock, VideoBlockSkeleton } from '../VideoBlock'
import VIDEOS from '../../graphql/Videos.graphql'
import emptyImage from '../../assets/emptyImage.png'

const useStyles = makeStyles(theme => ({
  card: {
    height: '202px',
    display: 'flex',
    background: 'transparent',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    },
  },
  cardContent: {
    flex: 1,
  },
  fileInfo: {
    marginLeft: '1em',
    flex: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  emptyArea: {
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '100%',
    textAlign: 'center',
  },
  emptyImage: {
    width: '40%',
    height: 'auto',
    marginBottom: theme.spacing(2),
  },
  emptyText: {
    width: '100%',
  },
}))

export const VideoList = () => {
  const classes = useStyles()

  const { loading, data, refetch } = useQuery(VIDEOS)

  if (loading)
    return (
      <Grid item xs={12}>
        <VideoBlockSkeleton />
      </Grid>
    )

  if (data && data.videos.length === 0)
    return (
      <Grid className={classes.emptyArea} item xs={12}>
        <img className={classes.emptyImage} src={emptyImage} alt="No result" />
        <Typography
          className={classes.emptyText}
          display="block"
          variant="subtitle1"
          align="center"
        >
          Not found any videos
        </Typography>
      </Grid>
    )

  return data.videos.map(video => (
    <Fragment key={video.id}>
      <Grid item xs={12}>
        <VideoBlock
          id={video.id}
          title={video.title}
          description={video.description}
          filePath={video.filePath}
          thumbnailPath={video.thumbnailPath}
          refetch={() => refetch()}
        />
      </Grid>
    </Fragment>
  ))
}
