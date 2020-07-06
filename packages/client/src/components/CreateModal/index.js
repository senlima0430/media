import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Grid, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { Before } from './Before'
import { After } from './After'

const useStyles = makeStyles(theme => ({
  base: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    width: '60vw',
    backgroundColor: 'white',
    outline: 'none',
    borderRadius: '8px',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: '95vw',
    },
    [theme.breakpoints.up('md')]: {
      width: '85vw',
    },
    [theme.breakpoints.up('lg')]: {
      width: '75vw',
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
}))

export const CreateModal = ({ open, onClose }) => {
  const classes = useStyles()
  const [stage, setStage] = useState(false)
  const [exitable, setExitable] = useState(true)
  const [target, setTarget] = useState('')

  const toNextStage = id => {
    setTarget(id)
    setStage(true)
  }

  const handleExitable = status => {
    setExitable(status)
  }

  const selfClose = () => {
    if (exitable) {
      onClose()
      setStage(false)
    }
  }

  return (
    <Modal open={open} onClose={selfClose}>
      <div className={classes.base}>
        <Grid container spacing={0}>
          <Grid item xs />
          <Grid item xs={10}>
            {stage ? (
              <After
                target={target}
                onClose={selfClose}
                handleExitable={handleExitable}
              />
            ) : (
              <Before
                toNextStage={toNextStage}
                handleExitable={handleExitable}
              />
            )}
          </Grid>
          <Grid className={classes.closeArea} item xs>
            <IconButton
              className={classes.closeButton}
              disableRipple
              disableFocusRipple
              disabled={!exitable}
              onClick={() => selfClose()}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}

CreateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
