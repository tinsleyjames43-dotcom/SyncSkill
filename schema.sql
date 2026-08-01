-- ==========================================
-- SUPABASE / POSTGRESQL DATABASE SCHEMA
-- File: schema.sql
-- ==========================================

-- 1. PROFILES TABLE (Stores user info and skill tags)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  avatar_url TEXT DEFAULT 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
  bio TEXT,
  teaches_skill TEXT NOT NULL,
  learns_skill TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. VIDEOS TABLE (Stores TikTok-style video demos)
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  likes INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. MATCHES TABLE (Stores skill swap connections)
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'matched', -- 'pending' or 'matched'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_match UNIQUE(user1_id, user2_id)
);

-- 4. MESSAGES TABLE (Stores real-time chat messages)
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- INITIAL SAMPLE DATA (SEED DATA)
-- ==========================================

INSERT INTO profiles (id, name, avatar_url, bio, teaches_skill, learns_skill)
VALUES 
  ('a1111111-1111-1111-1111-111111111111', 'Alex Rivers', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'Acoustic fingerstyle player.', 'Guitar', 'Coding'),
  ('b2222222-2222-2222-2222-222222222222', 'Sarah Chen', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'Full-stack developer looking to learn music.', 'Coding', 'Guitar');

INSERT INTO videos (user_id, title, video_url, likes)
VALUES 
  ('a1111111-1111-1111-1111-111111111111', 'Fingerpicking minor pentatonic scale tutorial! 🎸', 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', 342),
  ('b2222222-2222-2222-2222-222222222222', 'Built an AI weather app in 2 hours using React! 💻', 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', 890);
