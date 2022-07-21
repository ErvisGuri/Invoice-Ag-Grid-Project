import React, { useContext } from "react";
import InvoiceContext from "../../InvoiceContext";

export default (props) => {
  const { invoiceValue, invoiceEditValue } = useContext(InvoiceContext);
  const [tableData, setTableData] = invoiceValue;

  const formatNumber = (number) => {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const totalAmount = formatNumber(
    tableData
      ?.map((el) => el.amount)
      .reduce((a, b) => parseInt(a) + parseInt(b))
  );

  return (
    <div className="ag-status-name-value">
      <span>{"Total: "}</span>
      <span>{`$${totalAmount}`}</span>
    </div>
  );
};
