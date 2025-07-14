import { NextRequest, NextResponse } from "next/server";
import historicalPrices from "@/lib/historical-prices.json";

interface BitcoinPriceResponse {
  pastPrice: number;
  currentPrice: number;
  date: string;
}

// Function to get the closest available date from historical data
function getClosestHistoricalDate(targetDate: Date): string | null {
  const targetTime = targetDate.getTime();
  const availableDates = Object.keys(historicalPrices).sort();

  let closestDate = null;
  let closestDiff = Infinity;

  for (const dateStr of availableDates) {
    const date = new Date(dateStr);
    const diff = Math.abs(date.getTime() - targetTime);

    if (diff < closestDiff) {
      closestDiff = diff;
      closestDate = dateStr;
    }
  }

  return closestDate;
}

// Function to get historical price from local data
function getHistoricalPriceFromLocal(date: Date): number | null {
  const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD format

  // Try exact match first
  if (historicalPrices[dateStr as keyof typeof historicalPrices]) {
    return historicalPrices[dateStr as keyof typeof historicalPrices];
  }

  // Try first day of month
  const firstOfMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-01`;
  if (historicalPrices[firstOfMonth as keyof typeof historicalPrices]) {
    return historicalPrices[firstOfMonth as keyof typeof historicalPrices];
  }

  // Find closest date
  const closestDate = getClosestHistoricalDate(date);
  if (closestDate) {
    return historicalPrices[closestDate as keyof typeof historicalPrices];
  }

  return null;
}

// Function to get current price (most recent date in our data)
function getCurrentPrice(): number {
  const dates = Object.keys(historicalPrices).sort().reverse();
  const mostRecentDate = dates[0];
  return historicalPrices[mostRecentDate as keyof typeof historicalPrices];
}

export async function POST(request: NextRequest) {
  try {
    const { date, amount } = await request.json();

    if (!date || !amount) {
      return NextResponse.json(
        { error: "Date and amount are required" },
        { status: 400 }
      );
    }

    // Parse the selected date
    const selectedDate = new Date(date);

    // Get historical Bitcoin price from local data
    const pastPrice = getHistoricalPriceFromLocal(selectedDate);

    if (!pastPrice) {
      return NextResponse.json(
        {
          error:
            "Unable to fetch Bitcoin price for the selected date. Please try a different date.",
        },
        { status: 404 }
      );
    }

    // Get current Bitcoin price (most recent from our data)
    const currentPrice = getCurrentPrice();

    const response: BitcoinPriceResponse = {
      pastPrice: pastPrice,
      currentPrice: currentPrice,
      date: date,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in Bitcoin price API:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
