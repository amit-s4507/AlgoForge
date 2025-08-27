import React, { useState, useMemo } from 'react';
import { User, Mail, Calendar, Award, Trophy, Target, Settings, Edit2, Save, X, Github, Chrome } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from './Card';
import { ProgressRow } from './ProgressRow';
import { Heatmap } from './Heatmap';
import { DSA_TOPICS, getTopicStats, getAllTopicProblems } from '../data/topicsData';
import { getPastDates, computeStreak, pct } from '../utils/helpers';
import { classNames } from '../utils/helpers';

export function ProfilePage({ progress, activity, onClose }) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    displayName: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || ''
  });

  // Calculate comprehensive statistics
  const stats = useMemo(() => {
    if (!progress) return { total: 0, solved: 0, easy: 0, medium: 0, hard: 0 };

    const allProblems = getAllTopicProblems();
    const solvedProblems = Object.keys(progress).filter(id => progress[id]?.status === 'solved');
    
    let easy = 0, medium = 0, hard = 0;
    let easySolved = 0, mediumSolved = 0, hardSolved = 0;

    allProblems.forEach(problem => {
      if (problem.difficulty === 'Easy') easy++;
      else if (problem.difficulty === 'Medium') medium++;
      else if (problem.difficulty === 'Hard') hard++;

      if (progress[problem.id]?.status === 'solved') {
        if (problem.difficulty === 'Easy') easySolved++;
        else if (problem.difficulty === 'Medium') mediumSolved++;
        else if (problem.difficulty === 'Hard') hardSolved++;
      }
    });

    return {
      total: allProblems.length,
      solved: solvedProblems.length,
      easy: { total: easy, solved: easySolved },
      medium: { total: medium, solved: mediumSolved },
      hard: { total: hard, solved: hardSolved }
    };
  }, [progress]);

  // Calculate topic-wise progress
  const topicProgress = useMemo(() => {
    return DSA_TOPICS.map(topic => ({
      ...topic,
      stats: getTopicStats(topic.id, progress || {})
    })).sort((a, b) => b.stats.percentage - a.stats.percentage);
  }, [progress]);

  // Calculate achievements
  const achievements = useMemo(() => {
    const achievements = [];
    const streak = computeStreak(activity || {});
    
    if (stats.solved >= 1) achievements.push({ title: 'First Steps', description: 'Solved your first problem!', icon: '🎯' });
    if (stats.solved >= 10) achievements.push({ title: 'Getting Started', description: 'Solved 10 problems', icon: '🔥' });
    if (stats.solved >= 50) achievements.push({ title: 'Problem Solver', description: 'Solved 50 problems', icon: '💪' });
    if (stats.solved >= 100) achievements.push({ title: 'Centurion', description: 'Solved 100 problems', icon: '🏆' });
    if (streak >= 7) achievements.push({ title: 'Week Warrior', description: '7-day solving streak', icon: '⚡' });
    if (streak >= 30) achievements.push({ title: 'Monthly Master', description: '30-day solving streak', icon: '🌟' });
    
    // Topic completion achievements
    topicProgress.forEach(topic => {
      if (topic.stats.percentage === 100) {
        achievements.push({ 
          title: `${topic.name} Master`, 
          description: `Completed all ${topic.name} problems`, 
          icon: topic.icon 
        });
      }
    });

    return achievements;
  }, [stats, activity, topicProgress]);

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    // For now, just update local state
    setIsEditing(false);
    // Could dispatch an action to update user profile
  };

  const handleCancelEdit = () => {
    setEditedProfile({
      displayName: user?.name || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0b10] text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-gray-400">You need to be signed in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b10] text-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-20 border-b border-white/5 bg-[#0a0b10]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="rounded-xl border border-white/10 p-2 hover:border-white/20"
            >
              <X className="h-4 w-4" />
            </button>
            <h1 className="text-lg font-semibold">Profile</h1>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={classNames(
              "rounded-xl border px-3 py-2 text-sm flex items-center gap-2",
              isEditing 
                ? "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                : "border-white/10 text-gray-300 hover:border-white/20"
            )}
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4" />
                Cancel
              </>
            ) : (
              <>
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Basic Profile */}
            <Card title="Profile">
              <div className="text-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-24 w-24 rounded-full mx-auto mb-4 border-2 border-white/10"
                />
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editedProfile.displayName}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, displayName: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-center"
                      placeholder="Display Name"
                    />
                    <textarea
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm resize-none"
                      placeholder="Bio"
                      rows={3}
                    />
                    <input
                      type="text"
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                      placeholder="Location"
                    />
                    <input
                      type="url"
                      value={editedProfile.website}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                      placeholder="Website"
                    />
                    <button
                      onClick={handleSaveProfile}
                      className="w-full rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500 flex items-center justify-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-1">{user.name}</h3>
                    <p className="text-sm text-gray-400 mb-3">{user.email}</p>
                    {editedProfile.bio && (
                      <p className="text-sm text-gray-300 mb-3">{editedProfile.bio}</p>
                    )}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center gap-2 text-gray-400">
                        <Mail className="h-4 w-4" />
                        {user.email}
                      </div>
                      {editedProfile.location && (
                        <div className="flex items-center justify-center gap-2 text-gray-400">
                          <User className="h-4 w-4" />
                          {editedProfile.location}
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-2 text-gray-400">
                        {user.provider === 'google' ? <Chrome className="h-4 w-4" /> : <Github className="h-4 w-4" />}
                        Signed in with {user.provider}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card title="Quick Stats">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">{stats.solved}</div>
                  <div className="text-xs text-gray-400">Problems Solved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{computeStreak(activity || {})}</div>
                  <div className="text-xs text-gray-400">Current Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{achievements.length}</div>
                  <div className="text-xs text-gray-400">Achievements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{pct(stats.solved, stats.total)}%</div>
                  <div className="text-xs text-gray-400">Overall Progress</div>
                </div>
              </div>
            </Card>

            {/* Achievements */}
            <Card title="Achievements" right={<Award className="h-4 w-4 text-yellow-400" />}>
              {achievements.length === 0 ? (
                <div className="text-center text-gray-400 py-4">
                  <Trophy className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Start solving problems to earn achievements!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {achievements.slice(0, 5).map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-xl bg-white/5">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-100">{achievement.title}</div>
                        <div className="text-xs text-gray-400">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                  {achievements.length > 5 && (
                    <div className="text-center text-xs text-gray-400">
                      +{achievements.length - 5} more achievements
                    </div>
                  )}
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Detailed Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card title="Progress Overview">
              <div className="space-y-4">
                <ProgressRow label={`Overall (${stats.solved}/${stats.total})`} value={pct(stats.solved, stats.total)} />
                <ProgressRow 
                  label={`Easy (${stats.easy.solved}/${stats.easy.total})`} 
                  value={pct(stats.easy.solved, stats.easy.total)} 
                />
                <ProgressRow 
                  label={`Medium (${stats.medium.solved}/${stats.medium.total})`} 
                  value={pct(stats.medium.solved, stats.medium.total)} 
                />
                <ProgressRow 
                  label={`Hard (${stats.hard.solved}/${stats.hard.total})`} 
                  value={pct(stats.hard.solved, stats.hard.total)} 
                />
              </div>
            </Card>

            {/* Topic Progress */}
            <Card title="Topic Progress">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topicProgress.map((topic) => (
                  <div key={topic.id} className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{topic.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-100">{topic.name}</h4>
                        <p className="text-xs text-gray-400">{topic.stats.completed}/{topic.stats.total} problems</p>
                      </div>
                    </div>
                    <ProgressRow label="" value={topic.stats.percentage} />
                    <div className="text-xs text-gray-400 mt-1 text-right">{topic.stats.percentage}%</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Activity Heatmap */}
            <Card title="Activity Heatmap">
              <Heatmap days={getPastDates(364)} counts={activity || {}} />
              <div className="mt-4 text-center">
                <div className="text-sm text-gray-400">
                  {Object.keys(activity || {}).length} days active • {stats.solved} problems solved
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}