import React from 'react';
import { characters } from '../data/characters';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, LabelList } from 'recharts';
import { CharacterImage } from './CharacterImage';

export default function DevelopersMap() {
  // Format data for Scatter plots
  const map1Data = characters.map(c => ({
    name: c.name,
    work: c.work,
    x: c.coords.boundary, // Boundary vs Fusion (-1 to 1)
    y: c.coords.burn      // Burn vs Restraint (-1 to 1)
  }));

  const map2Data = characters.map(c => ({
    name: c.name,
    work: c.work,
    x: c.coords.speak,   // Speak vs Silence (-1 to 1)
    y: c.coords.give     // Give vs Receive (-1 to 1)
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1D1D1F] text-white text-[10px] p-2 tracking-wider">
          <p className="font-bold mb-1">{data.name}</p>
          <p className="opacity-70">{data.work}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-[#E5E7EB] p-4 min-h-screen pb-24 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-[#FDFCFB] p-6 shadow-xl border border-white">
          <h3 className="text-center font-serif text-xl italic mb-1 text-[#1D1D1F]">Matrix 1: Emotional State</h3>
          <p className="text-center text-[10px] text-[#A1A1A1] uppercase tracking-widest mb-6">
            Y: 燃烧(+1) ↔ 克制(-1) | X: 边界(+1) ↔ 融合(-1)
          </p>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" dataKey="x" domain={[-1.2, 1.2]} tick={{fontSize: 10}} stroke="#A1A1A1" />
                <YAxis type="number" dataKey="y" domain={[-1.2, 1.2]} tick={{fontSize: 10}} stroke="#A1A1A1" />
                <ReferenceLine y={0} stroke="#1D1D1F" strokeOpacity={0.2} />
                <ReferenceLine x={0} stroke="#1D1D1F" strokeOpacity={0.2} />
                <Tooltip content={<CustomTooltip />} />
                <Scatter name="Characters" data={map1Data} fill="#1D1D1F">
                   <LabelList dataKey="name" position="bottom" style={{ fontSize: '9px', fill: '#666' }} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#FDFCFB] p-6 shadow-xl border border-white">
          <h3 className="text-center font-serif text-xl italic mb-1 text-[#1D1D1F]">Matrix 2: Love Language</h3>
          <p className="text-center text-[10px] text-[#A1A1A1] uppercase tracking-widest mb-6">
            Y: 给予(+1) ↔ 承接(-1) | X: 言说(+1) ↔ 沉默(-1)
          </p>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis type="number" dataKey="x" domain={[-1.2, 1.2]} tick={{fontSize: 10}} stroke="#A1A1A1" />
                <YAxis type="number" dataKey="y" domain={[-1.2, 1.2]} tick={{fontSize: 10}} stroke="#A1A1A1" />
                <ReferenceLine y={0} stroke="#1D1D1F" strokeOpacity={0.2} />
                <ReferenceLine x={0} stroke="#1D1D1F" strokeOpacity={0.2} />
                <Tooltip content={<CustomTooltip />} />
                <Scatter name="Characters" data={map2Data} fill="#1D1D1F">
                  <LabelList dataKey="name" position="bottom" style={{ fontSize: '9px', fill: '#666' }} />
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gallery Preview section for Images */}
        <div className="bg-[#FDFCFB] p-6 shadow-xl border border-white">
          <h3 className="text-center font-serif text-xl italic mb-1 text-[#1D1D1F]">Image Gallery Check</h3>
          <p className="text-center text-[10px] text-[#A1A1A1] uppercase tracking-widest mb-6">
            Preview /public/images/
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {characters.map(c => (
              <div key={c.id} className="relative aspect-[4/5] bg-gray-100 border border-gray-200 overflow-hidden group">
                {/* Fallback displayed under the image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 z-0 p-2 text-center">
                  <span className="text-[10px] font-mono mb-1 text-gray-500">{c.id}.*</span>
                  <span className="text-[8px] uppercase tracking-[0.2em] opacity-80">Not Uploaded</span>
                </div>
                {/* The actual image */}
                <CharacterImage
                  id={c.id}
                  alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  hideInitially={true}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 pointer-events-none">
                  <p className="text-[9px] text-[#FDFCFB] font-bold leading-tight font-sans tracking-wide uppercase">{c.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
