import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

export default function PopupExample() {
  const [visible, setVisible] = useState(true);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      animationIn="zoomIn"
      animationOut="zoomOut"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Exclusive for newcomers</Text>

          <View style={styles.voucher}>
            <Text style={styles.amount}>₦1,040.00 OFF</Text>
            <Text>Newcomer Voucher</Text>
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>GET</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.close}
            onPress={() => setVisible(false)}
          >
            <Text>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "85%",
    backgroundColor: "#ff2d55",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  voucher: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
    alignItems: "center",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff2d55",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: "#ff2d55",
    fontWeight: "bold",
  },
  close: {
    position: "absolute",
    bottom: -50,
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
