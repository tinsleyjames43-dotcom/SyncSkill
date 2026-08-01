import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, FlatList, 
  SafeAreaView, Modal, TextInput, Alert, ScrollView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Main App Navigation State
  const [activeTab, setActiveTab] = useState('feed');

  // User Profile State
  const [myProfile, setMyProfile] = useState({
    name: 'Alex Rivers',
    bio: 'Guitar player for 5 years. Looking to learn React Native coding!',
    teaches: 'Guitar',
    learns: 'Coding',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
  });

  // Video Feed State
  const [videos, setVideos] = useState([
    {
      id: '1',
      title: 'Fingerpicking minor pentatonic scale tutorial! 🎸',
      creator: 'Alex Rivers',
      teaches: 'Guitar',
      learns: 'Coding',
      likes: 342,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500',
    },
    {
      id: '2',
      title: 'Built an AI weather app in 2 hours using React! 💻',
      creator: 'Sarah Chen',
      teaches: 'Coding',
      learns: 'Guitar',
      likes: 890,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500',
    }
  ]);

  // Skill Matching State
  const [matches, setMatches] = useState([
    {
      id: '101',
      name: 'Sarah Chen',
      teaches: 'Coding',
      learns: 'Guitar',
      bio: 'Full-stack software engineer willing to teach JS/React for acoustic lessons.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      status: 'Connect'
    },
    {
      id: '102',
      name: 'Marcus Vance',
      teaches: 'Spanish',
      learns: 'Guitar',
      bio: 'Native Spanish speaker looking to swap language skills for music practice.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      status: 'Connect'
    }
  ]);

  // Chat State
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: 'them', text: 'Hey Alex! Ready to swap Guitar lessons for Coding?' },
    { id: '2', sender: 'me', text: 'Hey Sarah! Absolutely, let us get started!' }
  ]);
  const [newMessageText, setNewMessageText] = useState('');

  // Modals
  const [isPostModalVisible, setPostModalVisible] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState('');

  // Authentication Handlers
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Authentication Error', 'Please enter both email and password.');
      return;
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  // Video Likes & Uploads
  const handleLike = (id) => {
    setVideos(videos.map(item => item.id === id ? { ...item, likes: item.likes + 1 } : item));
  };

  const handleAddVideo = () => {
    if (!newVideoTitle.trim()) return;
    const newEntry = {
      id: Date.now().toString(),
      title: newVideoTitle,
      creator: myProfile.name,
      teaches: myProfile.teaches,
      learns: myProfile.learns,
      likes: 0,
      avatar: myProfile.avatar,
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500'
    };
    setVideos([newEntry, ...videos]);
    setNewVideoTitle('');
    setPostModalVisible(false);
  };

  // Connection & Chat Handlers
  const handleConnect = (id) => {
    setMatches(matches.map(m => m.id === id ? { ...m, status: 'Connected! 💬' } : m));
  };

  const handleSendMessage = () => {
    if (!newMessageText.trim()) return;
    setChatMessages([...chatMessages, { id: Date.now().toString(), sender: 'me', text: newMessageText }]);
    setNewMessageText('');
  };

  // ==========================================
  // 1. INSTANT LOGIN / SIGNUP SCREEN
  // ==========================================
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <View style={styles.loginCard}>
          <Text style={styles.logoText}>SyncSkill ⚡</Text>
          <Text style={styles.subLogoText}>Swap skills. Build together.</Text>

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In / Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // 2. MAIN APPLICATION WORKSPACE
  // ==========================================
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SyncSkill ⚡</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>

      {/* Dynamic View Body */}
      <View style={styles.body}>
        {/* TAB 1: VIDEO DEMO FEED */}
        {activeTab === 'feed' && (
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.uploadBanner} onPress={() => setPostModalVisible(true)}>
              <Ionicons name="add-circle-outline" size={20} color="#FFF" />
              <Text style={styles.uploadBannerText}> Post Skill Demonstration Video</Text>
            </TouchableOpacity>

            <FlatList
              data={videos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.videoCard}>
                  <View style={styles.cardHeader}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.creatorName}>{item.creator}</Text>
                      <Text style={styles.badgeText}>Teaches: {item.teaches} ➔ Wants: {item.learns}</Text>
                    </View>
                  </View>

                  <View style={styles.thumbnailContainer}>
                    <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
                    <View style={styles.playOverlay}>
                      <Ionicons name="play-circle" size={54} color="rgba(255,255,255,0.85)" />
                    </View>
                  </View>

                  <Text style={styles.videoTitle}>{item.title}</Text>

                  <View style={styles.cardFooter}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => handleLike(item.id)}>
                      <Ionicons name="heart" size={20} color="#FF3B30" />
                      <Text style={styles.iconText}> {item.likes}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        )}

        {/* TAB 2: SKILL MATCHING */}
        {activeTab === 'matches' && (
          <FlatList
            data={matches}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.matchCard}>
                <Image source={{ uri: item.avatar }} style={styles.avatarLarge} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.creatorName}>{item.name}</Text>
                  <Text style={styles.matchBadge}>Teaches: {item.teaches} | Learns: {item.learns}</Text>
                  <Text style={styles.bioText}>{item.bio}</Text>
                  
                  <View style={styles.actionRow}>
                    <TouchableOpacity 
                      style={[styles.smallButton, item.status.includes('Connected') && styles.connectedButton]} 
                      onPress={() => handleConnect(item.id)}
                    >
                      <Text style={styles.smallButtonText}>{item.status}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.chatIconButton} onPress={() => setActiveChatUser(item)}>
                      <Ionicons name="chatbubbles" size={18} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        )}

        {/* TAB 3: PROFILE */}
        {activeTab === 'profile' && (
          <ScrollView style={styles.profileContainer}>
            <View style={{ alignItems: 'center' }}>
              <Image source={{ uri: myProfile.avatar }} style={styles.profileAvatar} />
              <Text style={styles.profileName}>{myProfile.name}</Text>
              <Text style={styles.profileBio}>{myProfile.bio}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Skills Summary</Text>
              <View style={styles.skillBadgeBox}>
                <Text style={styles.skillLabel}>Teaches: <Text style={styles.skillValue}>{myProfile.teaches}</Text></Text>
                <Text style={styles.skillLabel}>Wants: <Text style={styles.skillValue}>{myProfile.learns}</Text></Text>
              </View>
            </View>
          </ScrollView>
        )}
      </View>

      {/* Bottom Navigation Toolbar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('feed')}>
          <Ionicons name="film" size={22} color={activeTab === 'feed' ? '#007AFF' : '#888'} />
          <Text style={{ color: activeTab === 'feed' ? '#007AFF' : '#888', fontSize: 11 }}>Demos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('matches')}>
          <Ionicons name="people" size={22} color={activeTab === 'matches' ? '#007AFF' : '#888'} />
          <Text style={{ color: activeTab === 'matches' ? '#007AFF' : '#888', fontSize: 11 }}>Matches</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
          <Ionicons name="person" size={22} color={activeTab === 'profile' ? '#007AFF' : '#888'} />
          <Text style={{ color: activeTab === 'profile' ? '#007AFF' : '#888', fontSize: 11 }}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* CHAT MODAL */}
      <Modal visible={!!activeChatUser} animationType="slide">
        <SafeAreaView style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Chat with {activeChatUser?.name}</Text>
            <TouchableOpacity onPress={() => setActiveChatUser(null)}>
              <Ionicons name="close" size={26} color="#FFF" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={chatMessages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.messageBubble, item.sender === 'me' ? styles.myBubble : styles.theirBubble]}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
            style={{ flex: 1, padding: 16 }}
          />

          <View style={styles.chatInputRow}>
            <TextInput
              style={styles.chatInput}
              placeholder="Type a message..."
              placeholderTextColor="#888"
              value={newMessageText}
              onChangeText={setNewMessageText}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Ionicons name="send" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* CREATE POST MODAL */}
      <Modal visible={isPostModalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Skill Demonstration</Text>
            <TextInput
              style={styles.input}
              placeholder="What skill are you demonstrating?"
              placeholderTextColor="#888"
              value={newVideoTitle}
              onChangeText={setNewVideoTitle}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
              <TouchableOpacity style={[styles.smallButton, { backgroundColor: '#444' }]} onPress={() => setPostModalVisible(false)}>
                <Text style={styles.smallButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.smallButton} onPress={handleAddVideo}>
                <Text style={styles.smallButtonText}>Publish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  loginContainer: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' },
  loginCard: { width: '85%', padding: 24, backgroundColor: '#1E1E1E', borderRadius: 16, alignItems: 'center' },
  logoText: { fontSize: 32, fontWeight: 'bold', color: '#FFF', marginBottom: 8 },
  subLogoText: { fontSize: 14, color: '#AAA', marginBottom: 24 },
  input: { width: '100%', height: 48, backgroundColor: '#2A2A2A', borderRadius: 8, paddingHorizontal: 16, color: '#FFF', marginBottom: 16 },
  primaryButton: { width: '100%', height: 48, backgroundColor: '#007AFF', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  header: { height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#222' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  body: { flex: 1, padding: 12 },
  uploadBanner: { backgroundColor: '#007AFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 8, marginBottom: 12 },
  uploadBannerText: { color: '#FFF', fontWeight: 'bold' },
  videoCard: { backgroundColor: '#1E1E1E', borderRadius: 12, padding: 12, marginBottom: 16 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  avatarLarge: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  creatorName: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  badgeText: { color: '#007AFF', fontSize: 12, marginTop: 2 },
  thumbnailContainer: { height: 180, borderRadius: 8, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', marginVertical: 8 },
  thumbnail: { width: '100%', height: '100%' },
  playOverlay: { position: 'absolute' },
  videoTitle: { color: '#FFF', fontSize: 14, marginVertical: 4 },
  cardFooter: { flexDirection: 'row', marginTop: 6 },
  iconButton: { flexDirection: 'row', alignItems: 'center' },
  iconText: { color: '#AAA', fontSize: 12 },
  matchCard: { flexDirection: 'row', backgroundColor: '#1E1E1E', padding: 16, borderRadius: 12, marginBottom: 12 },
  matchBadge: { color: '#007AFF', fontSize: 12, marginVertical: 2 },
  bioText: { color: '#AAA', fontSize: 13, marginVertical: 4 },
  actionRow: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
  smallButton: { backgroundColor: '#007AFF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginRight: 8 },
  connectedButton: { backgroundColor: '#34C759' },
  smallButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  chatIconButton: { backgroundColor: '#333', padding: 6, borderRadius: 6 },
  profileContainer: { flex: 1, padding: 16 },
  profileAvatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 12 },
  profileName: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  profileBio: { color: '#AAA', textAlign: 'center', marginVertical: 8, paddingHorizontal: 16 },
  infoSection: { marginTop: 24, backgroundColor: '#1E1E1E', padding: 16, borderRadius: 12 },
  sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  skillBadgeBox: { backgroundColor: '#2A2A2A', padding: 12, borderRadius: 8 },
  skillLabel: { color: '#AAA', fontSize: 14, marginBottom: 4 },
  skillValue: { color: '#007AFF', fontWeight: 'bold' },
  navBar: { height: 60, flexDirection: 'row', borderTopWidth: 1, borderColor: '#222', backgroundColor: '#1E1E1E' },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  chatContainer: { flex: 1, backgroundColor: '#121212' },
  chatHeader: { height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#222' },
  chatTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  messageBubble: { padding: 12, borderRadius: 12, marginBottom: 8, maxWidth: '80%' },
  myBubble: { backgroundColor: '#007AFF', alignSelf: 'flex-end' },
  theirBubble: { backgroundColor: '#2A2A2A', alignSelf: 'flex-start' },
  messageText: { color: '#FFF' },
  chatInputRow: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderColor: '#222', backgroundColor: '#1E1E1E' },
  chatInput: { flex: 1, height: 40, backgroundColor: '#2A2A2A', borderRadius: 20, paddingHorizontal: 16, color: '#FFF', marginRight: 8 },
  sendButton: { backgroundColor: '#007AFF', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#1E1E1E', padding: 20, borderRadius: 12 },
  modalTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold', marginBottom: 12 }
});
