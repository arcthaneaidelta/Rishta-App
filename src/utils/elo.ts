/**
 * Simplified Elo rating system according to FUTBOLIÑO Federation PRD Section 13.3
 * K-factor: 32
 * Expected score: E = 1 / (1 + 10^((Opponent Rating - Player Rating) / 400))
 * New Rating = Old Rating + K * (Actual Score - Expected Score)
 */

export const ELO_K_FACTOR = 32;
export const DEFAULT_STARTING_RATING = 1000;

export interface EloCalculationResult {
  playerANewRating: number;
  playerBNewRating: number;
  playerAChange: number;
  playerBChange: number;
  playerAExpected: number;
  playerBExpected: number;
}

export function calculateElo(
  ratingA: number,
  ratingB: number,
  scoreA: number, // 1 for win, 0.5 for draw, 0 for loss
  scoreB: number, // 1 for win, 0.5 for draw, 0 for loss
  kFactor: number = ELO_K_FACTOR
): EloCalculationResult {
  // Expected scores
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
  const expectedB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400));

  const changeA = Math.round(kFactor * (scoreA - expectedA));
  const changeB = Math.round(kFactor * (scoreB - expectedB));

  return {
    playerANewRating: Math.max(100, ratingA + changeA),
    playerBNewRating: Math.max(100, ratingB + changeB),
    playerAChange: changeA,
    playerBChange: changeB,
    playerAExpected: Number(expectedA.toFixed(3)),
    playerBExpected: Number(expectedB.toFixed(3)),
  };
}
