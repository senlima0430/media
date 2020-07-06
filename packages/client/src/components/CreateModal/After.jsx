import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useQuery, useMutation } from '@apollo/react-hooks'

import './CreateModal.css'
import VIDEO from '../../graphql/Video.graphql'
import UPDATE_VIDEO from '../../graphql/UpdateVideo.graphql'

const resetTimeout = (id, newID) => {
  clearTimeout(id)
  return newID
}

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    },
  },
  textArea: {
    flex: 'auto',
    width: '100%',
    height: '100%',
    marginRight: '1em',
    [theme.breakpoints.down('xs')]: {
      order: 2,
      marginRight: '0',
    },
  },
  titleInput: {
    marginBottom: theme.spacing(2),
  },
}))

export const After = ({ target, onClose, handleExitable }) => {
  const classes = useStyles()
  const playerRef = useRef()
  const [saved, setSaved] = useState(false)
  const [timeOut, setTimeOut] = useState(null)
  const [infoForm, setForm] = useState({
    title: '',
    description: '',
  })

  useEffect(() => {
    handleExitable(!saved)
  }, [saved, handleExitable])

  const { loading, data, refetch } = useQuery(VIDEO, {
    variables: { id: target },
    onCompleted: res => {
      setForm({
        title: res.video.title,
        description: res.video.description || '',
      })
    },
  })
  const [updateVideo] = useMutation(UPDATE_VIDEO, {
    variables: {
      id: target,
      title: infoForm.title,
      description: infoForm.description,
    },
    onCompleted: () => {
      setSaved(true)
    },
  })

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [])

  const saveValue = () => {
    updateVideo()
    setTimeout(() => {
      setSaved(false)
      refetch()
    }, 1000)
  }

  const editValue = (field, value) => {
    setTimeOut(resetTimeout(timeOut, setTimeout(saveValue, 400)))
    setForm({
      ...infoForm,
      [field]: value,
    })
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.textArea}>
          <TextField
            className={classes.titleInput}
            fullWidth
            label="Title"
            variant="outlined"
            disabled={loading}
            value={infoForm.title}
            onChange={e => editValue('title', e.currentTarget.value)}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="description"
            variant="outlined"
            value={infoForm.description}
            onChange={e => editValue('description', e.currentTarget.value)}
          />
        </div>
        <div className="create-modal__video_area">
          {data && (
            <ReactPlayer
              ref={playerRef}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: 0 }}
              url={`http://127.0.0.1:8080/video/${data.video.filePath}`}
              light={`http://127.0.0.1:8080/thumbnail/${data.video.thumbnailPath}`}
              controls
            />
          )}
        </div>
      </div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => onClose()}
      >
        Continue
      </Button>
    </>
  )
}

After.propTypes = {
  target: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  handleExitable: PropTypes.func.isRequired,
}
