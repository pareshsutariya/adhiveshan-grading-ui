export interface CompetitionEvent {
  competitionEventId: number;
  name: string,
  startDate: Date;
  endDate: Date;
  region: string,
  centers: string[],
  hostCenter: string,
  status: string
}