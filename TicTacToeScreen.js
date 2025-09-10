// TicTacToeScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function TicTacToeScreen() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  const checkWinner = (board) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every((cell) => cell)) return "draw";
    return null;
  };

  const handlePress = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "🌱" : "🌸"; // plant icons instead of X/O
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      if (gameResult === "draw") {
        Alert.alert("🌿 It's a Draw!", "Try again?");
      } else {
        Alert.alert("🎉 Winner!", `${gameResult} wins the game!`);
      }
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 Plant Tic Tac Toe</Text>
      <Text style={styles.turnText}>
        {winner
          ? winner === "draw"
            ? "Game Over - Draw"
            : `Winner: ${winner}`
          : `Turn: ${isXNext ? "🌱" : "🌸"}`}
      </Text>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>🔄 Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#E8F5E9" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10, color: "#2E7D32" },
  turnText: { fontSize: 18, marginBottom: 20, color: "#388E3C" },
  board: { flexDirection: "row", flexWrap: "wrap", width: 300, height: 300 },
  cell: {
    width: "33.3%",
    height: "33.3%",
    borderWidth: 2,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: { fontSize: 40 },
  resetButton: { marginTop: 30, backgroundColor: "#388E3C", padding: 12, borderRadius: 10 },
  resetText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
