import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import PathfindingVisualizer from './components/PathfindingVisualizer';

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    maxWidth: 700,
    margin: "50px auto",
    padding: theme.spacing(5),
    textAlign: 'center',
  },
  start: {
    color: 'green',
    fontWeight: 'bold',
  },
  end: {
    color: 'red',
    fontWeight: 'bold',
  },
  wall: {
    color: 'black',
    fontWeight: 'bold',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.paper}>
      <h1>Pathfinding Visualizer</h1>
      <Typography variant="body1" gutterBottom>
        Click to create <span className={classes.wall}>wall</span> node<br />
        Drag <span className={classes.start}>start</span> and <span className={classes.end}>end</span> node
      </Typography>
      <PathfindingVisualizer nRows={5} nCols={10} />
    </Paper >
  );
}

export default App;
