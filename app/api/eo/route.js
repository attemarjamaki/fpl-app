import { NextResponse } from "next/server";

// API Route Handler
export async function GET() {
  try {
    // Step 1: Fetch the top 10k teams
    const top10kTeams = await fetchTop10KTeams();

    // Step 2: Fetch data for each team in the top 10k
    const playerData = await fetchPlayerPicksForTeams(top10kTeams);

    // Step 3: Calculate Effective Ownership using the multiplier
    const effectiveOwnership = calculateEffectiveOwnership(playerData);

    // Step 4: Return the EO data
    return NextResponse.json({ effectiveOwnership });
  } catch (error) {
    console.error("Error fetching Effective Ownership data:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to Fetch the Top 10k Teams with Delay
async function fetchTop10KTeams() {
  const top10k = [];
  let page = 1;
  const teamsPerPage = 50; // 50 teams per page
  const totalTeams = 1000; // Now fetching 10,000 teams
  const totalPages = totalTeams / teamsPerPage; // 200 pages needed to cover 10k teams
  const delayTime = 1000; // 500ms delay between requests

  while (top10k.length < totalTeams && page <= totalPages) {
    try {
      const response = await fetch(
        `https://fantasy.premierleague.com/api/leagues-classic/314/standings/?page_new_entries=1&page_standings=${page}`
      );
      const data = await response.json();
      const standings = data.standings.results;

      top10k.push(...standings.map((team) => team.entry));

      // Delay after each page fetch to avoid hitting rate limits
      await delay(delayTime);
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      await delay(2000); // Retry after a longer delay if there's an error
    }

    page++;
  }

  return top10k.slice(0, totalTeams); // Return only the top 10k teams
}

// Function to Fetch Player Picks for Each Team in Top 10k
async function fetchPlayerPicksForTeams(teams) {
  const fetches = teams.map((team) =>
    fetch(
      `https://fantasy.premierleague.com/api/entry/${team}/event/3/picks/`
    ).then((res) => res.json())
  );

  const teamPicks = await Promise.all(fetches);
  return teamPicks;
}

// Simplified Function to Calculate Effective Ownership using Multiplier
function calculateEffectiveOwnership(playerData) {
  const ownership = {}; // To store the sum of multipliers for each player

  for (const team of playerData) {
    team.picks.forEach((pick) => {
      const playerId = pick.element;
      const multiplier = pick.multiplier; // Use the multiplier to calculate EO

      if (!ownership[playerId]) {
        ownership[playerId] = 0;
      }

      // Simply add the multiplier for each player (1 for starting, 2 for captain, 3 for triple captain)
      ownership[playerId] += multiplier;
    });
  }

  // Convert the sum of multipliers into percentages
  const totalTeams = playerData.length;
  const effectiveOwnership = {};

  Object.keys(ownership).forEach((playerId) => {
    const totalMultiplier = ownership[playerId];

    // Effective Ownership is the total multiplier sum divided by total teams (as a percentage)
    const eo = (totalMultiplier / totalTeams) * 100;

    effectiveOwnership[playerId] = {
      eo: eo.toFixed(2), // Effective Ownership as percentage
      totalMultiplier: totalMultiplier, // Sum of multipliers for debugging
    };
  });

  return effectiveOwnership;
}
