import React from 'react';
import { Laptop } from '../../types/product';
import {
  Cpu,
  Tv,
  HardDrive,
  Battery,
  Layers,
  Shield,
  Box,
  Wifi,
  Sparkles
} from 'lucide-react';

interface ProductSpecTableProps {
  laptop: Laptop;
}

export const ProductSpecTable: React.FC<ProductSpecTableProps> = ({ laptop }) => {
  const specSections = [
    {
      title: 'Processor & Silicon',
      icon: <Cpu className="w-4 h-4 text-cyber-cyan" />,
      items: [
        { label: 'CPU Model', value: laptop.specs.processor },
        { label: 'Architecture', value: 'Latest Gen Performance Hybrid / Apple Silicon / Zen 4' },
        { label: 'Thermal Solution', value: 'Vapor Chamber + Conductonaut Liquid Metal' }
      ]
    },
    {
      title: 'Graphics & Visuals',
      icon: <Tv className="w-4 h-4 text-indigo-400" />,
      items: [
        { label: 'Discrete GPU', value: laptop.specs.gpu },
        { label: 'Display Panel', value: laptop.specs.display },
        { label: 'Native Resolution', value: laptop.specs.displayResolution },
        { label: 'Refresh Rate', value: laptop.specs.refreshRate },
        { label: 'Color Gamut', value: '100% DCI-P3 Cinema Grade / Factory Calibrated' }
      ]
    },
    {
      title: 'Memory & Storage',
      icon: <HardDrive className="w-4 h-4 text-emerald-400" />,
      items: [
        { label: 'Installed RAM', value: laptop.specs.ram },
        { label: 'Storage Drive', value: laptop.specs.storage },
        { label: 'Expandability', value: 'Dual M.2 Gen4 NVMe Slots / Modular Bays' }
      ]
    },
    {
      title: 'Battery & Thermals',
      icon: <Battery className="w-4 h-4 text-amber-400" />,
      items: [
        { label: 'Battery Capacity', value: laptop.specs.battery },
        { label: 'Battery Runtime', value: `Up to ${laptop.benchmarks.batteryLifeHours} Hours` },
        { label: 'Charging Standard', value: 'USB-C Power Delivery / High-Wattage GaN' }
      ]
    },
    {
      title: 'Chassis & Connectivity',
      icon: <Wifi className="w-4 h-4 text-purple-400" />,
      items: [
        { label: 'Weight', value: laptop.specs.weight },
        { label: 'Wireless Networking', value: laptop.specs.wireless },
        { label: 'Webcam & Biometrics', value: laptop.specs.webcam },
        { label: 'I/O Ports', value: laptop.specs.ports.join(' • ') }
      ]
    },
    {
      title: 'Included in the Box',
      icon: <Box className="w-4 h-4 text-rose-400" />,
      items: [
        { label: 'Package Contents', value: laptop.inTheBox.join(' • ') },
        { label: 'RS Warranty Cover', value: laptop.warranty }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {specSections.map((sec, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-titanium-900/60 border border-white/5 space-y-3.5 hover:border-white/10 transition-colors"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              {sec.icon}
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                {sec.title}
              </h4>
            </div>

            <div className="space-y-2.5 text-xs">
              {sec.items.map((item, itemIdx) => (
                <div key={itemIdx} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <span className="text-slate-400 font-medium sm:w-1/3 shrink-0">
                    {item.label}
                  </span>
                  <span className="text-slate-200 font-mono sm:text-right sm:w-2/3 leading-relaxed">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
