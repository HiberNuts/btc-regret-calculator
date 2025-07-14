"use client";

import { useState, useEffect } from "react";
import { Bitcoin, TrendingUp, Calendar, DollarSign } from "lucide-react";

interface CalculationResult {
  btcAmount: number;
  investedAmount: number;
  currentValue: number;
  profit: number;
  regretLevel: number;
  pastPrice: number;
  currentPrice: number;
  selectedDate: string;
}

export function ResultsDisplay({ result }: { result: CalculationResult }) {
  const [animatedValues, setAnimatedValues] = useState({
    btcAmount: 0,
    currentValue: 0,
    profit: 0,
  });

  useEffect(() => {
    const animationDuration = 2000; // 2 seconds
    const steps = 60; // 60 FPS
    const stepDuration = animationDuration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedValues({
        btcAmount: result.btcAmount * easeOutQuart,
        currentValue: result.currentValue * easeOutQuart,
        profit: result.profit * easeOutQuart,
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedValues({
          btcAmount: result.btcAmount,
          currentValue: result.currentValue,
          profit: result.profit,
        });
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [result]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatBTC = (amount: number) => {
    return amount.toFixed(8);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const profitMultiplier = result.currentValue / result.investedAmount;
  const profitPercentage =
    ((result.currentValue - result.investedAmount) / result.investedAmount) *
    100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="heading-secondary mb-4">📊 Investment Analysis</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Here&apos;s what your Bitcoin investment would look like today
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Investment Details */}
        <div className="modern-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-400">
              ⏰ Investment Details
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium text-sm">
                Purchase Date:
              </span>
              <span className="text-gray-200 font-semibold text-sm">
                {formatDate(result.selectedDate)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium text-sm">
                Amount Invested:
              </span>
              <span className="text-gray-200 font-semibold text-sm">
                {formatCurrency(result.investedAmount)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium text-sm">
                BTC Price Then:
              </span>
              <span className="text-gray-200 font-semibold text-sm">
                {formatCurrency(result.pastPrice)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-400 font-medium text-sm">
                BTC Price Now:
              </span>
              <span className="text-gray-200 font-semibold text-sm">
                {formatCurrency(result.currentPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* BTC Amount */}
        <div className="modern-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bitcoin className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-orange-400">
              ₿ Bitcoin Holdings
            </h3>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-4">
              ₿ {formatBTC(animatedValues.btcAmount)}
            </div>
            <p className="text-gray-400 font-medium text-sm">
              Total Bitcoin you would own
            </p>
          </div>
        </div>
      </div>

      {/* Current Value - Big Display */}
      <div className="success-card rounded-xl p-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold text-green-400">
              Current Value
            </h3>
          </div>

          <div className="text-4xl md:text-5xl font-bold text-green-400 mb-3">
            {formatCurrency(animatedValues.currentValue)}
          </div>

          <p className="text-green-300 text-base opacity-90">
            What your investment would be worth today
          </p>
        </div>
      </div>

      {/* Profit/Loss Display */}
      <div
        className={`${
          result.profit > 0 ? "success-card" : "error-card"
        } rounded-xl p-8`}
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <DollarSign
              className={`w-6 h-6 ${
                result.profit > 0 ? "text-green-400" : "text-red-400"
              }`}
            />
            <h3
              className={`text-xl font-semibold ${
                result.profit > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {result.profit > 0 ? "Profit" : "Loss"}
            </h3>
          </div>

          <div
            className={`text-4xl md:text-5xl font-bold mb-3 ${
              result.profit > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {result.profit > 0 ? "+" : ""}
            {formatCurrency(animatedValues.profit)}
          </div>

          <div className="space-y-2">
            <p
              className={`text-lg font-semibold ${
                result.profit > 0 ? "text-green-300" : "text-red-300"
              }`}
            >
              {profitPercentage > 0 ? "+" : ""}
              {profitPercentage.toFixed(0)}% return
            </p>

            <p className="text-gray-300 text-base">
              Your money would have multiplied by{" "}
              <span className="font-bold text-white">
                {profitMultiplier.toFixed(1)}x
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Fun Facts */}
      <div className="modern-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6 text-center">
          🎯 Fun Facts About Your Investment
        </h3>

        <div className="grid md:grid-cols-2 gap-4 text-center">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-2xl mb-2">⏰</div>
            <p className="text-gray-300 text-sm font-medium">
              Days since you could have bought:{" "}
              <span className="text-white font-bold">
                {Math.floor(
                  (Date.now() - new Date(result.selectedDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}
              </span>
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-2xl mb-2">🍕</div>
            <p className="text-gray-300 text-sm font-medium">
              You could buy{" "}
              <span className="text-white font-bold">
                {Math.floor(result.currentValue / 25)}
              </span>{" "}
              pizzas with that money now
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-2xl mb-2">☕</div>
            <p className="text-gray-300 text-sm font-medium">
              That&apos;s{" "}
              <span className="text-white font-bold">
                {Math.floor(result.currentValue / 5)}
              </span>{" "}
              Starbucks coffees worth of value
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-2xl mb-2">🎮</div>
            <p className="text-gray-300 text-sm font-medium">
              You could have bought{" "}
              <span className="text-white font-bold">
                {Math.floor(result.currentValue / 500)}
              </span>{" "}
              PlayStation 5s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
