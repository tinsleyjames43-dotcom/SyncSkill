import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SyncSkill</Text>
      <Text style={styles.subtitle}>
        Learn. Build. Connect.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
  },

  subtitle: {
    marginTop: 10,
    fontSize: 18,
    color: "#9CA3AF",
  },
});
