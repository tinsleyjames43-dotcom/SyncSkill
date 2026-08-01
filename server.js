// ==========================================
// REAL-TIME BACKEND API FOR SKILL MATCH APP
// File: server.js
// ==========================================

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase Cloud Database Client
const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ==========================================
// 1. VIDEO FEED ENDPOINTS
// ==========================================

// Get all uploaded video demos
app.get('/api/videos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*, profiles(name, avatar_url, teaches_skill, learns_skill)')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new video demo link
app.post('/api/videos', async (req, res) => {
  const { userId, title, videoUrl } = req.body;
  try {
    const { data, error } = await supabase
      .from('videos')
      .insert([{ user_id: userId, title, video_url: videoUrl, likes: 0 }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Like a video
app.post('/api/videos/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    const { data: video, error: fetchErr } = await supabase
      .from('videos')
      .select('likes')
      .eq('id', id)
      .single();

    if (fetchErr) throw fetchErr;

    const { data, error } = await supabase
      .from('videos')
      .update({ likes: video.likes + 1 })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// 2. SKILL MATCHING ENDPOINTS
// ==========================================

// Recommend matching skill partners
app.get('/api/matches/recommendations/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    // Get logged-in user's profile
    const { data: currentUser, error: userErr } = await supabase
      .from('profiles')
      .select('learns_skill')
      .eq('id', userId)
      .single();

    if (userErr) throw userErr;

    // Find users who teach what current user wants to learn
    const { data: recommendations, error: recErr } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', userId)
      .ilike('teaches_skill', `%${currentUser.learns_skill}%`);

    if (recErr) throw recErr;
    res.status(200).json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Request or accept a match
app.post('/api/matches', async (req, res) => {
  const { requesterId, targetId } = req.body;
  try {
    const { data, error } = await supabase
      .from('matches')
      .insert([{ user1_id: requesterId, user2_id: targetId, status: 'matched' }])
      .select();

    if (error) throw error;
    res.status(201).json({ message: 'Skill match successfully created!', match: data[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// 3. CHAT ENDPOINTS
// ==========================================

// Get chat messages between two matched users
app.get('/api/chat/:matchId', async (req, res) => {
  const { matchId } = req.params;
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('match_id', matchId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send a chat message
app.post('/api/chat', async (req, res) => {
  const { matchId, senderId, messageText } = req.body;
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ match_id: matchId, sender_id: senderId, text: messageText }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Skill App Server running live on port ${PORT}`);
});
