import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, Image, TouchableOpacity, FlatList, 
  SafeAreaView, Modal, TextInput, Alert, ScrollView, Switch 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Main App Navigation State
  const [activeTab, setActiveTab] = useState('feed');

  // Premium & Settings State
  const [isProUser, setIsProUser] = useState(true);
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [autoMatchNotifications, setAutoMatchNotifications] = useState(true);

  // User Profile State
  const [myProfile, setMyProfile] = useState({
    name: 'Alex Rivers',
    bio: 'Acoustic fingerstyle guitarist. Looking to master full-stack React Native!',
    teaches: 'Guitar',
    learns: 'Coding',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    isVerified: true
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
      isVerified: true,
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
      isVerified: true,
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
      bio: 'Senior Software Engineer willing to teach React for acoustic guitar lessons.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      isVerified: true,
      status: 'Connect'
    },
    {
      id: '102',
      name: 'Marcus Vance',
      teaches: 'Spanish',
      learns: 'Guitar',
      bio: 'Native Spanish speaker looking to swap language fluency for music practice.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      isVerified: false,
      status: 'Connect'
    }
  ]);

  // Chat State
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: 'them', text: 'Hey Alex! Ready to swap Guitar lessons for Coding?' },
    { id: '2', sender: 'me', text: 'Hey Sarah! Absolutely, excited to build together.' }
  ]);
  const [newMessageText, setNewMessageText] = useState('');

  // Modals
  const [isPostModalVisible, setPostModalVisible] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState('');

  // Actions
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Authentication', 'Please fill in both Email and Password fields.');
      return;
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

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
      isVerified: myProfile.isVerified,
      avatar: myProfile.avatar,
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500'
    };
    setVideos([newEntry, ...videos]);
    setNewVideoTitle('');
    setPostModalVisible(false);
  };

  const handleConnect = (id) => {
    setMatches(matches.map(m => m.id === id ? { ...m, status: 'Connected 💬' } : m));
  };

  const handleSendMessage = () => {
    if (!newMessageText.trim()) return;
    setChatMessages([...chatMessages, { id: Date.now().toString(), sender: 'me', text: newMessageText }]);
    setNewMessageText('');
  };

  // ==========================================
  // 1. PREMIUM LOGIN PORTAL
  // ==========================================
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <View style={styles.glowBg} />
        <View style={styles.loginCard}>
          <View style={styles.brandBadge}>
            <Ionicons name="sparkles" size={14} color="#00E5FF" />
            <Text style={styles.brandBadgeText}>PRO PLATFORM</Text>
          </View>
          <Text style={styles.logoText}>SyncSkill</Text>
          <Text style={styles.subLogoText}>Connect. Learn. Swap Expertise.</Text>

          <TextInput
            style={styles.premiumInput}
            placeholder="Email address"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.premiumInput}
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.primaryGradientButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Sign In to Workspace</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // 2. MAIN PREMIUM APP VIEW
  // ==========================================
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.headerTitle}>SyncSkill</Text>
          {isProUser && (
            <View style={styles.proTag}>
              <Text style={styles.proTagText}>PRO</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={20} color="#FF453A" />
        </TouchableOpacity>
      </View>

      {/* Main Body */}
      <View style={styles.body}>
        {/* TAB 1: DEMOS FEED */}
        {activeTab === 'feed' && (
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={styles.uploadBanner} onPress={() => setPostModalVisible(true)}>
              <Ionicons name="add-circle" size={20} color="#00E5FF" />
              <Text style={styles.uploadBannerText}> Publish Skill Demonstration</Text>
            </TouchableOpacity>

            <FlatList
              data={videos}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.videoCard}>
                  <View style={styles.cardHeader}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.creatorName}>{item.creator}</Text>
                        {item.isVerified && <Ionicons name="checkmark-circle" size={15} color="#00E5FF" style={{ marginLeft: 4 }} />}
                      </View>
                      <Text style={styles.badgeText}>Teaches: {item.teaches}  •  Wants: {item.learns}</Text>
                    </View>
                  </View>

                  <View style={styles.thumbnailContainer}>
                    <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
                    <View style={styles.playOverlay}>
                      <Ionicons name="play-circle" size={56} color="rgba(255,255,255,0.9)" />
                    </View>
                  </View>

                  <Text style={styles.videoTitle}>{item.title}</Text>

                  <View style={styles.cardFooter}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => handleLike(item.id)}>
                      <Ionicons name="heart" size={18} color="#FF453A" />
                      <Text style={styles.iconText}> {item.likes}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        )}

        {/* TAB 2: MATCHES */}
        {activeTab === 'matches' && (
          <FlatList
            data={matches}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.matchCard}>
                <Image source={{ uri: item.avatar }} style={styles.avatarLarge} />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.creatorName}>{item.name}</Text>
                    {item.isVerified && <Ionicons name="checkmark-circle" size={15} color="#00E5FF" style={{ marginLeft: 4 }} />}
                  </View>
                  <Text style={styles.matchBadge}>Teaches: {item.teaches}  |  Learns: {item.learns}</Text>
                  <Text style={styles.bioText}>{item.bio}</Text>
                  
                  <View style={styles.actionRow}>
                    <TouchableOpacity 
                      style={[styles.smallButton, item.status.includes('Connected') && styles.connectedButton]} 
                      onPress={() => handleConnect(item.id)}
                    >
                      <Text style={styles.smallButtonText}>{item.status}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.chatIconButton} onPress={() => setActiveChatUser(item)}>
                      <Ionicons name="chatbubbles-outline" size={18} color="#FFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        )}

        {/* TAB 3: PROFILE */}
        {activeTab === 'profile' && (
          <ScrollView style={styles.profileContainer} showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Image source={{ uri: myProfile.avatar }} style={styles.profileAvatar} />
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Text style={styles.profileName}>{myProfile.name}</Text>
                {myProfile.isVerified && <Ionicons name="checkmark-circle" size={20} color="#00E5FF" style={{ marginLeft: 6 }} />}
              </View>
              <Text style={styles.profileBio}>{myProfile.bio}</Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Skill Portfolio</Text>
              <View style={styles.skillBadgeBox}>
                <Text style={styles.skillLabel}>Primary Skill: <Text style={styles.skillValue}>{myProfile.teaches}</Text></Text>
                <Text style={styles.skillLabel}>Learning Target: <Text style={styles.skillValue}>{myProfile.learns}</Text></Text>
              </View>
            </View>
          </ScrollView>
        )}

        {/* TAB 4: SETTINGS & PREMIUM */}
        {activeTab === 'settings' && (
          <ScrollView style={styles.profileContainer} showsVerticalScrollIndicator={false}>
            {/* Premium Card Header */}
            <View style={styles.premiumBox}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={styles.premiumTitle}>SyncSkill PRO</Text>
                  <Text style={styles.premiumSub}>Unlimited matches & priority boosting</Text>
                </View>
                <Ionicons name="diamond" size={32} color="#00E5FF" />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
                <Text style={{ color: '#AAA', flex: 1, fontSize: 13 }}>Pro Status Active</Text>
                <Switch
                  value={isProUser}
                  onValueChange={setIsProUser}
                  trackColor={{ false: '#333', true: '#00E5FF' }}
                />
              </View>
            </View>

            {/* General Settings */}
            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>Preferences</Text>

              <View style={styles.settingRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="eye-off-outline" size={20} color="#AAA" style={{ marginRight: 10 }} />
                  <Text style={styles.settingText}>Incognito Browsing</Text>
                </View>
                <Switch
                  value={incognitoMode}
                  onValueChange={setIncognitoMode}
                  trackColor={{ false: '#333', true: '#00E5FF' }}
                />
              </View>

              <View style={styles.settingRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="notifications-outline" size={20} color="#AAA" style={{ marginRight: 10 }} />
                  <Text style={styles.settingText}>Match Alert Push Notifications</Text>
                </View>
                <Switch
                  value={autoMatchNotifications}
                  onValueChange={setAutoMatchNotifications}
                  trackColor={{ false: '#333', true: '#00E5FF' }}
                />
              </View>
            </View>

            {/* Account Management */}
            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>Account & Privacy</Text>

              <TouchableOpacity style={styles.settingRow} onPress={() => Alert.alert('Security', 'Password reset instructions sent to your email.')}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="key-outline" size={20} color="#AAA" style={{ marginRight: 10 }} />
                  <Text style={styles.settingText}>Change Account Password</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#555" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingRow} onPress={handleLogout}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="log-out-outline" size={20} color="#FF453A" style={{ marginRight: 10 }} />
                  <Text style={[styles.settingText, { color: '#FF453A' }]}>Sign Out</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>

      {/* Bottom Bar Navigation */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('feed')}>
          <Ionicons name="play-screen" size={22} color={activeTab === 'feed' ? '#00E5FF' : '#666'} />
          <Text style={[styles.navText, { color: activeTab === 'feed' ? '#00E5FF' : '#666' }]}>Demos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('matches')}>
          <Ionicons name="people-outline" size={22} color={activeTab === 'matches' ? '#00E5FF' : '#666'} />
          <Text style={[styles.navText, { color: activeTab === 'matches' ? '#00E5FF' : '#666' }]}>Matches</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
          <Ionicons name="person-outline" size={22} color={activeTab === 'profile' ? '#00E5FF' : '#666'} />
          <Text style={[styles.navText, { color: activeTab === 'profile' ? '#00E5FF' : '#666' }]}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('settings')}>
          <Ionicons name="options-outline" size={22} color={activeTab === 'settings' ? '#00E5FF' : '#666'} />
          <Text style={[styles.navText, { color: activeTab === 'settings' ? '#00E5FF' : '#666' }]}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* CHAT MODAL */}
      <Modal visible={!!activeChatUser} animationType="slide">
        <SafeAreaView style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Chat with {activeChatUser?.name}</Text>
            <TouchableOpacity onPress={() => setActiveChatUser(null)}>
              <Ionicons name="close" size={24} color="#FFF" />
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
              placeholder="Type message..."
              placeholderTextColor="#666"
              value={newMessageText}
              onChangeText={setNewMessageText}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Ionicons name="send" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* CREATE POST MODAL */}
      <Modal visible={isPostModalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Publish Demonstration</Text>
            <TextInput
              style={styles.premiumInput}
              placeholder="What skill topic are you demonstrating?"
              placeholderTextColor="#666"
              value={newVideoTitle}
              onChangeText={setNewVideoTitle}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 }}>
              <TouchableOpacity style={[styles.smallButton, { backgroundColor: '#333' }]} onPress={() => setPostModalVisible(false)}>
                <Text style={styles.smallButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.smallButton} onPress={handleAddVideo}>
                <Text style={styles.smallButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0E14' },
  loginContainer: { flex: 1, backgroundColor: '#0B0E14', justifyContent: 'center', alignItems: 'center' },
  glowBg: { position: 'absolute', width: 250, height: 250, borderRadius: 125, backgroundColor: 'rgba(0, 229, 255, 0.08)' },
  loginCard: { width: '85%', padding: 28, backgroundColor: '#141822', borderRadius: 20, borderWidth: 1, borderColor: '#222938', alignItems: 'center' },
  brandBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,229,255,0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginBottom: 16 },
  brandBadgeText: { color: '#00E5FF', fontSize: 10, fontWeight: 'bold', marginLeft: 4 },
  logoText: { fontSize: 34, fontWeight: '800', color: '#FFF', letterSpacing: -0.5 },
  subLogoText: { fontSize: 13, color: '#8892B0', marginBottom: 28, textAlign: 'center' },
  premiumInput: { width: '100%', height: 48, backgroundColor: '#1C2230', borderRadius: 10, paddingHorizontal: 16, color: '#FFF', marginBottom: 14, borderWidth: 1, borderColor: '#283144' },
  primaryGradientButton: { width: '100%', height: 48, backgroundColor: '#00E5FF', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#0B0E14', fontSize: 15, fontWeight: 'bold' },
  header: { height: 52, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, borderBottomWidth: 1, borderColor: '#1C2230' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', letterSpacing: -0.5 },
  proTag: { backgroundColor: 'rgba(0,229,255,0.15)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 8 },
  proTagText: { color: '#00E5FF', fontSize: 10, fontWeight: 'bold' },
  logoutBtn: { padding: 4 },
  body: { flex: 1, padding: 14 },
  uploadBanner: { backgroundColor: '#141822', borderWidth: 1, borderColor: '#283144', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 10, marginBottom: 14 },
  uploadBannerText: { color: '#FFF', fontWeight: '600', fontSize: 13 },
  videoCard: { backgroundColor: '#141822', borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#1F2636' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatar: { width: 38, height: 38, borderRadius: 19, marginRight: 10 },
  avatarLarge: { width: 52, height: 52, borderRadius: 26, marginRight: 12 },
  creatorName: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  badgeText: { color: '#00E5FF', fontSize: 11, marginTop: 2 },
  thumbnailContainer: { height: 190, borderRadius: 10, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', marginVertical: 6 },
  thumbnail: { width: '100%', height: '100%' },
  playOverlay: { position: 'absolute' },
  videoTitle: { color: '#E2E8F0', fontSize: 14, marginVertical: 6 },
  cardFooter: { flexDirection: 'row', marginTop: 4 },
  iconButton: { flexDirection: 'row', alignItems: 'center' },
  iconText: { color: '#8892B0', fontSize: 12 },
  matchCard: { flexDirection: 'row', backgroundColor: '#141822', padding: 16, borderRadius: 14, marginBottom: 12, borderWidth: 1, borderColor: '#1F2636' },
  matchBadge: { color: '#00E5FF', fontSize: 12, marginVertical: 4 },
  bioText: { color: '#8892B0', fontSize: 13, marginBottom: 8 },
  actionRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  smallButton: { backgroundColor: '#00E5FF', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 6, marginRight: 8 },
  connectedButton: { backgroundColor: '#10B981' },
  smallButtonText: { color: '#0B0E14', fontWeight: 'bold', fontSize: 12 },
  chatIconButton: { backgroundColor: '#1C2230', padding: 8, borderRadius: 6 },
  profileContainer: { flex: 1 },
  profileAvatar: { width: 84, height: 84, borderRadius: 42, borderWidth: 2, borderColor: '#00E5FF' },
  profileName: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  profileBio: { color: '#8892B0', textAlign: 'center', marginVertical: 8, paddingHorizontal: 20, fontSize: 13 },
  infoSection: { backgroundColor: '#141822', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#1F2636' },
  sectionTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginBottom: 12 },
  skillBadgeBox: { backgroundColor: '#1C2230', padding: 12, borderRadius: 8 },
  skillLabel: { color: '#8892B0', fontSize: 13, marginBottom: 4 },
  skillValue: { color: '#00E5FF', fontWeight: 'bold' },
  premiumBox: { backgroundColor: '#141822', padding: 18, borderRadius: 14, borderWidth: 1, borderColor: '#00E5FF', marginBottom: 16 },
  premiumTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  premiumSub: { color: '#8892B0', fontSize: 12, marginTop: 2 },
  settingsSection: { backgroundColor: '#141822', padding: 16, borderRadius: 14, borderWidth: 1, borderColor: '#1F2636', marginBottom: 16 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#1C2230' },
  settingText: { color: '#E2E8F0', fontSize: 14 },
  navBar: { height: 60, flexDirection: 'row', borderTopWidth: 1, borderColor: '#1C2230', backgroundColor: '#0E121B' },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navText: { fontSize: 10, marginTop: 3 },
  chatContainer: { flex: 1, backgroundColor: '#0B0E14' },
  chatHeader: { height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#1C2230' },
  chatTitle: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  messageBubble: { padding: 12, borderRadius: 12, marginBottom: 8, maxWidth: '80%' },
  myBubble: { backgroundColor: '#00E5FF', alignSelf: 'flex-end' },
  theirBubble: { backgroundColor: '#1C2230', alignSelf: 'flex-start' },
  messageText: { color: '#FFF', fontSize: 13 },
  chatInputRow: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderColor: '#1C2230', backgroundColor: '#141822' },
  chatInput: { flex: 1, height: 40, backgroundColor: '#1C2230', borderRadius: 20, paddingHorizontal: 16, color: '#FFF', marginRight: 8 },
  sendButton: { backgroundColor: '#00E5FF', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#141822', padding: 20, borderRadius: 14, borderWidth: 1, borderColor: '#283144' },
  modalTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 14 }
});
