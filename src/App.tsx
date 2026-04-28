/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { questions } from './data/questions';
import { characters } from './data/characters';
import { calculateResult } from './lib/scoring';
import { Character } from './types';
import { cn } from './lib/utils';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { CharacterImage } from './components/CharacterImage';

type ScreenState = 'WELCOME' | 'QUIZ' | 'RESULT';

const prefetchedResultBackgrounds = new Set<string>();
let quizBackgroundPrimed = false;
const resultBackgroundHref = (id: string) => `/images/${id}-bg.jpg`;
const quizBackgroundHref = '/images/quiz-bg.jpg';
const RESULT_PREFETCH_CONCURRENCY = 6;

const warmImage = (href: string, fetchPriority: 'high' | 'low' | 'auto' = 'auto') =>
  new Promise<void>((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.setAttribute('fetchpriority', fetchPriority);
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = href;
  });

export default function App() {
  const previewParams = new URLSearchParams(window.location.search);
  const previewCharacterId = previewParams.get('preview');
  const hideBackground = previewParams.get('bg') === 'off';
  const previewCharacter = characters.find((character) => character.id === previewCharacterId) ?? null;
  const [screen, setScreen] = useState<ScreenState>(previewCharacter ? 'RESULT' : 'WELCOME');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Character | null>(previewCharacter);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [homeBackgroundLoaded, setHomeBackgroundLoaded] = useState(false);
  const [quizBackgroundLoaded, setQuizBackgroundLoaded] = useState(quizBackgroundPrimed);

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
  const displayWork = result?.work === '历史真实人物' || result?.work.startsWith('《') ? result.work : `《${result?.work}》`;

  useEffect(() => {
    if (!result || hideBackground) return;

    const href = resultBackgroundHref(result.id);
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = href;
    document.head.appendChild(preloadLink);

    const img = new Image();
    img.decoding = 'async';
    img.setAttribute('fetchpriority', 'high');
    img.src = href;

    return () => {
      if (document.head.contains(preloadLink)) {
        document.head.removeChild(preloadLink);
      }
    };
  }, [hideBackground, result]);

  useEffect(() => {
    if (hideBackground || quizBackgroundLoaded) return;
    if (!homeBackgroundLoaded && screen !== 'QUIZ') return;

    let cancelled = false;

    void warmImage(quizBackgroundHref, 'high').then(() => {
      if (cancelled) return;
      quizBackgroundPrimed = true;
      setQuizBackgroundLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, [hideBackground, homeBackgroundLoaded, quizBackgroundLoaded, screen]);

  useEffect(() => {
    if (hideBackground || screen !== 'QUIZ' || !quizBackgroundLoaded) return;

    const queue = characters
      .map((character) => character.id)
      .filter((id) => !prefetchedResultBackgrounds.has(id));

    if (!queue.length) return;

    let cancelled = false;

    const workers = Array.from({ length: Math.min(RESULT_PREFETCH_CONCURRENCY, queue.length) }, (_, workerIndex) => {
      const priority: 'high' | 'auto' = workerIndex < 2 ? 'high' : 'auto';

      return (async () => {
        while (!cancelled) {
          const id = queue.shift();
          if (!id) return;
          prefetchedResultBackgrounds.add(id);
          await warmImage(resultBackgroundHref(id), priority);
        }
      })();
    });

    void Promise.allSettled(workers);

    return () => {
      cancelled = true;
    };
  }, [hideBackground, quizBackgroundLoaded, screen]);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  };

  const handleShare = async () => {
    const shareUrl = "https://lesti.pages.dev/";

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'LESTI',
          text: '测测你是哪位女同角色',
          url: shareUrl,
        });
        showToast('分享面板已打开');
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        showToast('网址已复制，去粘贴分享吧');
        return;
      }

      if (fallbackCopyText(shareUrl)) {
        showToast('网址已复制，去粘贴分享吧');
        return;
      }

      showToast('当前环境不支持自动复制');
    } catch (error) {
      if ((error as DOMException | undefined)?.name === 'AbortError') {
        return;
      }
      if (fallbackCopyText(shareUrl)) {
        showToast('网址已复制，去粘贴分享吧');
        return;
      }
      showToast('复制失败，请手动复制链接');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F1EB] text-[#1D1D1F] font-sans selection:bg-[#1D1D1F] selection:text-[#F3F1EB] flex justify-center relative overflow-hidden">
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
              className="relative flex-1 overflow-hidden bg-[#F3F1EB]"
            >
              <img
                src="/images/home-bg.jpg"
                alt=""
                className="absolute inset-0 z-0 h-full w-full object-cover object-center"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onLoad={() => setHomeBackgroundLoaded(true)}
              />

              <div className="relative z-10 flex h-full flex-col px-8 py-10">
                <div className="flex flex-[0.86] flex-col items-center justify-center text-center">
                  <p className="mb-5 font-serif-sc text-[0.95rem] leading-[1.8] tracking-[0.16em] text-[#8C8B88]">
                    拉拉图鉴
                  </p>
                  <h1 className="mb-5 text-[4rem] sm:text-[4.5rem] leading-[1] font-serif font-light text-[#111] tracking-tight uppercase not-italic">
                    LESTI
                  </h1>
                </div>
                <div className="absolute inset-x-8 bottom-[30vh]">
                  <button 
                    onClick={startQuiz}
                    className="group relative inline-flex items-center justify-center gap-4 px-8 py-5 w-full text-[18px] font-serif-sc text-[#8C8B88] tracking-[0.1em] transition-all hover:text-[#111] active:scale-[0.98]"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      开始测试
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500 ease-out" />
                    </span>
                  </button>
                </div>
                <p className="absolute inset-x-8 bottom-10 text-center text-[11px] leading-[1.8] text-[#8C8B88]">
                  BY{' '}
                  <a
                    href="https://xhslink.com/m/9Oe7UaKX6LF"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#111] transition-colors"
                  >
                    77
                  </a>
                  {' & '}
                  <a
                    href="https://www.douban.com/people/136859616/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#111] transition-colors"
                  >
                    Jes
                  </a>
                </p>
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
              className="relative flex-1 overflow-hidden bg-[#F3F1EB]"
            >
              <img
                src="/images/quiz-bg.jpg"
                alt=""
                className="absolute inset-0 z-0 h-full w-full object-cover object-center"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />

              <div className="absolute top-0 left-0 right-0 z-10 h-1 bg-[#E8E6DF]">
                <motion.div 
                  className="h-full bg-[#111]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-center px-8 py-16">
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
              </div>
            </motion.div>
          )}

          {screen === 'RESULT' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative isolate flex-1 overflow-y-auto bg-[#F3F1EB]"
            >
              {!hideBackground && (
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <CharacterImage
                    id={`${result.id}-bg`}
                    alt=""
                    className={cn(
                      "h-full w-full object-cover object-center",
                      result.id === 'marina' && "scale-80",
                      result.id === 'tina' && "scale-90",
                      result.id === 'yuhuan' && "scale-[0.94]"
                    )}
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-[54%] bg-gradient-to-t from-[#F3F1EB]/78 via-[#F3F1EB]/38 to-transparent" />
                </div>
              )}

              <div className="relative z-10 min-h-screen p-8 pb-8">
                <AnimatePresence>
                  {toastMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, x: '-50%' }}
                      animate={{ opacity: 1, y: 0, x: '-50%' }}
                      exit={{ opacity: 0, y: -20, x: '-50%' }}
                      className="fixed top-8 left-1/2 z-50 bg-[#111] text-[#F3F1EB] px-6 py-3 rounded-full text-xs font-sans tracking-widest uppercase shadow-2xl whitespace-nowrap"
                    >
                      {toastMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex min-h-[calc(100vh-7rem)] flex-col">
                  <div className="mt-auto mb-10">
                    <p className="text-[14px] font-sans font-normal tracking-[0.18em] text-[#8C8B88] mb-3">
                      <span>LESTI·</span>
                      <span className="font-bold text-[#111]">你是</span>
                    </p>
                    <h2 className="text-[3.4rem] font-serif font-light leading-[0.95] text-[#111] tracking-tight mb-3">{result.name}</h2>
                    <p className="text-[14px] font-sans font-normal tracking-[0.18em] uppercase text-[#8C8B88] mb-8">{displayWork}</p>

                    {result.quote && (
                      <div className="mb-8">
                        <blockquote className="border-l-[3px] border-[#111] pl-5">
                          <p className={cn(
                            "text-[#111] leading-[1.55] mb-3",
                            result.quote.translation
                              ? "text-[22px] sm:text-[26px] font-serif italic"
                              : "text-[22px] sm:text-[26px] font-serif-sc font-normal not-italic tracking-[0.03em]"
                          )}>
                            {result.quote.original}
                          </p>
                          {result.quote.translation && (
                            <p className="text-[15px] text-[#7A7771] font-serif leading-[1.95]">
                              {result.quote.translation}
                            </p>
                          )}
                        </blockquote>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-10">
                      {result.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-sans tracking-widest px-3 py-1.5 border border-[#D1CEC5] text-[#4A4946] uppercase bg-white/40">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-[10px] font-sans font-bold tracking-[0.4em] text-[#8C8B88] uppercase mb-4">Analysis</p>
                    <p className="text-[14px] text-[#4A4946] font-serif leading-[2.15] text-justify tracking-wide">
                      {result.description}
                    </p>

                    <p className="text-[10px] font-sans font-bold tracking-[0.4em] text-[#8C8B88] uppercase mt-10 mb-4">TO YOU</p>
                    <p className="text-[14px] text-[#4A4946] font-serif leading-[2.15] text-justify tracking-wide">
                      {result.whisper}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Footer Toolbar */}
              <div className="sticky bottom-0 z-20 bg-[#F3F1EB]/90 backdrop-blur-md border-t border-[#D1CEC5] p-5 flex gap-4">
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
