import { makeStyles, Paper } from '@material-ui/core';
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
}));

function App() {
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.paper}>
      <h1>Pathfinding Visualizer</h1>
      <PathfindingVisualizer nRows={5} nCols={10} />
    </Paper>
  );
}

export default App;
