"use client";

import { useState, useEffect } from "react";

interface RegretLevel {
  level: number;
  title: string;
  description: string;
  meme: string;
  emoji: string;
  color: string;
  bgColor: string;
}

const regretLevels: RegretLevel[] = [
  {
    level: 0,
    title: "No Regrets",
    description: "You broke even or made a small gain. Not bad at all!",
    meme: "🤷‍♂️",
    emoji: "😐",
    color: "text-gray-400",
    bgColor: "bg-gray-500",
  },
  {
    level: 20,
    title: "Minor Regret",
    description: "Could've bought a nice dinner, but who's counting?",
    meme: "🍜",
    emoji: "😕",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500",
  },
  {
    level: 30,
    title: "Ouch Territory",
    description:
      "You missed out on a weekend getaway. Hope you enjoyed those lattes.",
    meme: "☕",
    emoji: "😬",
    color: "text-orange-400",
    bgColor: "bg-orange-500",
  },
  {
    level: 40,
    title: "Getting Painful",
    description: "You could've bought a car... but instead you have memories.",
    meme: "🚗",
    emoji: "😤",
    color: "text-orange-500",
    bgColor: "bg-orange-600",
  },
  {
    level: 50,
    title: "Serious Regret",
    description:
      "You missed buying a house. Time to live with your parents forever.",
    meme: "🏠",
    emoji: "😭",
    color: "text-red-400",
    bgColor: "bg-red-500",
  },
  {
    level: 60,
    title: "Existential Crisis",
    description:
      "You could've retired early. Instead, you're reading this calculator.",
    meme: "🏝️",
    emoji: "🤡",
    color: "text-red-500",
    bgColor: "bg-red-600",
  },
  {
    level: 70,
    title: "Life Choices: Questionable",
    description:
      "You missed generational wealth. Your great-grandkids will judge you.",
    meme: "👶",
    emoji: "💀",
    color: "text-purple-400",
    bgColor: "bg-purple-600",
  },
  {
    level: 80,
    title: "Legendary Mistake",
    description:
      "You could've bought a private island. Instead, you have debt.",
    meme: "🏴‍☠️",
    emoji: "☠️",
    color: "text-purple-500",
    bgColor: "bg-purple-700",
  },
  {
    level: 90,
    title: "Cosmic Level Regret",
    description:
      "You missed becoming a Bitcoin billionaire. NASA called, they need you for space missions to cry about this.",
    meme: "🚀",
    emoji: "👽",
    color: "text-pink-400",
    bgColor: "bg-pink-600",
  },
  {
    level: 100,
    title: "Maximum Destruction",
    description:
      "You could've bought countries. The universe is laughing at you.",
    meme: "🌍",
    emoji: "🤯",
    color: "text-red-400",
    bgColor: "bg-red-600",
  },
];

export function RegretMeter({ regretLevel }: { regretLevel: number }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLevel(regretLevel);
      setTimeout(() => setAnimationComplete(true), 1000);
    }, 500);

    return () => clearTimeout(timer);
  }, [regretLevel]);

  const getRegretData = (level: number): RegretLevel => {
    if (level >= 100) return regretLevels[9];
    if (level >= 90) return regretLevels[8];
    if (level >= 80) return regretLevels[7];
    if (level >= 70) return regretLevels[6];
    if (level >= 60) return regretLevels[5];
    if (level >= 50) return regretLevels[4];
    if (level >= 40) return regretLevels[3];
    if (level >= 30) return regretLevels[2];
    if (level >= 20) return regretLevels[1];
    return regretLevels[0];
  };

  const currentRegret = getRegretData(currentLevel);

  return (
    <div className="modern-card p-8 md:p-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h3 className="heading-secondary mb-6">🎭 Regret Meter</h3>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Analyzing your life choices on a scale from &quot;Meh&quot; to
          &quot;Existence is Pain&quot;
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-10">
        <div className="flex justify-between text-sm text-gray-400 mb-4 font-medium">
          <span>No Regret</span>
          <span>Maximum Regret</span>
        </div>
        <div className="modern-progress w-full h-8 rounded-lg">
          <div
            className="modern-progress-bar h-full transition-all duration-2000 ease-out relative rounded-lg"
            style={{ width: `${currentLevel}%` }}
          />
        </div>
        <div className="text-right mt-4">
          <span className="text-blue-400 font-bold text-xl">
            {currentLevel}% Regret Level
          </span>
        </div>
      </div>

      {/* Regret Level Display */}
      <div
        className={`text-center transition-all duration-1000 ${
          animationComplete ? "scale-100 opacity-100" : "scale-90 opacity-70"
        }`}
      >
        <div className="text-5xl md:text-6xl mb-6 animate-bounce-slow">
          {currentRegret.meme}
        </div>

        <div className="mb-4">
          <span className="text-4xl animate-pulse">{currentRegret.emoji}</span>
        </div>

        <h4
          className={`text-2xl md:text-3xl font-bold ${currentRegret.color} mb-6`}
        >
          {currentRegret.title}
        </h4>

        <div className="text-gray-300 text-base md:text-lg leading-relaxed max-w-lg mx-auto bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          {currentRegret.description}
        </div>

        {/* Meme Reactions */}
        {currentLevel >= 50 && (
          <div className="mt-8 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl mb-2">😢</div>
              <div className="text-sm text-gray-400">You</div>
            </div>
            {currentLevel >= 70 && (
              <div className="text-center">
                <div className="text-3xl mb-2">😂</div>
                <div className="text-sm text-gray-400">Everyone else</div>
              </div>
            )}
            {currentLevel >= 90 && (
              <div className="text-center">
                <div className="text-3xl mb-2">🤑</div>
                <div className="text-sm text-gray-400">Satoshi</div>
              </div>
            )}
          </div>
        )}

        {/* Funny Quotes */}
        {currentLevel >= 80 && (
          <div className="mt-8 p-6 bg-gray-800/30 border border-gray-700 rounded-xl">
            <p className="text-gray-300 italic text-base md:text-lg">
              &quot;I&apos;m not saying you made a mistake, but even my
              dog&apos;s investment advice would&apos;ve been better.&quot;
            </p>
            <p className="text-gray-500 text-sm mt-3">- The Internet</p>
          </div>
        )}
      </div>

      {/* Therapy Suggestion */}
      {currentLevel >= 60 && (
        <div className="mt-8 p-6 warning-card rounded-xl">
          <p className="text-center text-gray-200 text-base md:text-lg">
            <span className="font-bold text-yellow-400">
              Therapy Recommendation:
            </span>{" "}
            <span className="text-yellow-300">
              {currentLevel >= 90 ? "Urgent" : "Strongly Advised"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
