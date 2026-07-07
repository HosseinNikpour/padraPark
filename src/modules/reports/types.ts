export interface SummaryCardData  {
  tickets: number;
  sales: number;
}

export interface ChartItem {
  name: string;
  amount: number;
}

export interface DailyChartItem {
  day: string;
  amount: number;
}

export interface SalesDetail {
  name: string;
  qty: number;
  amount: number;
  average: number;
  best: number;
  diff: number;
}

export interface DailySummary {

  downstairs: SummaryCardData ;

  upstairs: SummaryCardData ;

  cafe: SummaryCardData ;

  total: SummaryCardData ;

  chart: ChartItem[];

  details: SalesDetail[];
}

export interface WeeklySummary {

  start: Date;

  end: Date;

  downstairs: SummaryCardData ;

  upstairs: SummaryCardData ;

  cafe: SummaryCardData ;

  total: SummaryCardData ;

  pieChart: ChartItem[];

  dailyChart: DailyChartItem[];

  details: SalesDetail[];
}

export interface MonthlySummary {

  downstairs: SummaryCardData ;

  upstairs: SummaryCardData ;

  cafe: SummaryCardData ;

  total: SummaryCardData ;

  pieChart: ChartItem[];

  dailyChart: DailyChartItem[];

  details: SalesDetail[];
}