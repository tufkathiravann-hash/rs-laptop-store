import React from 'react';
import { LaptopBenchmark } from '../../types/product';
import { Flame, Gauge, Battery, Activity, Award } from 'lucide-react';

interface BenchmarkBarsProps {
  benchmarks: LaptopBenchmark;
  laptopName: string;
}

export const BenchmarkBars: React.FC<BenchmarkBarsProps> = ({ benchmarks, laptopName }) => {
  // Benchmark scales
  const maxGeekSingle = 3500;
  const maxGeekMulti = 24000;
  const maxCinebench = 36000;
  const maxTimeSpy = 24000;
  const maxBattery = 24;

  const singlePercent = Math.min(100, Math.round((benchmarks.geekbenchSingle / maxGeekSingle) * 100));
  const multiPercent = Math.min(100, Math.round((benchmarks.geekbenchMulti / maxGeekMulti) * 100));
  const cinebenchPercent = Math.min(100, Math.round((benchmarks.cinebenchR23 / maxCinebench) * 100));
  const timeSpyPercent = benchmarks.timeSpy3DMark
    ? Math.min(100, Math.round((benchmarks.timeSpy3DMark / maxTimeSpy) * 100))
    : 0;
  const batteryPercent = Math.min(100, Math.round((benchmarks.batteryLifeHours / maxBattery) * 100));

  return (
    <div className="p-6 rounded-2xl bg-titanium-900/60 border border-white/5 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-cyber-cyan" />
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              Hardware Silicon Benchmarks
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified RS Lab test data running standard ambient 22°C test protocol.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <Award className="w-3.5 h-3.5" />
          <span>Lab Certified Grade A+</span>
        </div>
      </div>

      <div className="space-y-5">
        {/* Geekbench Single-Core */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Geekbench 6 (Single-Core)</span>
            <span className="font-mono text-cyber-cyan font-bold">
              {benchmarks.geekbenchSingle.toLocaleString()} pts
            </span>
          </div>
          <div className="w-full h-2.5 bg-titanium-950 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyber-cyan rounded-full transition-all duration-1000"
              style={{ width: `${singlePercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Average Laptop: 1,800</span>
            <span>Industry Peak: 3,500</span>
          </div>
        </div>

        {/* Geekbench Multi-Core */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Geekbench 6 (Multi-Core Processing)</span>
            <span className="font-mono text-indigo-400 font-bold">
              {benchmarks.geekbenchMulti.toLocaleString()} pts
            </span>
          </div>
          <div className="w-full h-2.5 bg-titanium-950 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000"
              style={{ width: `${multiPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Average Laptop: 8,500</span>
            <span>Workstation Peak: 24,000</span>
          </div>
        </div>

        {/* Cinebench R23 */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium">Cinebench R23 (Sustained 3D Render)</span>
            <span className="font-mono text-cyber-purple font-bold">
              {benchmarks.cinebenchR23.toLocaleString()} pts
            </span>
          </div>
          <div className="w-full h-2.5 bg-titanium-950 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyber-purple rounded-full transition-all duration-1000"
              style={{ width: `${cinebenchPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Entry Render: 10,000</span>
            <span>Extreme Liquid Cool: 36,000</span>
          </div>
        </div>

        {/* 3DMark Time Spy */}
        {benchmarks.timeSpy3DMark && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">3DMark Time Spy (DirectX 12 Graphics)</span>
              <span className="font-mono text-amber-400 font-bold">
                {benchmarks.timeSpy3DMark.toLocaleString()} pts
              </span>
            </div>
            <div className="w-full h-2.5 bg-titanium-950 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full transition-all duration-1000"
                style={{ width: `${timeSpyPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Standard Gaming: 8,000</span>
              <span>RTX 4090 Max TGP: 22,000+</span>
            </div>
          </div>
        )}

        {/* Battery Endurance */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Battery className="w-4 h-4 text-emerald-400" />
              <span>Real-World Video Playback Battery Endurance</span>
            </span>
            <span className="font-mono text-emerald-400 font-bold">
              {benchmarks.batteryLifeHours} Hours
            </span>
          </div>
          <div className="w-full h-2.5 bg-titanium-950 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000"
              style={{ width: `${batteryPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Average: 7.5 hrs</span>
            <span>All-Day Max: 22 hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
};
