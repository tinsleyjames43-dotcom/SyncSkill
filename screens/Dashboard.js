import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome to SyncSkill 🚀</Text>
      <Text style={styles.subtitle}>Discover skills, creators and projects.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔥 Trending Builds</Text>
        <Text>Smart robot project</Text>
        <Text>Custom PC build</Text>
        <Text>Game development showcase</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🤝 Skill Matches</Text>
        <Text>Find people who match your skills.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🚀 Featured Projects</Text>
        <Text>Join teams and build something amazing.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 40,
  },
  subtitle: {
    color: "#9CA3AF",
    marginTop: 10,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#1F2937",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  cardTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
