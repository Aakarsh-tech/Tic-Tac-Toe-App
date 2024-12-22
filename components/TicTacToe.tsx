import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

type Player = 'X' | 'O' | null;

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); 
  const [gameOver, setGameOver] = useState(false); 

  const checkWinner = (board: Player[]): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
      [0, 4, 8], [2, 4, 6],            // diagonal
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; 
      }
    }
    return null;
  };

  const handlePress = (index: number) => {
    if (gameOver || board[index]) return; 

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setGameOver(true);
      Alert.alert(`${winner} wins!`, 'Game Over', [
        { text: 'OK', onPress: resetGame },
      ]);
    } else if (!newBoard.includes(null)) {
      setGameOver(true);
      Alert.alert('It\'s a tie!', 'Game Over', [
        { text: 'OK', onPress: resetGame },
      ]);
    } else {
      setIsXNext(!isXNext); 
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null)); 
    setIsXNext(true); 
    setGameOver(false); 
  };

  const renderSquare = (index: number) => (
    <TouchableOpacity
      style={styles.square}
      onPress={() => handlePress(index)}
    >
      <Text style={styles.squareText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {board.map((_, index) => (
          <View key={index} style={styles.row}>
            {renderSquare(index)}
          </View>
        ))}
      </View>
      <Text style={styles.turn}>
        {gameOver ? 'Game Over!' : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </Text>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#f0f0f0',
  },
  squareText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  turn: {
    fontSize: 20,
    marginBottom: 20,
  },
  resetButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TicTacToe;
