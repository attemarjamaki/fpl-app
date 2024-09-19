import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    const data = await res.json();

    const players = data.elements.map((player) => ({
      id: player.id,
      //  first_name: player.first_name,
      second_name: player.web_name,
      team: player.team,
      //  position: player.element_type,
    }));

    return NextResponse.json(players);
  } catch (error) {
    console.error("Error fetching player data:", error);
    return NextResponse.json(
      { error: "Failed to fetch player data" },
      { status: 500 }
    );
  }
}
