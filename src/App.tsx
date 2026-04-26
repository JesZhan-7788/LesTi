/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { questions } from './data/questions';
import { calculateResult } from './lib/scoring';
import { Character } from './types';
import { cn } from './lib/utils';
import { ArrowRight, RotateCcw, Map as MapIcon, Eye } from 'lucide-react';
import DevelopersMap from './components/DevelopersMap';
import { CharacterImage } from './components/CharacterImage';
import { characters } from './data/characters';

type ScreenState = 'WELCOME' | 'QUIZ' | 'RESULT' | 'DEV_MAP' | 'GALLERY';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('WELCOME');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Character | null>(null);
  const [showToast, setShowToast] = useState(false);

  const startQuiz = () => {
    setScreen('QUIZ');
    setCurrentQIndex(0);
    setAnswers({});
  };

  const handleAnswer = (optionIdx: number) => {
    const qId = questions[currentQIndex].id;
    const newAnswers = { ...answers, [qId]: optionIdx };
    setAnswers(newAnswers);

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      const charResult = calculateResult(newAnswers);
      setResult(charResult);
      setScreen('RESULT');
    }
  };

  const currentQ = questions[currentQIndex];
  const progress = ((currentQIndex + 1) / questions.length) * 100;

  const handleShare = () => {
    navigator.clipboard.writeText("https://lesti.pages.dev/");
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#EBE8E1] text-[#1D1D1F] font-sans selection:bg-[#1D1D1F] selection:text-[#EBE8E1] flex justify-center relative overflow-hidden">
      <div className="noise-overlay hidden sm:block"></div>
      <div className="w-full max-w-[480px] min-h-screen relative overflow-hidden flex flex-col bg-[#F3F1EB] shadow-[0_0_60px_rgba(0,0,0,0.05)] border-x border-[#E2E0D8]">
        <div className="noise-overlay"></div>
        <AnimatePresence mode="wait">
          {screen === 'WELCOME' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col p-8 relative"
            >
              <div className="absolute top-6 right-6 z-50 flex gap-2">
                <button 
                  onClick={() => setScreen('DEV_MAP')}
                  className="flex items-center gap-2 text-[9px] uppercase font-mono tracking-[0.2em] text-[#8C8B88] hover:text-[#111] transition-colors border border-transparent hover:border-[#D1CEC5] px-3 py-1.5"
                >
                  <MapIcon className="w-3 h-3" /> MAP
                </button>
                <button 
                  onClick={() => setScreen('GALLERY')}
                  className="flex items-center gap-2 text-[9px] uppercase font-mono tracking-[0.2em] text-[#8C8B88] hover:text-[#111] transition-colors border border-transparent hover:border-[#D1CEC5] px-3 py-1.5"
                >
                  <Eye className="w-3 h-3" /> PREVIEW
                </button>
              </div>

              <div className="absolute left-[-2px] sm:left-4 top-24 text-[110px] sm:text-[120px] font-serif italic text-[#E8E6DF] select-none z-0 tracking-tighter opacity-80 mix-blend-multiply">LESTI</div>
              
              <div className="z-10 relative flex flex-col h-full justify-between pt-16 pb-8">
                <div>
                  <p className="text-[10px] font-sans font-medium tracking-[0.4em] text-[#8C8B88] uppercase mb-8">Designed for Her</p>
                  <h1 className="text-[4rem] sm:text-[4.5rem] leading-[1] font-serif font-light mb-8 text-[#111] tracking-tight italic">
                    LesTi
                  </h1>
                  <div className="w-10 h-[1px] bg-[#111] mb-10 text-opacity-80"></div>
                  <p className="text-[14px] text-[#4A4946] leading-[2.2] max-w-[280px] font-serif tracking-wide font-light">
                    剥开潜意识的伪装，<br/>
                    触摸你真实的轮廓。<br/>
                    在27场光影的碎片里，<br/>
                    认领那个隐匿的自己。
                  </p>
                </div>
                <div className="mt-auto">
                  <button 
                    onClick={startQuiz}
                    className="group relative inline-flex items-center justify-center gap-6 overflow-hidden bg-[#111] px-8 py-5 w-full text-[11px] font-sans text-[#F3F1EB] uppercase tracking-[0.3em] transition-all hover:bg-black active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      Unveil The Answer
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500 ease-out" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {screen === 'DEV_MAP' && (
             <motion.div
               key="devmap"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="flex-1 flex flex-col bg-[#E5E7EB]"
             >
                <div className="p-4 bg-[#1D1D1F] text-white flex justify-between items-center shadow-md z-10">
                   <h2 className="text-xs uppercase tracking-widest font-bold">Characters Distribution</h2>
                   <button 
                     onClick={() => setScreen('WELCOME')}
                     className="text-[10px] uppercase tracking-widest border border-white/30 px-3 py-1 hover:bg-white/10"
                   >
                     Close
                   </button>
                </div>
                <DevelopersMap />
             </motion.div>
          )}

          {screen === 'GALLERY' && (
             <motion.div
               key="gallery"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="flex-1 flex flex-col bg-[#F3F1EB] overflow-y-auto"
             >
                <div className="sticky top-0 p-4 bg-[#1D1D1F] text-white flex justify-between items-center shadow-md z-20">
                   <h2 className="text-xs uppercase tracking-widest font-bold">Result Previews</h2>
                   <button 
                     onClick={() => setScreen('WELCOME')}
                     className="text-[10px] uppercase tracking-widest border border-white/30 px-3 py-1 hover:bg-white/10"
                   >
                     Close
                   </button>
                </div>
                <div className="grid grid-cols-2 gap-px bg-[#D1CEC5] p-px">
                  {characters.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setResult(c);
                        setScreen('RESULT');
                      }}
                      className="bg-[#F3F1EB] p-4 text-left hover:bg-[#111] hover:text-[#F3F1EB] transition-colors group aspect-square flex flex-col justify-end relative overflow-hidden"
                    >
                      <img src={`/images/${c.id}-bg.png`} className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none" />
                      <div className="relative z-10">
                        <p className="text-[9px] uppercase font-mono mb-1 mix-blend-multiply text-[#8C8B88] group-hover:text-white/60">{c.work}</p>
                        <h3 className="font-serif text-lg leading-tight">{c.name}</h3>
                      </div>
                    </button>
                  ))}
                </div>
             </motion.div>
          )}

          {screen === 'QUIZ' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col pt-16 pb-12 px-8 bg-[#F3F1EB] relative"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#E8E6DF]">
                <motion.div 
                  className="h-full bg-[#111]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQ.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-14">
                      <span className="font-serif italic text-4xl text-[#D1CEC5] mr-4 mb-4 inline-block">
                        {String(currentQIndex + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-2xl font-serif text-[#111] leading-[1.6] tracking-wide">
                        {currentQ.text}
                      </h2>
                    </div>

                    <div className="flex flex-col gap-4">
                      {currentQ.options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAnswer(idx)}
                          className="w-full text-left p-5 sm:p-6 border border-[#D1CEC5] hover:border-[#111] active:border-[#111] bg-white/40 hover:bg-[#111] active:bg-[#111] text-sm text-[#4A4946] hover:text-[#F3F1EB] active:text-[#F3F1EB] transition-all duration-300 ease-out font-serif tracking-wide block relative overflow-hidden group active:scale-[0.98]"
                        >
                          <span className="relative z-10">{option.text}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {screen === 'RESULT' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col relative bg-[#F3F1EB] overflow-hidden"
            >
              {/* Background Image Container */}
              <div 
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ 
                  backgroundImage: `url('/images/${result.id}-bg.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 25%',
                  backgroundRepeat: 'no-repeat'
                }}
              />

              <AnimatePresence>
                {showToast && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, x: '-50%' }}
                    animate={{ opacity: 1, y: 0, x: '-50%' }}
                    exit={{ opacity: 0, y: -20, x: '-50%' }}
                    className="fixed top-8 left-1/2 z-50 bg-[#111] text-[#F3F1EB] px-6 py-3 rounded-full text-xs font-sans tracking-widest uppercase shadow-2xl whitespace-nowrap"
                  >
                    网址已复制，去粘贴分享吧
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10 flex-1 overflow-y-auto px-8 pt-10 pb-[120px] sm:pb-[140px] flex flex-col justify-start">
                <div className="mb-6">
                  <p className="text-[12px] text-[#8C8B88] font-serif tracking-widest mb-2 uppercase text-glow-white">
                    LESTI·你是
                  </p>
                  <h2 className="text-[3.5rem] sm:text-[4rem] font-serif leading-[1.1] text-[#111] tracking-tight text-glow-white mb-2">
                    {result.name}
                  </h2>
                  <p className="text-[14px] text-[#8C8B88] font-serif tracking-widest mb-3 uppercase text-glow-white">
                    《{result.work}》
                  </p>
                </div>

                <div className="relative mb-8">
                  <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#111]"></div>
                  <div className="pl-6 flex flex-col gap-4 py-1 text-glow-white">
                    <p className="text-[20px] sm:text-[22px] text-[#222] leading-relaxed font-serif italic">
                      {result.quoteEn || "Lesbians think friendship is another word for foreplay!"}
                    </p>
                    <p className="text-[14px] sm:text-[15px] text-[#666] leading-relaxed font-serif">
                      {result.quoteCn || "女同性恋总把友谊当成前戏的代名词！"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-8">
                  {result.tags.map((tag, idx) => (
                    <span key={idx} className="text-[12px] tracking-widest font-serif text-[#4A4946] border border-[#D1CEC5] px-4 py-2 bg-[#F3F1EB]/60 shadow-sm backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-[13px] font-serif tracking-[0.4em] uppercase text-[#8C8B88] text-glow-white">
                    ANALYSIS
                  </h3>
                  <p className="text-[15px] sm:text-[16px] text-[#333] leading-[2.2] font-serif text-justify text-glow-white">
                    {result.description}
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-[13px] font-serif tracking-[0.4em] uppercase text-[#8C8B88] text-glow-white">
                    TO YOU
                  </h3>
                  <p className="text-[15px] sm:text-[16px] text-[#333] leading-[2.2] font-serif text-justify text-glow-white">
                    {result.whisper}
                  </p>
                </div>
              </div>

              {/* Floating Footer Toolbar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 sm:pb-10 z-20 pointer-events-none flex items-end">
                <div className="w-full max-w-[400px] mx-auto flex gap-4 pointer-events-auto">
                  <button 
                    onClick={() => setScreen('WELCOME')}
                    className="flex-1 flex items-center justify-center gap-3 bg-[#111] text-[#F3F1EB] py-4 text-[11px] uppercase font-serif tracking-[0.3em] hover:bg-black transition-colors group relative overflow-hidden shadow-xl"
                  >
                    <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" /> RESTART
                  </button>
                  <button 
                    onClick={handleShare}
                    className="flex-1 bg-[#F3F1EB]/90 backdrop-blur-md border border-[#111] text-[#111] py-4 text-[11px] uppercase font-serif tracking-[0.3em] hover:bg-[#E8E6DF] active:bg-[#E8E6DF] transition-colors shadow-xl"
                  >
                    SHARE
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
