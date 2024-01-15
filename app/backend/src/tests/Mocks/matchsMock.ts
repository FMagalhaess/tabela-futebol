export const matchesMock = [
  {
    id: 1,
    homeTeamGoals: 2,
    awayTeamGoals: 1,
    homeTeamId: 1,
    awayTeamId: 2,
    inProgress: true,
  },
];
export const mockMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
  },
  // ... adicione outros objetos conforme necessário
];

export const findAll = [
        {
          id: 1,
          homeTeamId: 16,
          homeTeamGoals: 1,
          awayTeamId: 8,
          awayTeamGoals: 1,
          inProgress: false,
          homeTeam: {
            teamName: "São Paulo"
          },
          awayTeam: {
            teamName: "Grêmio"
          }
        },
        {
          id: 2,
          homeTeamId: 9,
          homeTeamGoals: 1,
          awayTeamId: 14,
          awayTeamGoals: 1,
          inProgress: false,
          homeTeam: {
            teamName: "Internacional"
          },
          awayTeam: {
            teamName: "Santos"
          }
        },
      ];
;

export const teamsMock = [
  { id: 1, teamName: "Team A" },
  { id: 2, teamName: "Team B" },
];
