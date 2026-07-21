import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, Smartphone, Monitor, Tablet, Globe2, ArrowUpRight } from 'lucide-react';
import { mockAnalyticsData } from '../../data/dashboardData';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Top Performance Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-mono text-slate-400">Conversion Rate</span>
          <div className="text-3xl font-extrabold text-white text-gradient-blue-purple mt-1">
            {mockAnalyticsData.conversionRate}%
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Visitors taking contact CTA action</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-mono text-slate-400">Avg Session Duration</span>
          <div className="text-3xl font-extrabold text-white text-gradient-cyan-blue mt-1">
            {mockAnalyticsData.avgDuration}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">+42s above tech portfolio benchmark</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-white/10">
          <span className="text-xs font-mono text-slate-400">Global Edge Nodes</span>
          <div className="text-3xl font-extrabold text-white text-gradient-purple-pink mt-1">
            28 / 28
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Sub-30ms global response time</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SVG Interactive Traffic Curve Line Chart */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent-cyan" />
                <span>Pageviews & Unique Visitors (7-Day Trend)</span>
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">Live Real-time</span>
          </div>

          {/* SVG Line Graph */}
          <div className="h-64 w-full pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 200">
              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Gradient Definition */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area Fill */}
              <path
                d="M 0,140 Q 80,100 160,60 T 320,30 T 500,10 L 500,200 L 0,200 Z"
                fill="url(#chartGradient)"
              />

              {/* Smooth Path */}
              <path
                d="M 0,140 Q 80,100 160,60 T 320,30 T 500,10"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="3"
              />

              {/* Data Points */}
              <circle cx="160" cy="60" r="5" fill="#EC4899" className="animate-ping" />
              <circle cx="160" cy="60" r="5" fill="#EC4899" />
              <circle cx="320" cy="30" r="5" fill="#3B82F6" />
              <circle cx="500" cy="10" r="5" fill="#06B6D4" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-4 border-t border-white/10">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Traffic Sources Breakdown */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-white/10">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-accent-violet" />
            <span>Traffic Channels</span>
          </h3>

          <div className="space-y-4 pt-2">
            {mockAnalyticsData.trafficSources.map((source) => (
              <div key={source.source} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300">{source.source}</span>
                  <span className="font-bold text-white">{source.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${source.percentage}%`, backgroundColor: source.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Device Split */}
          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            <h4 className="text-xs font-bold text-slate-300">Device Platform Split</h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <Monitor className="w-4 h-4 text-accent-blue mx-auto mb-1" />
                <div className="font-bold text-white">68%</div>
                <div className="text-[10px] text-slate-400">Desktop</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <Smartphone className="w-4 h-4 text-accent-cyan mx-auto mb-1" />
                <div className="font-bold text-white">24%</div>
                <div className="text-[10px] text-slate-400">Mobile</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <Tablet className="w-4 h-4 text-accent-pink mx-auto mb-1" />
                <div className="font-bold text-white">8%</div>
                <div className="text-[10px] text-slate-400">Tablet</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
