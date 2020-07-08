import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Grid, IconButton, Typography, Button } from '@material-ui/core'

import deleteImage from '../../assets/deleteImage.png'

const useStyles = makeStyles(theme => ({
  base: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    width: '45vw',
    backgroundColor: 'white',
    outline: 'none',
    borderRadius: '8px',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '85vw',
    },
    [theme.breakpoints.up('md')]: {
      width: '65vw',
    },
    [theme.breakpoints.up('lg')]: {
      width: '55vw',
    },
  },
  closeArea: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'left',
  },
  closeButton: {
    color: '#000',
    padding: 0,
    transform: 'translateX(-100%)',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:disabled': {
      color: '#999999',
    },
  },
  featureArea: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteImage: {
    width: '40%',
    height: 'auto',
    margin: '0 30%',
    [theme.breakpoints.down('sm')]: {
      width: '60%',
      margin: '0 20%',
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',
      margin: '0 25%',
    },
  },
}))

export const DeleteModal = ({ open, onClose, handleDelete }) => {
  const classes = useStyles()

  const handleModalDelete = () => {
    handleDelete()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.base}>
        <Grid container spacing={0}>
          <Grid item xs />
          <Grid item xs={10}>
            <Typography
              component="h4"
              variant="h5"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Delete video?
            </Typography>

            <img
              className={classes.deleteImage}
              src={deleteImage}
              alt="delete"
            />

            <div className={classes.featureArea}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleModalDelete()}
              >
                Continue
              </Button>
            </div>
          </Grid>
          <Grid className={classes.closeArea} item xs>
            <IconButton
              className={classes.closeButton}
              disableRipple
              disableFocusRipple
              onClick={() => onClose()}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}
