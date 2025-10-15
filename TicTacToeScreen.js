import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
} from "react-native";

export default function TicTacToeScreen({ navigation }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

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
    newBoard[index] = isXNext ? "🌱" : "🌸";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      showEndModal(result);
      return;
    }

    setIsXNext(!isXNext);
  };

  const showEndModal = (result) => {
    setWinner(result);

    if (result === "draw") setModalMessage("🌿 It’s a draw! Nobody wins.");
    else if (result === "🌱")
      setModalMessage("🎉 Player 1 (🌱) Wins this round!");
    else setModalMessage("🌸 Player 2 (🌸) Wins this round!");

    setModalVisible(true);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setModalVisible(false);
  };

  const goBackToMenu = () => {
    setModalVisible(false);
    navigation.navigate("MiniGames Menu");
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>🌿 Tic Tac Toe (PVP)</Text>
      <Text style={styles.turnText}>
        {winner
          ? winner === "draw"
            ? "It’s a Draw!"
            : `Winner: ${winner}`
          : `Turn: ${isXNext ? "🌱 Player 1" : "🌸 Player 2"}`}
      </Text>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
            activeOpacity={0.7}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={goBackToMenu}>
        <Text style={styles.backText}>← Back to Mini-Games</Text>
      </TouchableOpacity>

      {/* 🌿 Game Result Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Game Over</Text>
            <Text style={styles.modalMessage}>{modalMessage}</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#43A047" }]}
                onPress={resetGame}
              >
                <Text style={styles.modalButtonText}>🔁 Play Again</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#2E7D32" }]}
                onPress={goBackToMenu}
              >
                <Text style={styles.modalButtonText}>🏠 Main Menu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { fontSize: 26, fontWeight: "bold", color: "#2E7D32", marginBottom: 10 },
  turnText: { fontSize: 18, color: "#388E3C", marginBottom: 20 },
  board: { flexDirection: "row", flexWrap: "wrap", width: 300, height: 300 },
  cell: {
    width: "33.3%",
    height: "33.3%",
    borderWidth: 2,
    borderColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: { fontSize: 38 },
  backButton: {
    marginTop: 40,
    backgroundColor: "#2E7D32",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 3,
  },
  backText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  // Modal styling
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    alignItems: "center",
    elevation: 8,
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", color: "#1B5E20", marginBottom: 10 },
  modalMessage: { fontSize: 16, color: "#333", textAlign: "center", marginBottom: 20 },
  modalActions: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
