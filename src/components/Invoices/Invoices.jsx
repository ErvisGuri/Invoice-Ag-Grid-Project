import React, { useCallback, useRef, useState } from "react";

import GridListInvoices from "../GridListInvoices/GridListInvoices";
import AddInvoice from "../AddInvoices/AddInvoice";
import DataFake from "../../DataFake";

const Invoices = () => {
  const [rowData, setRowdata] = useState(DataFake);
  const gridRef = useRef();

  const onRemove = useCallback(() => {
    const selectedInvoice = gridRef.current.api.getSelectedInvoices();
    const selectedIds = selectedInvoice.map((invoice) => invoice.data.id);
    const invoices = DataFake.filter(
      (invoice) => selectedIds.indexOd(DataFake.id) < 0
    );
    setRowdata(invoices);
  });

  return (
    <div className="Invoice_container">
      <AddInvoice />
      <GridListInvoices onRemove={onRemove} />
    </div>
  );
};

export default Invoices;
