import {
  faChevronLeft,
  faChevronRight,
  faFileExport,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import ExcelJS from "exceljs";
import FileSaver from "file-saver";

import { IconButton } from "../../components";
import { PaymentReport } from "../../types";
import "./report.style.css";
// import Loading from "../../components/loading/Loading";
import { useAppState } from "../../hooks";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Report() {
  const { state, appDispatch } = useAppState();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const exportReportToExcel = async (report: PaymentReport[]) => {
    const filename = "exams-payment-report";
    const fileExtension = ".xlsx";
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Sheet1");
    const titleRow = [
      "SN",
      "Name",
      "Category",
      "Time/Hr",
      "Rate/Hr",
      "Inv Amt",
      "Snack Amt",
      "Total",
      "Tax",
      "Amt Due",
      "Pay Status",
    ];
    sheet.addRow(titleRow);
    const reportRows = report.map((r, idx) => {
      const values = Object.values(r);
      values.unshift(idx + 1);
      return values;
    });
    sheet.addRows(reportRows);
    const buffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, filename + fileExtension);
  };

  const { paymentReport } = state;

  const itemsPerPage = 50;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = paymentReport.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(paymentReport.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // return (
  //   <div className="report">
  //     <div className="report__header">
  //       <h3>Payment Report</h3>
  //       <div className="report__header-buttons">
  //         <IconButton
  //           icon={faTableCells}
  //           btnTitle="generete Report"
  //           backgroundColor="#2a9134"
  //           color="#fff"
  //           onClick={() => {
  //             appDispatch({
  //               type: "generate_payment_report",
  //             });
  //           }}
  //         />
  //         <IconButton
  //           icon={faFileExport}
  //           btnTitle="export Report"
  //           backgroundColor="#0466c8"
  //           color="#fff"
  //           onClick={() => {
  //             exportReportToExcel(paymentReport);
  //           }}
  //         />
  //       </div>
  //     </div>
  //     {/* <div className="report__body">
  //       {paymentReport.length > 0 ? (
  //         <table>
  //           <thead>
  //             <tr>
  //               <th>sn</th>
  //               <th>name</th>
  //               <th>category</th>
  //               <th>time/hr</th>
  //               <th>rate/hr</th>
  //               <th>inv amt GH&#8373;</th>
  //               <th>snack amt GH&#8373;</th>
  //               <th>total GH&#8373;</th>
  //               <th>tax</th>
  //               <th>amt due GH&#8373;</th>
  //               <th>pay status</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {paymentReport.map((item, idx) => (
  //               <tr key={idx}>
  //                 <td>{idx + 1}</td>
  //                 <td>{item.name}</td>
  //                 <td>{item.category}</td>
  //                 <td>{item.timeInHrs}</td>
  //                 <td>{item.rateInHrs}</td>
  //                 <td>{item.invAmt}</td>
  //                 <td>{item.snackAmt}</td>
  //                 <td>{item.total}</td>
  //                 <td>{item.tax}</td>
  //                 <td>{item.amtDue}</td>
  //                 <td>{item.payStatus}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       ) : undefined}
  //     </div> */}
  //     {paymentReport.length > 0 ? (
  //       <div className="signature-body">
  //         <div className="signature-table-control">
  //           {/* <div className="signature-table-icon-group">
  //           <div>
  //             <input type="checkbox" name="select-all" id="select-all" />
  //           </div>
  //           <div>
  //             <FontAwesomeIcon
  //               icon={faArrowRotateRight}
  //               size="sm"
  //               color="#5f5f5f"
  //             />
  //           </div>
  //         </div> */}
  //           <div className="signature-table-pagination">
  //             <div>
  //               <p>
  //                 {indexOfFirstItem + 1} - {indexOfLastItem} of{" "}
  //                 {paymentReport.length}
  //               </p>
  //             </div>
  //             <button onClick={prevPage}>
  //               <FontAwesomeIcon
  //                 icon={faChevronLeft}
  //                 size="xs"
  //                 color="#5f5f5f"
  //               />
  //             </button>
  //             <button onClick={nextPage}>
  //               <FontAwesomeIcon
  //                 icon={faChevronRight}
  //                 size="xs"
  //                 color="#5f5f5f"
  //               />
  //             </button>
  //           </div>
  //         </div>
  //         <table className="signature-table">
  //           <thead>
  //             <tr>
  //               <th>sn</th>
  //               <th>name</th>
  //               <th>category</th>
  //               <th>time/hr</th>
  //               <th>rate/hr</th>
  //               <th>inv amt GH&#8373;</th>
  //               <th>snack amt GH&#8373;</th>
  //               <th>total GH&#8373;</th>
  //               <th>tax</th>
  //               <th>amt due GH&#8373;</th>
  //               <th>pay status</th>
  //             </tr>
  //           </thead>
  //           <tbody className="signature-table-body">
  //             {paymentReport.map((item, idx) => (
  //               <tr key={idx}>
  //                 <td>{idx + 1}</td>
  //                 <td>{item.name}</td>
  //                 <td>{item.category}</td>
  //                 <td>{item.timeInHrs}</td>
  //                 <td>{item.rateInHrs}</td>
  //                 <td>{item.invAmt}</td>
  //                 <td>{item.snackAmt}</td>
  //                 <td>{item.total}</td>
  //                 <td>{item.tax}</td>
  //                 <td>{item.amtDue}</td>
  //                 <td>{item.payStatus}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     ) : undefined}
  //   </div>
  // );

  return (
    <>
      <div className="report__header">
        <h3>Payment Report</h3>
        <div className="report__header-buttons">
          <IconButton
            icon={faTableCells}
            btnTitle="generete Report"
            backgroundColor="#2a9134"
            color="#fff"
            onClick={() => {
              appDispatch({
                type: "generate_payment_report",
              });
            }}
          />
          <IconButton
            icon={faFileExport}
            btnTitle="export Report"
            backgroundColor="#0466c8"
            color="#fff"
            onClick={() => {
              exportReportToExcel(paymentReport);
            }}
          />
        </div>
      </div>
      {paymentReport.length > 0 ? (
        <div className="signature-body">
          <div className="signature-table-control">
            {/* <div className="signature-table-icon-group">
            <div>
              <input type="checkbox" name="select-all" id="select-all" />
            </div>
            <div>
              <FontAwesomeIcon
                icon={faArrowRotateRight}
                size="sm"
                color="#5f5f5f"
              />
            </div>
          </div> */}
            <div className="signature-table-pagination">
              <div>
                <p>
                  {indexOfFirstItem + 1} - {indexOfLastItem} of{" "}
                  {paymentReport.length}
                </p>
              </div>
              <button onClick={prevPage}>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  size="xs"
                  color="#5f5f5f"
                />
              </button>
              <button onClick={nextPage}>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="xs"
                  color="#5f5f5f"
                />
              </button>
            </div>
          </div>
          <table className="signature-table">
            <thead>
              <tr>
                <th>sn</th>
                <th>name</th>
                <th>category</th>
                <th>time/hr</th>
                <th>rate/hr</th>
                <th>inv amt GH&#8373;</th>
                <th>snack amt GH&#8373;</th>
                <th>total GH&#8373;</th>
                <th>tax</th>
                <th>amt due GH&#8373;</th>
                <th>pay status</th>
              </tr>
            </thead>
            <tbody className="signature-table-body">
              {currentItems.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.timeInHrs}</td>
                  <td>{item.rateInHrs}</td>
                  <td>{item.invAmt}</td>
                  <td>{item.snackAmt}</td>
                  <td>{item.total}</td>
                  <td>{item.tax}</td>
                  <td>{item.amtDue}</td>
                  <td>{item.payStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : undefined}
    </>
  );
}
