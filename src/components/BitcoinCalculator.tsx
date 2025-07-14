"use client";

import { useState } from "react";
import { Calculator, TrendingUp, RotateCcw, DollarSign } from "lucide-react";
import { RegretMeter } from "./RegretMeter";
import { ResultsDisplay } from "./ResultsDisplay";

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

export function BitcoinCalculator() {
  const [amount, setAmount] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const calculateRegret = async () => {
    if (!amount || !selectedDate) {
      setError("Please enter both amount and date");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bitcoin-price", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate,
          amount: parseFloat(amount),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Bitcoin price");
      }

      const data = await response.json();

      const btcAmount = parseFloat(amount) / data.pastPrice;
      const currentValue = btcAmount * data.currentPrice;
      const profit = currentValue - parseFloat(amount);
      const profitMultiplier = currentValue / parseFloat(amount);

      // Calculate regret level (0-100) based on profit multiplier
      let regretLevel = 0;
      if (profitMultiplier > 1000) regretLevel = 100;
      else if (profitMultiplier > 500) regretLevel = 90;
      else if (profitMultiplier > 100) regretLevel = 80;
      else if (profitMultiplier > 50) regretLevel = 70;
      else if (profitMultiplier > 20) regretLevel = 60;
      else if (profitMultiplier > 10) regretLevel = 50;
      else if (profitMultiplier > 5) regretLevel = 40;
      else if (profitMultiplier > 2) regretLevel = 30;
      else if (profitMultiplier > 1.5) regretLevel = 20;
      else regretLevel = 10;

      setResult({
        btcAmount,
        investedAmount: parseFloat(amount),
        currentValue,
        profit,
        regretLevel,
        pastPrice: data.pastPrice,
        currentPrice: data.currentPrice,
        selectedDate,
      });
    } catch (err) {
      setError("Error calculating regret. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetCalculator = () => {
    setResult(null);
    setAmount("");
    setSelectedDate("");
    setError("");
  };

  return (
    <div className="w-full">
      <div className="modern-card p-96 md:p-12">
        {/* Header with modern design */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-6 py-3 mb-6">
            <Calculator className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold text-base">
              Investment Calculator
            </span>
          </div>
        </div>

        {!result ? (
          <div className="space-y-8">
            {/* Input form */}
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Amount input */}
                <div className="space-y-3">
                  <label className="block text-gray-200 font-semibold text-lg mb-2">
                    💰 Investment Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter USD amount"
                      className="modern-input w-full pl-12 pr-4 py-4 text-center text-lg"
                    />
                  </div>
                </div>

                {/* Date input */}
                <div className="space-y-3">
                  <label className="block text-gray-200 font-semibold text-lg mb-2">
                    📅 Purchase Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="modern-input w-full px-4 py-4 text-center text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Error display */}
            {error && (
              <div className="max-w-2xl mx-auto bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-400 text-center font-medium">
                  ⚠️ {error}
                </p>
              </div>
            )}

            {/* Calculate button */}
            <div className="flex justify-center">
              <button
                onClick={calculateRegret}
                disabled={isLoading}
                className="modern-button w-full max-w-md py-4 px-8 text-lg font-semibold flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Calculate Returns
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            <ResultsDisplay result={result} />
            <RegretMeter regretLevel={result.regretLevel} />

            {/* Reset button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={resetCalculator}
                className="modern-button w-full max-w-md py-4 px-8 text-lg font-semibold flex items-center justify-center gap-3"
              >
                <RotateCcw className="w-5 h-5" />
                Calculate Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
