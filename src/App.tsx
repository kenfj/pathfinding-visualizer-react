import { makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import GithubCorner from 'react-github-corner';
import PathfindingVisualizer from './components/PathfindingVisualizer';
import useWindowSize from './hooks/useWindowSize';

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    maxWidth: 1000,
    margin: "30px auto",
    padding: `20px ${theme.spacing(5)}px`,
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
  const url = 'https://github.com/kenfj/pathfinding-visualizer-react'

  const { width, height } = useWindowSize()
  const nodeSize = 20
  const [nRows, setnRows] = useState(0);
  const [nCols, setnCols] = useState(0);

  useEffect(() => {
    if (width === undefined || height === undefined) {
      console.log('Device undefined')
    } else if (width >= 700) {
      console.log('Device PC')
      setnRows(Math.trunc(height / nodeSize * 0.6))
      setnCols(Math.min(Math.trunc(width / nodeSize * 0.7), 50))
    } else {
      console.log('Device SmartPhone')
      setnRows(Math.trunc(height / nodeSize * 0.7))
      setnCols(Math.trunc(width / nodeSize * 0.9))
    }
  }, [width, height])

  console.log(`[w: ${width}, h: ${height}], [rows: ${nRows}, cols: ${nCols}]`)

  return (
    <Paper elevation={5} className={classes.paper}>
      <GithubCorner href={url} />
      <h1>Pathfinding Visualizer</h1>
      <Typography variant="body1" gutterBottom>
        Click to create <span className={classes.wall}>WALL</span><br />
        Drag <span className={classes.start}>START</span> and <span className={classes.end}>END</span>
      </Typography>
      {/* need key to force re-render https://stackoverflow.com/questions/38892672 */}
      <PathfindingVisualizer key={nRows} nRows={nRows} nCols={nCols} />
      <Typography variant="caption" display="block" gutterBottom>
        source code: <a href={url}>{url}</a>
      </Typography>
    </Paper >
  );
}

export default App;
