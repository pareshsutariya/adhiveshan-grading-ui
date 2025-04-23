export interface CompetitionEvent {
  competitionEventId: number;
  eventName: string,
  eventStartDate: Date;
  eventEndDate: Date;
  region: string,
  centers: string[],
  hostingCenter: string,
  status: string
}