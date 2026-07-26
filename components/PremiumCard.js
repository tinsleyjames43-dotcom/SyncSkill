import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PremiumCard({ title, description, icon }) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#172033",
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },
  description: {
    color: "#94A3B8",
    marginTop: 8,
    fontSize: 15,
  },
});
