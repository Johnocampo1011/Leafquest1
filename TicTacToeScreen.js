// TicTacToeScreen.js (Player vs Player version with LeafQuest UI)
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function TicTacToeScreen({ navigation }) {
  const [board, setBoard] = useState(Array(9).fill(null)); // 'X' = Player 1, 'O' = Player 2
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const icons = { X: "🌱", O: "🌸" };

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Animate screen entrance
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  // Reset modal and winner when leaving the screen
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setShowModal(false);
        setWinner(null);
        setBoard(Array(9).fill(null));
        setCurrentPlayer("X");
      };
    }, [])
  );

  const checkWinner = (b) => {
    for (let combo of winningCombinations) {
      const [a, bb, c] = combo;
      if (b[a] && b[a] === b[bb] && b[a] === b[c]) {
        return b[a];
      }
    }
    if (b.every((cell) => cell)) return "draw";
    return null;
  };

  const handlePress = (index) => {
    if (board[index] || winner) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    const gameResult = checkWinner(updatedBoard);
    if (gameResult) {
      setWinner(gameResult);
      setShowModal(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setShowModal(false);
    setCurrentPlayer("X");
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>🌿 Tic Tac Toe (PVP)</Text>

      <Text style={styles.turnText}>
        {winner
          ? winner === "draw"
            ? "Game Over — Draw"
            : `Winner: ${icons[winner]}`
          : `Turn: ${currentPlayer === "X" ? "Player 1 🌱" : "Player 2 🌸"}`}
      </Text>

      <View style={styles.board}>
        {board.map((cell, i) => (
          <TouchableOpacity
            key={i}
            style={styles.cell}
            onPress={() => handlePress(i)}
            activeOpacity={0.8}
            disabled={!!board[i] || !!winner}
          >
            <Text style={styles.cellText}>{cell ? icons[cell] : ""}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 18 }}>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Ionicons name="refresh" size={18} color="#fff" />
          <Text style={styles.resetText}>Restart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: "#81C784" }]}
          onPress={() => {
            setShowModal(false);
            navigation.navigate("MiniGamesScreen");
          }}
        >
          <Ionicons name="arrow-back" size={18} color="#fff" />
          <Text style={styles.resetText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Result Modal */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {winner === "X"
                ? "🎉 Player 1 Wins!"
                : winner === "O"
                ? "🌸 Player 2 Wins!"
                : "🌿 It's a Draw!"}
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={resetGame}
            >
              <Text style={styles.modalButtonText}>Play Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#81C784" }]}
              onPress={() => {
                setShowModal(false);
                navigation.navigate("MiniGamesScreen");
              }}
            >
              <Text style={styles.modalButtonText}>Back to Games</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

/* LeafQuest UI Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#2E7D32",
  },
  turnText: {
    fontSize: 16,
    marginBottom: 12,
    color: "#388E3C",
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    height: 300,
  },
  cell: {
    width: "33.3333%",
    height: "33.3333%",
    borderWidth: 2,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontSize: 42,
  },
  resetButton: {
    marginTop: 10,
    backgroundColor: "#388E3C",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  resetText: {
    color: "#fff",
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 22,
    borderRadius: 16,
    width: 280,
    alignItems: "center",
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 6,
  },
  modalButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 12,
    marginTop: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
