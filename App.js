import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

const { width, height } = Dimensions.get('window');

// ==========================================
// MOCK DATA (Initial State)
// ==========================================
const INITIAL_VIDEOS = [
  {
    id: '1',
    user: 'Alex Rivers',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    teaches: 'Guitar',
    learns: 'Coding',
    title: 'Fingerpicking minor pentatonic scale tutorial! 🎸',
    likes: 342,
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
  {
    id: '2',
    user: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    teaches: 'Python / Web',
    learns: 'Piano',
    title: 'Built an AI weather app in 2 hours using React! 💻',
    likes: 890,
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  },
];

const INITIAL_MATCHES = [
  {
    id: '1',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    teaches: 'Acoustic Guitar',
    learns: 'React Native',
    bio: 'Software dev looking to master blues guitar. Let us swap skills!',
  },
  {
    id: '2',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    teaches: 'UI/UX Design',
    learns: 'Python AI',
    bio: 'Designer wanting to jump into AI automation projects.',
  },
];

// ==========================================
// 1. VIDEO FEED SCREEN (TikTok Style)
// ==========================================
function FeedScreen({ navigation }) {
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleLike = (id) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, likes: v.likes + 1 } : v))
    );
  };

  const handleAddVideo = () => {
    if (!newTitle) return;
    const newVid = {
      id: Date.now().toString(),
      user: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      teaches: 'Your Skill',
      learns: 'New Skill',
      title: newTitle,
      likes: 0,
      videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    };
    setVideos([newVid, ...videos]);
    setNewTitle('');
    setIsUploadOpen(false);
  };

  return (
    <SafeAreaView style={styles.containerDark}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.videoCard}>
            <Video
              style={styles.fullVideo}
              source={{ uri: item.videoUrl }}
              resizeMode={ResizeMode.COVER}
              isLooping
              shouldPlay
            />
            {/* Overlay details */}
            <View style={styles.videoOverlay}>
              <View style={styles.userInfo}>
                <Image source={{ uri: item.avatar }} style={styles.avatarSmall} />
                <View>
                  <Text style={styles.userName}>{item.user}</Text>
                  <Text style={styles.skillBadge}>
                    Teaches: {item.teaches} • Wants: {item.learns}
                  </Text>
                </View>
              </View>
              <Text style={styles.videoTitle}>{item.title}</Text>
            </View>

            {/* Action Side Buttons */}
            <View style={styles.sideActions}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => handleLike(item.id)}>
                <Ionicons name="heart" size={36} color="#FF3B30" />
                <Text style={styles.actionText}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => navigation.navigate('Discover')}
              >
                <Ionicons name="people-circle" size={38} color="#007AFF" />
                <Text style={styles.actionText}>Match</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Floating Add Video Button */}
      <TouchableOpacity
        style={styles.floatingAddBtn}
        onPress={() => setIsUploadOpen(true)}
      >
        <Ionicons name="add" size={32} color="#FFF" />
      </TouchableOpacity>

      {/* Upload Modal */}
      <Modal visible={isUploadOpen} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Post a Skill Demo Video</Text>
            <TextInput
              placeholder="What project or skill are you demonstrating?"
              placeholderTextColor="#8E8E93"
              style={styles.input}
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TouchableOpacity style={styles.primaryBtn} onPress={handleAddVideo}>
              <Text style={styles.btnText}>Upload & Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsUploadOpen(false)} style={styles.closeBtn}>
              <Text style={{ color: '#FF3B30' }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ==========================================
// 2. DISCOVER / MATCH SCREEN
// ==========================================
function DiscoverScreen({ navigation }) {
  const [candidates, setCandidates] = useState(INITIAL_MATCHES);

  const handleMatch = (person) => {
    setCandidates((prev) => prev.filter((c) => c.id !== person.id));
    alert(`It is a Match! You and ${person.name} can now collaborate.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Find a Skill Partner</Text>
      {candidates.length > 0 ? (
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }}>
          {candidates.map((person) => (
            <View key={person.id} style={styles.matchCard}>
              <Image source={{ uri: person.avatar }} style={styles.matchAvatar} />
              <Text style={styles.matchName}>{person.name}</Text>
              <Text style={styles.matchBio}>{person.bio}</Text>
              
              <View style={styles.tagContainer}>
                <Text style={styles.teachTag}>Teaches: {person.teaches}</Text>

                <Text style={styles.learnTag}>Wants: {person.learns}</Text>

              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={() => handleMatch(person)}>
                <Text style={styles.btnText}>Connect & Match</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="checkmark-circle-outline" size={64} color="#34C759" />
          <Text style={styles.emptyText}>You matched with all available mentors for today!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

// ==========================================
// 3. CHAT SCREEN
// ==========================================
function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'David Kim', text: 'Hey! Ready to swap React Native tips for guitar lessons?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input) return;
    setMessages([...messages, { id: Date.now().toString(), sender: 'You', text: input }]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Collaboration Chat</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        style={{ flex: 1, padding: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.msgBubble, item.sender === 'You' ? styles.myMsg : styles.theirMsg]}>
            <Text style={styles.msgSender}>{item.sender}</Text>
            <Text style={styles.msgText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.chatInputRow}>
        <TextInput
          placeholder="Send a message..."
          style={styles.chatInput}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// 4. PROFILE SCREEN
// ==========================================
function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.profileContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150' }}
          style={styles.profileAvatar}
        />
        <Text style={styles.profileName}>Alex Rivers (You)</Text>
        <Text style={styles.profileBio}>Full-stack enthusiast by day, acoustic jammer by night.</Text>

        <View style={styles.skillsBox}>
          <Text style={styles.skillHeading}>Skills I Teach:</Text>
          <Text style={styles.skillValue}>🎸 Acoustic Guitar, Fingerstyle</Text>
          <Text style={[styles.skillHeading, { marginTop: 10 }]}>Skills I am Learning:</Text>
          <Text style={styles.skillValue}>💻 Python Data Science</Text>
        </View>

        <Text style={styles.sectionTitle}>My Showcase Videos</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Ionicons name="videocam" size={32} color="#8E8E93" />
            <Text style={styles.gridLabel}>Guitar Riff #1</Text>
          </View>
          <View style={styles.gridItem}>
            <Ionicons name="videocam" size={32} color="#8E8E93" />
            <Text style={styles.gridLabel}>React App Demo</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// NAVIGATION & TAB SETUP
// ==========================================
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Feed') iconName = 'play-circle';
            else if (route.name === 'Discover') iconName = 'people';
            else if (route.name === 'Chat') iconName = 'chatbubbles';
            else if (route.name === 'Profile') iconName = 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ==========================================
// STYLES
// ==========================================
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  containerDark: { flex: 1, backgroundColor: '#000' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', padding: 16, textAlign: 'center' },
  videoCard: { width: width, height: height - 80, justifyContent: 'flex-end' },
  fullVideo: { ...StyleSheet.absoluteFillObject },
  videoOverlay: { padding: 20, backgroundColor: 'rgba(0,0,0,0.4)' },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatarSmall: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  skillBadge: { color: '#007AFF', fontSize: 12, fontWeight: '600' },
  videoTitle: { color: '#FFF', fontSize: 14 },
  sideActions: { position: 'absolute', right: 15, bottom: 100, alignItems: 'center' },
  actionBtn: { alignItems: 'center', marginBottom: 20 },
  actionText: { color: '#FFF', fontSize: 12, marginTop: 4, fontWeight: 'bold' },
  floatingAddBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFF', padding: 20, borderRadius: 12 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#CCC', borderRadius: 8, padding: 12, marginBottom: 12 },
  primaryBtn: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold' },
  closeBtn: { marginTop: 12, alignItems: 'center' },
  matchCard: { backgroundColor: '#FFF', width: width * 0.85, padding: 20, borderRadius: 16, marginBottom: 16, alignItems: 'center', elevation: 3 },
  matchAvatar: { width: 90, height: 90, borderRadius: 45, marginBottom: 12 },
  matchName: { fontSize: 18, fontWeight: 'bold' },
  matchBio: { color: '#666', textAlign: 'center', marginVertical: 8 },
  tagContainer: { flexDirection: 'row', gap: 8, marginVertical: 12 },
  teachTag: { backgroundColor: '#E5F1FF', color: '#007AFF', padding: 6, borderRadius: 6, fontSize: 12 },
  learnTag: { backgroundColor: '#FFE5E5', color: '#FF3B30', padding: 6, borderRadius: 6, fontSize: 12 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { color: '#8E8E93', textAlign: 'center', marginTop: 12 },
  msgBubble: { padding: 12, borderRadius: 10, marginBottom: 10, maxWidth: '80%' },
  myMsg: { backgroundColor: '#007AFF', alignSelf: 'flex-end' },
  theirMsg: { backgroundColor: '#E5E5EA', alignSelf: 'flex-start' },
  msgSender: { fontSize: 10, color: '#DDD', marginBottom: 2 },
  msgText: { color: '#FFF', fontSize: 14 },
  chatInputRow: { flexDirection: 'row', padding: 10, backgroundColor: '#FFF', alignItems: 'center' },
  chatInput: { flex: 1, backgroundColor: '#F2F2F7', padding: 10, borderRadius: 20, marginRight: 8 },
  sendBtn: { backgroundColor: '#007AFF', padding: 10, borderRadius: 20 },
  profileContainer: { alignItems: 'center', padding: 20 },
  profileAvatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 12 },
  profileName: { fontSize: 20, fontWeight: 'bold' },
  profileBio: { color: '#666', textAlign: 'center', marginTop: 4 },
  skillsBox: { backgroundColor: '#FFF', width: '100%', padding: 16, borderRadius: 12, marginVertical: 16 },
  skillHeading: { fontWeight: 'bold', color: '#8E8E93', fontSize: 12 },
  skillValue: { fontSize: 15, fontWeight: '600', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 8 },
  grid: { flexDirection: 'row', gap: 12, width: '100%' },
  gridItem: { flex: 1, height: 100, backgroundColor: '#E5E5EA', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  gridLabel: { fontSize: 12, color: '#666', marginTop: 4 },
});
