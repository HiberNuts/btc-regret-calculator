import { BitcoinCalculator } from "@/components/BitcoinCalculator";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-950">
      <div className="container mx-auto px-6 py-24 max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Bitcoin Regret Calculator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Calculate how much your Bitcoin investment would be worth today
          </p>
          <p className="text-base text-gray-500 font-medium">
            Turn your crypto FOMO into cold, hard numbers
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <BitcoinCalculator />
          </div>
        </div>
      </div>
    </main>
  );
}
