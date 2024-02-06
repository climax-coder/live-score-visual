import React from "react";
import { render } from "@testing-library/react";
import Card from "@/components/cards/card";
import { GameData } from "@/types/types";

const MOCK_GAME = {
  id: "hbaffaf",
  competition: "Football National League",
  country: "Russia",
  timestamp: 1470484800,
  status: { type: "finished" },
  homeTeam: { name: "Home Team", score: 0 },
  awayTeam: { name: "Away Team", score: 0 },
  liveStatus: "HT",
} as GameData;

describe("Card Component", () => {
  it("should display the competition name", () => {
    const { getByText } = render(<Card game={MOCK_GAME} />);
    const competitionElement = getByText(MOCK_GAME.competition);
    expect(competitionElement).toBeInTheDocument();
  });

  it("should display the country/host of competition", () => {
    const { getByText } = render(<Card game={MOCK_GAME} />);
    const countryElement = getByText(MOCK_GAME.country.toUpperCase());
    expect(countryElement).toBeInTheDocument();
  });

  it("should contain the game status element", () => {
    const { getByText } = render(<Card game={MOCK_GAME} />);
    const statusElement = getByText(MOCK_GAME.liveStatus);
    expect(statusElement).toBeInTheDocument();
  });

  it("should display the score of both teams", () => {
    const { getByText } = render(<Card game={MOCK_GAME} />);
    const scoreElement = getByText(
      `${MOCK_GAME.homeTeam.score} - ${MOCK_GAME.awayTeam.score}`
    );
    expect(scoreElement).toBeInTheDocument();
  });

  it("should display the home team", () => {
    const { getByText } = render(<Card game={MOCK_GAME} />);
    const homeTeamElement = getByText(MOCK_GAME.homeTeam.name);
    expect(homeTeamElement).toBeInTheDocument();
  });

  it("should display the away team", () => {
    const { getByText } = render(<Card game={MOCK_GAME} />);
    const awayTeamElement = getByText(MOCK_GAME.awayTeam.name);
    expect(awayTeamElement).toBeInTheDocument();
  });

  it("should display a progress indicator", () => {
    const { getByTestId } = render(<Card game={MOCK_GAME} />);
    const progressElement = getByTestId("progressIndicator");
    expect(progressElement).toBeInTheDocument();
  });

  it("should display the live status", () => {
    const { getByText } = render(<Card game={MOCK_GAME} />);
    const liveStatusElement = getByText(MOCK_GAME.liveStatus);
    expect(liveStatusElement).toBeInTheDocument();
  });
});
