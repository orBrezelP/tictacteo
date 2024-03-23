import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '100px',
    lineHeight: '100px',
    cursor: 'pointer',
    fontSize: '50px',
  },
  winner: {
    marginTop: theme.spacing(2),
    color: 'red',
  },
}))

const ErasingTicTacToe = () => {
  const classes = useStyles()
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
  const [player, setPlayer] = useState('X')
  const [moveToErase, setMoveToErase] = useState({X: [], O: []})
  const [aboutToErase, setAboutToErase] = useState({row: -1, col: -1})
  const [winner, setWinner] = useState(null)

  const handleCellClick = (row, col) => {
    if (board[row][col] === null && !winner) {
      const newBoard = [...board]
      newBoard[row][col] = player
      const newMoverToErase = [...moveToErase[player]]
      newMoverToErase.push({row, col})
      const nextPlayer = player === 'X' ? 'O' : 'X'
      const nextPlayerEraseMove = [...moveToErase[nextPlayer]]
      if (nextPlayerEraseMove.length >= 3) {
        setAboutToErase({
          row: nextPlayerEraseMove[0].row,
          col: nextPlayerEraseMove[0].col,
        })
      }
      if (newMoverToErase.length > 3) {
        newBoard[newMoverToErase[0].row][newMoverToErase[0].col] = null
        setMoveToErase({...moveToErase, [player]: newMoverToErase.slice(1, 4)})
      } else {
        setMoveToErase({...moveToErase, [player]: newMoverToErase})
      }
      setBoard(newBoard)
      setPlayer(nextPlayer)
      checkWinner(newBoard)
    }
  }

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        board[Math.floor(a / 3)][a % 3] &&
        board[Math.floor(a / 3)][a % 3] === board[Math.floor(b / 3)][b % 3] &&
        board[Math.floor(a / 3)][a % 3] === board[Math.floor(c / 3)][c % 3]
      ) {
        setWinner(board[Math.floor(a / 3)][a % 3])
        return
      }
    }
  }

  const resetGame = () => {
    setBoard([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ])
    setPlayer('X')
    setMoveToErase({X: [], O: []})
    setAboutToErase({row: -1, col: -1})
    setWinner(null)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Grid item xs={4} key={`${rowIndex}-${colIndex}`}>
              <Paper
                className={classes.paper}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                <Box
                  color={
                    aboutToErase.row === rowIndex &&
                    aboutToErase.col === colIndex
                      ? 'red'
                      : null
                  }
                >
                  {cell}
                </Box>
              </Paper>
            </Grid>
          )),
        )}
      </Grid>
      <Typography variant="h5">Crrent player: {player}</Typography>
      {winner && (
        <Typography variant="h5" className={classes.winner}>
          {winner} wins!
        </Typography>
      )}

      {winner && <button onClick={resetGame}>Reset Game</button>}
    </div>
  )
}

export default ErasingTicTacToe

