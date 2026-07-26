import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../styles/theme";

export default function Splash({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SyncSkill</Text>
      <Text style={styles.tagline}>Build. Learn. Connect.</Text>
      <Text style={styles.loading}>Creating your skill network...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    color: theme.colors.text,
    fontSize: 48,
    fontWeight: "bold",
  },
  tagline: {
    color: theme.colors.primary,
    fontSize: 18,
    marginTop: 12,
    fontWeight: "600",
  },
  loading: {
    color: theme.colors.textMuted,
    marginTop: 40,
  },
});
