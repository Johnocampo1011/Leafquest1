import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
} from "react-native";
import { getAuth } from "firebase/auth";
import { addLeafPointsForUser } from "./userData";

export default function TicTacToeAIScreen({ navigation }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const winningCombos = [
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

  const checkWinner = (b) => {
    for (let [a, bb, c] of winningCombos) {
      if (b[a] && b[a] === b[bb] && b[a] === b[c]) return b[a];
    }
    if (b.every((cell) => cell)) return "draw";
    return null;
  };

  const handlePress = (i) => {
    if (!isPlayerTurn || board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = "🌱";
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const result = checkWinner(newBoard);
    if (result) return showEndModal(result);

    setTimeout(() => aiMove(newBoard), 800);
  };

  const aiMove = (b) => {
    const empty = b.map((v, i) => (v ? null : i)).filter((v) => v !== null);
    if (empty.length === 0) return;

    const tryMove = (sym) => {
      for (let [a, bb, c] of winningCombos) {
        if (b[a] === sym && b[bb] === sym && !b[c]) return c;
        if (b[a] === sym && b[c] === sym && !b[bb]) return bb;
        if (b[bb] === sym && b[c] === sym && !b[a]) return a;
      }
      return null;
    };

    const aiIndex =
      tryMove("🌸") ||
      tryMove("🌱") ||
      empty[Math.floor(Math.random() * empty.length)];
    b[aiIndex] = "🌸";
    setBoard([...b]);

    const result = checkWinner(b);
    if (result) showEndModal(result);
    else setIsPlayerTurn(true);
  };

  const showEndModal = async (result) => {
    setWinner(result);

    if (result === "🌱") {
      // ✅ player won — give +5 leafpoints
      try {
        await addLeafPointsForUser(5);
        setModalMessage("🎉 You Won! +5 LeafPoints 🌿");
      } catch (err) {
        console.error("Error adding LeafPoints:", err);
        setModalMessage("🎉 You Won! (Reward not saved due to network)");
      }
    } else if (result === "🌸") {
      setModalMessage("💀 The AI Won this round!");
    } else {
      setModalMessage("🌿 It's a draw! Nobody wins.");
    }

    setModalVisible(true);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setModalVisible(false);
  };

  const goBackToMenu = () => {
    setModalVisible(false);
    navigation.navigate("MiniGames Menu");
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>🤖 Tic Tac Toe (AI Mode)</Text>
      <Text style={styles.turnText}>
        {winner
          ? winner === "draw"
            ? "It’s a Draw!"
            : winner === "🌱"
            ? "You Won!"
            : "AI Wins!"
          : isPlayerTurn
          ? "Your Turn 🌱"
          : "AI Thinking... 🌸"}
      </Text>

      <View style={styles.board}>
        {board.map((cell, i) => (
          <TouchableOpacity
            key={i}
            style={styles.cell}
            onPress={() => handlePress(i)}
            activeOpacity={0.7}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={goBackToMenu}>
        <Text style={styles.backText}>← Back to Mini-Games</Text>
      </TouchableOpacity>

      {/* 🌿 Custom modal popup (works on web & mobile) */}
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
