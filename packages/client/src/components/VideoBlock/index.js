import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import { useMutation } from '@apollo/react-hooks'
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import './VideoBlock.css'
import { DeleteModal } from '../DeleteModal'
import UPDATE_VIDEO from '../../graphql/UpdateVideo.graphql'
import DELETE_VIDEO from '../../graphql/DeleteVideo.graphql'

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
  fileAction: {
    justifyContent: 'flex-end',
  },
  titleInput: {
    marginBottom: theme.spacing(2),
  },
}))

export const VideoBlock = ({
  id,
  title,
  description,
  filePath,
  thumbnailPath,
  refetch,
}) => {
  const classes = useStyles()
  const [openDelete, setDeleteOpen] = useState(false)
  const [isEditing, setEditing] = useState(false)
  const [infoForm, setForm] = useState({
    title,
    description: description || 'no description',
  })

  const [updateVideo] = useMutation(UPDATE_VIDEO, {
    variables: {
      id,
      title: infoForm.title,
      description: infoForm.description,
    },
    onCompleted: () => refetch(),
  })
  const [deleteVideo] = useMutation(DELETE_VIDEO, {
    onCompleted: () => refetch(),
  })

  const handleDeleteOpen = () => setDeleteOpen(true)
  const handleDeleteClose = () => setDeleteOpen(false)

  const handleEditingOpen = () => setEditing(true)

  const handleUpdateSubmit = () => {
    updateVideo()
    setEditing(false)
  }

  const handleFormChange = (field, value) => {
    setForm({
      ...infoForm,
      [field]: value,
    })
  }

  return (
    <>
      <Card className={classes.card} square elevation={0}>
        <div className="video-block__video">
          <ReactPlayer
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0 }}
            url={`http://127.0.0.1:8080/video/${filePath}`}
            light={`http://127.0.0.1:8080/thumbnail/${thumbnailPath}`}
            controls
          />
        </div>

        <div className={classes.fileInfo}>
          <CardContent className={classes.cardContent}>
            {isEditing ? (
              <>
                <TextField
                  className={classes.titleInput}
                  fullWidth
                  label="Title"
                  variant="outlined"
                  value={infoForm.title}
                  onChange={e =>
                    handleFormChange('title', e.currentTarget.value)
                  }
                />
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  value={infoForm.description}
                  onChange={e =>
                    handleFormChange('description', e.currentTarget.value)
                  }
                />
              </>
            ) : (
              <>
                <Typography
                  component="h4"
                  variant="h5"
                  color="textPrimary"
                  gutterBottom
                >
                  {title}
                </Typography>
                <Typography variant="subtitle1">{description}</Typography>
              </>
            )}
          </CardContent>

          <CardActions className={classes.fileAction}>
            {isEditing ? (
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => handleUpdateSubmit()}
              >
                Submit
              </Button>
            ) : (
              <Button
                size="small"
                color="primary"
                variant="contained"
                onClick={() => handleEditingOpen()}
              >
                Edit
              </Button>
            )}
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={() => handleDeleteOpen()}
            >
              Delete
            </Button>
          </CardActions>
        </div>
      </Card>
      {openDelete && (
        <DeleteModal
          open={openDelete}
          onClose={() => handleDeleteClose()}
          handleDelete={() => deleteVideo({ variables: { id } })}
        />
      )}
    </>
  )
}

VideoBlock.defaultProps = {
  description: 'no description',
}

VideoBlock.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  filePath: PropTypes.string.isRequired,
  thumbnailPath: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
}
