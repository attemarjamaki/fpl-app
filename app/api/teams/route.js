import { NextResponse } from "next/server";

export async function GET() {
  const teamNames = {
    1: "Arsenal",
    2: "Aston Villa",
    3: "Burnley",
    4: "Bournemouth",
    5: "Brentford",
    6: "Brighton",
    7: "Chelsea",
    8: "Crystal Palace",
    9: "Everton",
    10: "Fulham",
    11: "Leeds",
    12: "Liverpool",
    13: "Man City",
    14: "Man United",
    15: "Newcastle",
    16: "Nott'm Forest",
    17: "Sunderland",
    18: "Spurs",
    19: "West Ham",
    20: "Wolves",
  };

  return NextResponse.json(teamNames);
}
