import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Play, ExternalLink, Youtube, FileText, CheckCircle2, Circle, Clock } from 'lucide-react';
import { DSA_TOPICS, getTopicStats, getSubtopicStats } from '../data/topicsData';
import { Card } from './Card';
import { ProgressRow } from './ProgressRow';
import { classNames } from '../utils/helpers';

export function TopicsView({ progress, onToggleProblem }) {
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  const [expandedSubtopics, setExpandedSubtopics] = useState(new Set());

  // Calculate overall topic statistics
  const topicStats = useMemo(() => {
    return DSA_TOPICS.map(topic => ({
      ...topic,
      stats: getTopicStats(topic.id, progress)
    }));
  }, [progress]);

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const toggleSubtopic = (subtopicId) => {
    setExpandedSubtopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subtopicId)) {
        newSet.delete(subtopicId);
      } else {
        newSet.add(subtopicId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Hard': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Topics Overview */}
      <Card title="DSA Topics Overview" right={<span className="text-xs text-gray-400">10 Core Topics</span>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {topicStats.map((topic) => (
            <div
              key={topic.id}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all cursor-pointer"
              onClick={() => toggleTopic(topic.id)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-5`} />
              <div className="relative">
                <div className="text-2xl mb-2">{topic.icon}</div>
                <div className="text-sm font-semibold text-gray-100">{topic.name}</div>
                <div className="text-xs text-gray-400 mb-3 line-clamp-2">{topic.description}</div>
                <div className="text-xs text-gray-300">
                  {topic.stats.completed}/{topic.stats.total} completed
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
                  <div
                    className={`h-1.5 rounded-full bg-gradient-to-r ${topic.color}`}
                    style={{ width: `${topic.stats.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 mt-1">{topic.stats.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Detailed Topics List */}
      <Card title="Detailed Topics" noDivider>
        <div className="divide-y divide-white/5">
          {DSA_TOPICS.map((topic) => {
            const isTopicExpanded = expandedTopics.has(topic.id);
            const topicStat = getTopicStats(topic.id, progress);
            const isTopicCompleted = topicStat.percentage === 100;

            return (
              <div key={topic.id} className="py-4">
                {/* Topic Header */}
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{topic.icon}</div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-100">{topic.name}</h3>
                        {isTopicCompleted && (
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{topic.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-300">
                          {topicStat.completed}/{topicStat.total} problems
                        </span>
                        <span className="text-xs text-gray-300">
                          {topicStat.percentage}% complete
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20">
                      <ProgressRow label="" value={topicStat.percentage} />
                    </div>
                    {isTopicExpanded ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Subtopics */}
                {isTopicExpanded && (
                  <div className="ml-6 mt-4 space-y-3">
                    {topic.subtopics.map((subtopic) => {
                      const isSubtopicExpanded = expandedSubtopics.has(subtopic.id);
                      const subtopicStat = getSubtopicStats(topic.id, subtopic.id, progress);
                      const isSubtopicCompleted = subtopicStat.isCompleted;

                      return (
                        <div key={subtopic.id} className="border border-white/10 rounded-xl bg-white/5">
                          {/* Subtopic Header */}
                          <button
                            onClick={() => toggleSubtopic(subtopic.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                {isSubtopicCompleted ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                                ) : (
                                  <Circle className="h-5 w-5 text-gray-400" />
                                )}
                                <h4 className="text-md font-medium text-gray-100">{subtopic.title}</h4>
                              </div>
                              <span className={`px-2 py-1 rounded-md text-xs border ${getDifficultyBadgeColor(subtopic.difficulty)}`}>
                                {subtopic.difficulty}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-300">
                                {subtopicStat.completed}/{subtopicStat.total} problems
                              </span>
                              <div className="w-16">
                                <ProgressRow label="" value={subtopicStat.percentage} />
                              </div>
                              {isSubtopicExpanded ? (
                                <ChevronDown className="h-4 w-4 text-gray-400" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                          </button>

                          {/* Problems */}
                          {isSubtopicExpanded && (
                            <div className="border-t border-white/5 divide-y divide-white/5">
                              {subtopic.problems.map((problem) => {
                                const problemProgress = progress[problem.id];
                                const isSolved = problemProgress?.status === 'solved';
                                const isRevision = problemProgress?.status === 'revise';

                                return (
                                  <div key={problem.id} className="flex items-center gap-3 p-4 hover:bg-white/5">
                                    {/* Problem Status */}
                                    <button
                                      onClick={() => onToggleProblem(problem.id)}
                                      className={classNames(
                                        "grid h-6 w-6 place-items-center rounded-md border",
                                        isSolved
                                          ? "border-emerald-500/60 bg-emerald-500/10"
                                          : "border-white/10 bg-white/0"
                                      )}
                                    >
                                      {isSolved ? (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                      ) : (
                                        <Circle className="h-4 w-4 text-gray-400" />
                                      )}
                                    </button>

                                    {/* Problem Details */}
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <h5 className="font-medium text-gray-100">{problem.title}</h5>
                                        <span className={`px-2 py-0.5 rounded text-xs ${getDifficultyBadgeColor(problem.difficulty)}`}>
                                          {problem.difficulty}
                                        </span>
                                      </div>
                                      <div className="text-xs text-gray-400 mt-1">
                                        {problem.tags.join(', ')}
                                      </div>
                                      {problem.note && (
                                        <div className="text-xs text-gray-500 mt-1">{problem.note}</div>
                                      )}
                                    </div>

                                    {/* Problem Actions */}
                                    <div className="flex items-center gap-2 text-gray-400">
                                      <a
                                        href={problem.sourceUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-md px-2 py-1 text-xs hover:bg-white/10 flex items-center gap-1"
                                      >
                                        <ExternalLink className="h-3 w-3" />
                                        Solve
                                      </a>
                                      {problem.youtubeUrl && (
                                        <a
                                          href={problem.youtubeUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="rounded-md px-2 py-1 text-xs hover:bg-white/10 flex items-center gap-1"
                                        >
                                          <Youtube className="h-3 w-3" />
                                          Video
                                        </a>
                                      )}
                                      {problem.codeforcesUrl && (
                                        <a
                                          href={problem.codeforcesUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="rounded-md px-2 py-1 text-xs hover:bg-white/10 flex items-center gap-1"
                                        >
                                          <ExternalLink className="h-3 w-3" />
                                          CF
                                        </a>
                                      )}
                                      {problem.articleUrl && (
                                        <a
                                          href={problem.articleUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="rounded-md px-2 py-1 text-xs hover:bg-white/10 flex items-center gap-1"
                                        >
                                          <FileText className="h-3 w-3" />
                                          Article
                                        </a>
                                      )}
                                      {isRevision && (
                                        <span className="rounded-md px-2 py-1 text-xs bg-yellow-500/10 text-yellow-300 border border-yellow-500/20">
                                          <Clock className="h-3 w-3 inline mr-1" />
                                          Revise
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}