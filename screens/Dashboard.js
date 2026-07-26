import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import theme from "../styles/theme";

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  logo: {
    color: theme.colors.text,
    fontSize: theme.typography.heading,
    fontWeight: "bold",
    marginTop: theme.spacing.lg,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.title,
    fontWeight: "bold",
    marginTop: theme.spacing.sm,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.body,
    marginTop: theme.spacing.sm,
  },
  hero: {
    backgroundColor: theme.colors.surfaceLight,
    padding: theme.spacing.md,
    borderRadius: theme.radius.large,
    marginTop: theme.spacing.lg,
  },
  heroTitle: { color: theme.colors.text, fontSize: theme.typography.heading, fontWeight: "bold" },
  heroText: { color: theme.colors.textMuted, marginTop: theme.spacing.sm },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.sm,
    borderRadius: theme.radius.medium,
    marginTop: theme.spacing.md,
    alignItems: "center",
  },
  buttonText: { color: theme.colors.text, fontWeight: "bold" },
  section: {
    color: theme.colors.text,
    fontSize: theme.typography.heading,
    fontWeight: "bold",
    marginTop: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.radius.medium,
    marginTop: theme.spacing.sm,
  },
  cardTitle: { color: theme.colors.text, fontSize: theme.typography.body, fontWeight: "bold" },
  cardText: { color: theme.colors.textMuted, marginTop: theme.spacing.xs },
});
