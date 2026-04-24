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
import { ArrowRight, RotateCcw, Map as MapIcon } from 'lucide-react';
import DevelopersMap from './components/DevelopersMap';
import { CharacterImage } from './components/CharacterImage';

type ScreenState = 'WELCOME' | 'QUIZ' | 'RESULT' | 'DEV_MAP';

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
              className="flex-1 overflow-y-auto bg-[#F3F1EB]"
            >
              <div className="p-8 pb-24 relative">
                <div className="absolute right-2 top-16 text-[80px] font-serif italic text-[#E8E6DF] select-none z-0 writing-vertical-lr tracking-tighter mix-blend-multiply opacity-60">PROFILE</div>

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

                <div className="relative z-10">
                  <p className="text-[10px] font-sans font-medium tracking-[0.4em] text-[#8C8B88] uppercase mb-6 mt-8">Matching Result</p>
                  
                  <div className="relative w-full aspect-[4/5] border-[8px] border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden bg-[#E8E6DF] mb-10 group">
                    <CharacterImage
                      id={result.id}
                      alt={result.name}
                      className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-[#A19D91] gap-y-2 flex-col italic text-sm -z-10">
                      <svg className="w-8 h-8 opacity-40 mb-2" fill="none" strokeWidth="1" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span className="text-[9px] uppercase font-sans tracking-[0.3em]">[ IMAGE PENDING ]</span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-[#F3F1EB] z-20">
                      <p className="text-[9px] tracking-[0.3em] font-sans font-medium uppercase opacity-90 mb-3">{result.work}</p>
                      <h2 className="text-[2.5rem] font-serif font-light leading-none drop-shadow-lg tracking-tight">{result.name}</h2>
                    </div>
                  </div>

                  <div className="mb-10">
                    <blockquote className="text-xl sm:text-2xl font-serif italic text-[#111] leading-relaxed mb-8 border-l-[3px] border-[#111] pl-5">
                      {result.whisper}
                    </blockquote>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {result.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-sans tracking-widest px-3 py-1.5 border border-[#D1CEC5] text-[#4A4946] uppercase bg-white/40">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-[10px] font-sans font-bold tracking-[0.4em] text-[#8C8B88] uppercase mb-4">Character Analysis</p>
                    <p className="text-[13px] text-[#4A4946] font-serif leading-[2.2] text-justify tracking-wide">
                      {result.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Footer Toolbar */}
              <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-[#F3F1EB]/90 backdrop-blur-md border-t border-[#D1CEC5] p-5 flex gap-4">
                <button 
                  onClick={() => setScreen('WELCOME')}
                  className="flex-1 flex items-center justify-center gap-3 bg-[#111] text-[#F3F1EB] py-4 text-[10px] uppercase font-sans tracking-[0.3em] hover:bg-black transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Restart
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 bg-transparent border border-[#111] text-[#111] py-4 text-[10px] uppercase font-sans tracking-[0.3em] hover:bg-[#E8E6DF] active:bg-[#E8E6DF] transition-colors"
                >
                  Share
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
