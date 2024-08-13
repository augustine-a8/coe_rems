import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppState, PaymentReport, ReportType, Signature } from "../types";
import { RootState } from "./store";

const initialState: AppState = {
  AllSignatures: [],
  PaymentReports: [],
  paymentReportLoading: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAllSignatures: (state, action: PayloadAction<Signature[]>) => {
      console.log("Set All Signatures");
      if (action.payload.length > 0) {
        console.log("Setting signatures...");
        state.AllSignatures = action.payload;
      } else {
        console.log("No Signatures");
        state.AllSignatures = [];
      }
    },
    generatePaymentReport: (state) => {
      console.log(state.AllSignatures.length);
      state.paymentReportLoading = true;
      console.log("Generating payment report...");
      const reportType: ReportType[] = [];
      const paymentReport: PaymentReport[] = [];
      const allSignatures = state.AllSignatures;
      for (let i = 0; i < allSignatures.length; i++) {
        const signature = allSignatures[i];
        if (
          reportType.find(
            (item) =>
              item.user.toLowerCase().trim() ===
              signature.user.name.toLowerCase().trim()
          ) !== undefined
        ) {
          continue;
        }
        // const numOfSignaturesForSignatureOwner = allSignatures.filter(
        //   (_signature) =>
        //     _signature.user.name.toLowerCase().trim() ===
        //       signature.user.name.toLowerCase().trim() &&
        //     _signature.signedAt !== signature.signedAt &&
        //     _signature.session !== signature.session
        // ).length;
        // const userreportType: ReportType = {
        //   user: signature.user.name,
        //   numOfTimesSigned: numOfSignaturesForSignatureOwner,
        // };
        // reportType.push(userreportType);
        const allUserSignatures = allSignatures.filter(
          (_signature) => _signature.user.name === signature.user.name
        );
        const allUserSignatures_Str = allUserSignatures.map((s) =>
          JSON.stringify({
            signedAt: s.signedAt,
            session: s.session,
          })
        );
        const allUserSignatures_Set = new Set(allUserSignatures_Str);
        const userreportType: ReportType = {
          user: signature.user.name,
          numOfTimesSigned: allUserSignatures_Set.size,
          category: signature.user.category,
          payStatus: signature.user.payStatus,
        };
        reportType.push(userreportType);
        const timeInHrs =
          userreportType.category === "SM" ||
          userreportType.category === "NSM/attd"
            ? 3 * userreportType.numOfTimesSigned
            : 2 * userreportType.numOfTimesSigned;
        const rateInHrs = userreportType.category === "SM" ? 60 : 30;
        const invAmt = timeInHrs * rateInHrs;
        const snackAmt = 15 * userreportType.numOfTimesSigned;
        const total = invAmt + snackAmt;
        const amtDue = 0.9 * total;
        paymentReport.push({
          name: userreportType.user,
          category: userreportType.category,
          timeInHrs,
          rateInHrs,
          invAmt,
          snackAmt,
          total,
          tax: 10,
          amtDue,
          payStatus: userreportType.payStatus,
        });
      }
      state.PaymentReports = paymentReport;
      state.paymentReportLoading = false;
      console.log("Finished generating report");
    },
  },
});

export const { setAllSignatures, generatePaymentReport } = appSlice.actions;

export const getAllSignatures = (state: RootState) => state.app.AllSignatures;

export default appSlice.reducer;
