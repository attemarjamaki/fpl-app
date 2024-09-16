import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Fetch general info to determine the current gameweek using axios
    const bootstrapResponse = await axios.get(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );

    // Find the current event
    const currentEvent = bootstrapResponse.data.events.find(
      (event) => event.is_current
    );

    if (!currentEvent) {
      return new Response(
        JSON.stringify({ error: "No current gameweek found" }),
        {
          status: 404,
        }
      );
    }

    const currentGameweek = currentEvent.id;

    // Fetch fixtures and stats data for the current gameweek (axios with live data)
    const fixturesResponse = await axios.get(
      `https://fantasy.premierleague.com/api/fixtures/?event=${currentGameweek}`
    );
    const fixtures = fixturesResponse.data;

    // Extract relevant stats from each fixture
    const fixturesWithKeyStats = fixtures.map((fixture) => {
      const goalsScored = fixture.stats.find(
        (stat) => stat.identifier === "goals_scored"
      );
      const assists = fixture.stats.find(
        (stat) => stat.identifier === "assists"
      );
      const ownGoals = fixture.stats.find(
        (stat) => stat.identifier === "own_goals"
      );
      const bps = fixture.stats.find((stat) => stat.identifier === "bps");

      return {
        id: fixture.id,
        kickoff_time: fixture.kickoff_time,
        minutes: fixture.minutes,
        team_h: fixture.team_h,
        team_h_score: fixture.team_h_score,
        team_a: fixture.team_a,
        team_a_score: fixture.team_a_score,
        goalscorer: {
          home: goalsScored?.h || [],
          away: goalsScored?.a || [],
        },
        assists: {
          home: assists?.h || [],
          away: assists?.a || [],
        },
        own_goals: {
          home: ownGoals?.h || [],
          away: ownGoals?.a || [],
        },
        bps: {
          home: bps?.h || [],
          away: bps?.a || [],
        },
      };
    });

    return NextResponse.json(fixturesWithKeyStats);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred" },
      { status: 500 }
    );
  }
}
