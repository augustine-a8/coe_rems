import { createContext, useReducer, PropsWithChildren, Reducer } from "react";
import { PaymentReport, ReportType, Signature } from "../types";

interface IAppContext {
  state: {
    signatures: Signature[];
    paymentReport: PaymentReport[];
  };
  appDispatch: React.Dispatch<SignatureReducerAction>;
}

export const AppContext = createContext<IAppContext | undefined>(undefined);

type SignatureReducerAction =
  | {
      type: "mark_signature";
      payload: { signatureId: string };
    }
  | {
      type: "load_signatures";
      payload: { signatures: Signature[] };
    }
  | {
      type: "generate_payment_report";
    };

const signatureReducer: Reducer<
  {
    signatures: Signature[];
    paymentReport: PaymentReport[];
  },
  SignatureReducerAction
> = (state, action) => {
  switch (action.type) {
    case "mark_signature": {
      // return state.signatures.map((signature) => {
      //   if (signature._id === action.payload.signatureId) {
      //     return {
      //       ...signature,
      //       selected: !signature.selected,
      //     };
      //   }
      //   return signature;
      // });

      return {
        paymentReport: state.paymentReport,
        signatures: state.signatures.map((signature) => {
          if (signature._id === action.payload.signatureId) {
            return {
              ...signature,
              selected: !signature.selected,
            };
          }
          return signature;
        }),
      };
    }
    case "load_signatures": {
      // return action.payload.signatures.map((signature) => {
      //   return {
      //     ...signature,
      //     selected: false,
      //   };
      // });

      return {
        paymentReport: state.paymentReport,
        signatures: action.payload.signatures.map((signature) => {
          return {
            ...signature,
            selected: false,
          };
        }),
      };
    }
    case "generate_payment_report": {
      const reportType: ReportType[] = [];
      const paymentReport: PaymentReport[] = [];
      const allSignatures = state.signatures;
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
      // state.paymentReport = paymentReport;
      return {
        signatures: state.signatures,
        paymentReport: paymentReport,
      };
    }
    default: {
      throw new Error("Unknown Action Type");
    }
  }
};

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [state, appDispatch] = useReducer(signatureReducer, {
    signatures: [],
    paymentReport: [],
  });

  return (
    <AppContext.Provider value={{ state, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};
