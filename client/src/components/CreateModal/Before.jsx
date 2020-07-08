import React, { createRef } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

import uploadImage from '../../assets/uploadImage.png'
import CREATE_VIDEO from '../../graphql/CreateVideo.graphql'

const useStyles = makeStyles(theme => ({
  uploadButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  uploadImage: {
    margin: '0 30%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    width: '40%',
    height: 'auto',
  },
}))

export const Before = ({ toNextStage, handleExitable }) => {
  const classes = useStyles()
  const uploadRef = createRef()

  const apolloClient = useApolloClient()
  const [createVideo, { loading }] = useMutation(CREATE_VIDEO, {
    onCompleted: res => {
      apolloClient.resetStore()
      toNextStage(res.createVideo.id)
      handleExitable(true)
    },
  })

  const focusUpload = () => uploadRef.current.click()
  const handleUpload = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (validity.valid) createVideo({ variables: { file } })
    handleExitable(false)
  }

  return (
    <>
      <Typography
        component="h4"
        variant="h5"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Create video
      </Typography>

      <img className={classes.uploadImage} src={uploadImage} alt="upload" />

      <div className={classes.uploadButton}>
        <Button
          color="primary"
          variant="contained"
          disabled={loading}
          onClick={focusUpload}
        >
          {loading ? 'Loading' : 'Upload'}
        </Button>
      </div>

      <input
        ref={uploadRef}
        style={{ display: 'none' }}
        type="file"
        accept=".mp4"
        onChange={handleUpload}
      />
    </>
  )
}

Before.propTypes = {
  toNextStage: PropTypes.func.isRequired,
  handleExitable: PropTypes.func.isRequired,
}
