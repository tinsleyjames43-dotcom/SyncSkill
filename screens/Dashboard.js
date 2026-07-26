import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.logo}>SyncSkill</Text>
      <Text style={styles.title}>Build. Learn. Connect. 🚀</Text>
      <Text style={styles.subtitle}>Discover creators, skills and projects matched to you.</Text>

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Your Skill Journey</Text>
        <Text style={styles.heroText}>Level up your skills and find people to build amazing things with.</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Explore Skills</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.section}>Trending Now 🔥</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI Robot Assistant</Text>
        <Text style={styles.cardText}>By Alex • Electronics + Coding</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Game Development</Text>
        <Text style={styles.cardText}>Build projects with other creators.</Text>
      </View>

      <Text style={styles.section}>Skill Matches 🤝</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>People near your level</Text>
        <Text style={styles.cardText}>Find learners and mentors who match your interests.</Text>
      </View>

      <Text style={styles.section}>Featured Projects 🚀</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Join a team</Text>
        <Text style={styles.cardText}>Collaborate and turn ideas into real products.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1220", padding: 20 },
  logo: { color: "white", fontSize: 24, fontWeight: "bold", marginTop: 35 },
  title: { color: "white", fontSize: 32, fontWeight: "bold", marginTop: 15 },
  subtitle: { color: "#94A3B8", fontSize: 16, marginTop: 10 },
  hero: { backgroundColor: "#1E293B", padding: 22, borderRadius: 20, marginTop: 25 },
  heroTitle: { color: "white", fontSize: 22, fontWeight: "bold" },
  heroText: { color: "#CBD5E1", marginTop: 10 },
  button: { backgroundColor: "#3B82F6", padding: 12, borderRadius: 12, marginTop: 18, alignItems: "center" },
  buttonText: { color: "white", fontWeight: "bold" },
  section: { color: "white", fontSize: 22, fontWeight: "bold", marginTop: 28 },
  card: { backgroundColor: "#172033", padding: 18, borderRadius: 16, marginTop: 12 },
  cardTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  cardText: { color: "#94A3B8", marginTop: 8 },
});