export type PayStatus = "cash" | "payroll";

export type Signature = {
  _id: string;
  user: {
    name: string;
    category: string;
    payStatus: string;
  };
  signedAt: string;
  session: number;
  room: {
    name: string;
  };
  duration: number;
  imageUrl: string;
  selected: boolean;
};

export type PaymentReport = {
  name: string;
  category: string;
  timeInHrs: number;
  rateInHrs: number;
  invAmt: number;
  snackAmt: number;
  total: number;
  tax: number;
  amtDue: number;
  payStatus: string;
};

export type ReportType = {
  user: string;
  numOfTimesSigned: number;
  category: string;
  payStatus: string;
};

export type AppState = {
  AllSignatures: Signature[];
  PaymentReports: PaymentReport[];
  paymentReportLoading: boolean;
};
