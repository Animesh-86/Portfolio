import { useEffect, useMemo, useState } from 'react';

import { motion } from 'framer-motion';
import { GitBranch, Star, Users, Code2, ExternalLink } from 'lucide-react';

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type ContributionResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

type RepoData = {
  name: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
};

type GitHubStats = {
  followers: number;
  totalStars: number;
  topLanguages: string[];
  publicRepos: number;
};

type GitHubHeatmapProps = {
  username: string;
  title?: string;
  subtitle?: string;
  maxWeeks?: number;
};

const LEVEL_COLORS = [
  'rgba(255, 255, 255, 0.04)',
  'rgba(99, 102, 241, 0.2)',
  'rgba(99, 102, 241, 0.4)',
  'rgba(99, 102, 241, 0.7)',
  'rgba(99, 102, 241, 1)'
];

function chunkWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  days.forEach((day) => {
    const dateObj = new Date(day.date);
    const dayOfWeek = isNaN(dateObj.getTime()) ? 0 : dateObj.getDay();

    if (currentWeek.length === 0 && dayOfWeek !== 0) {
      for (let i = 0; i < dayOfWeek; i += 1) {
        currentWeek.push({ date: '', count: 0, level: 0 });
      }
    }

    currentWeek.push(day);

    if (dayOfWeek === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length) {
    weeks.push(currentWeek);
  }

  return weeks;
}

export function GitHubHeatmap({
  username,
  title = 'GitHub Activity',
  subtitle = 'Tracking contributions and repository metrics.',
  maxWeeks = 44 // Slightly reduced to fit better in 2-column
}: GitHubHeatmapProps) {
  const [data, setData] = useState<ContributionResponse | null>(null);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        // Fetch contributions
        const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`);
        if (!contribRes.ok) throw new Error('Failed to load contributions');
        const contribJson = await contribRes.json() as ContributionResponse;

        // Fetch user info & repos
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
        ]);

        if (userRes.ok && reposRes.ok) {
          const userJson = await userRes.json();
          const reposJson = await reposRes.json() as RepoData[];

          const languages: Record<string, number> = {};
          let stars = 0;
          reposJson.forEach(repo => {
            stars += repo.stargazers_count;
            if (repo.language) {
              languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
          });

          const topLangs = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([lang]) => lang);

          if (isMounted) {
            setStats({
              followers: userJson.followers,
              totalStars: stars,
              topLanguages: topLangs,
              publicRepos: userJson.public_repos
            });
          }
        }

        if (isMounted) {
          setData(contribJson);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Unable to load GitHub data.');
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [username]);

  const weeks = useMemo(() => {
    if (!data) return [];
    const sorted = [...data.contributions].sort((a, b) => a.date.localeCompare(b.date));
    const sliced = sorted.slice(-maxWeeks * 7);
    return chunkWeeks(sliced).slice(-maxWeeks);
  }, [data, maxWeeks]);

  const totalContributions = useMemo(() => {
    if (!data) return 0;
    return Object.values(data.total).reduce((sum, value) => sum + value, 0);
  }, [data]);

  return (
    <section id="github" className="py-32 relative overflow-hidden" style={{ background: 'var(--background)' }}>

      <div
        className="absolute left-8 -top-12 text-[200px] font-bold opacity-[0.03] pointer-events-none select-none"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        04
      </div>

      <div className="max-w-[1440px] mx-auto px-8 relative z-10">

        <div
          className="text-[10px] mb-12 tracking-[0.2em]"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}
        >
          // OPEN SOURCE
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          {/* Left Column: Title & Heatmap */}
          <div className="flex flex-col gap-12">
            <div>
              <h2
                className="text-[48px] font-medium mb-4 leading-none"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                {title}
              </h2>
              <p
                className="text-[15px] font-light max-w-[500px]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: '1.7' }}
              >
                My open-source journey visualized. I believe in contributing back to the community and building tools that solve real problems.
              </p>
            </div>

            <div
              className="p-8 backdrop-blur-sm"
              style={{
                background: 'rgba(17, 17, 24, 0.4)',
                border: '1px solid var(--border)',
                borderRadius: '16px'
              }}
            >
              {loading ? (
                <div className="h-[160px] flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : error ? (
                <div className="h-[160px] flex items-center justify-center text-[14px]" style={{ color: 'var(--highlight)' }}>
                  {error}
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto pb-4 scrollbar-hide">
                    <div className="inline-grid grid-flow-col gap-[3px]">
                      {weeks.map((week, weekIndex) => (
                        <div key={`week-${weekIndex}`} className="grid grid-rows-7 gap-[3px]">
                          {week.map((day, dayIndex) => (
                            <motion.div
                              key={`day-${weekIndex}-${dayIndex}`}
                              title={day.date ? `${day.date}: ${day.count} contributions` : 'No data'}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: (weekIndex * 7 + dayIndex) * 0.0005 }}
                              className="w-[12px] h-[12px] rounded-[2px]"
                              style={{
                                backgroundColor: day.date ? LEVEL_COLORS[Math.min(day.level, 4)] : 'transparent',
                                border: day.date ? '1px solid rgba(255,255,255,0.02)' : 'none'
                              }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-[var(--border)]">
                    <div className="flex items-center gap-2 text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span>{totalContributions.toLocaleString()} TOTAL CONTRIBUTIONS</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      <span>Less</span>
                      <div className="flex gap-1">
                        {LEVEL_COLORS.map((c, i) => <div key={i} className="w-[10px] h-[10px] rounded-[1px]" style={{ backgroundColor: c }} />)}
                      </div>
                      <span>More</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Stats Card */}
          <div className="flex flex-col gap-6">
            <div
              className="p-8 h-full"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                position: 'relative'
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-mono">Profile Info</span>
                  <span className="text-[20px] font-medium text-[var(--text-primary)] font-display">@{username}</span>
                </div>
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(99,102,241,0.1)] transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--primary)]" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <StatItem icon={<Star className="w-4 h-4" />} label="Total Stars" value={stats?.totalStars ?? 0} />
                <StatItem icon={<Users className="w-4 h-4" />} label="Followers" value={stats?.followers ?? 0} />
                <StatItem icon={<GitBranch className="w-4 h-4" />} label="Public Repos" value={stats?.publicRepos ?? 0} />
                <StatItem icon={<Code2 className="w-4 h-4" />} label="Commits/Year" value={totalContributions} />
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] font-mono mb-4">Top Languages</div>
                <div className="flex flex-wrap gap-2">
                  {(stats?.topLanguages ?? ['Java', 'TypeScript', 'C++']).map(lang => (
                    <span
                      key={lang}
                      className="px-3 py-1.5 text-[12px] font-medium rounded-full"
                      style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.2)' }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-10">
                <div className="text-[13px] text-[var(--text-secondary)] font-light leading-relaxed italic">
                  "Code is like humor. When you have to explain it, it’s bad."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="flex flex-col gap-2 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)]">
      <div className="text-[var(--primary)]">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[18px] font-medium text-[var(--text-primary)] font-display">{value.toLocaleString()}</span>
        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-mono">{label}</span>
      </div>
    </div>
  );
}
