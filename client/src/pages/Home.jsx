import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { Grid, Container, Typography, Button } from '@material-ui/core'

import { CreateModal, VideoList } from '../components'

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}))

export const Home = () => {
  const classes = useStyles()
  const [createOpen, setCreateOpen] = useState(false)

  const handleCreateOpen = () => setCreateOpen(true)
  const handleCreateClose = () => setCreateOpen(false)

  return (
    <>
      <header className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Media
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            GraphQL practice
          </Typography>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            onClick={() => handleCreateOpen()}
          >
            Upload
          </Button>
        </Container>
      </header>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <VideoList />
          </Grid>
        </Container>
      </main>
      <CreateModal open={createOpen} onClose={handleCreateClose} />
    </>
  )
}
