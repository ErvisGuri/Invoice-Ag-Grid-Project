import React, { useState, useContext, useEffect } from "react";

import GridListInvoices from "../GridListInvoices/GridListInvoices";
import AddInvoice from "../AddInvoices/AddInvoice";
import RecordStatus from "../RecordStatus/RecordStatus";
import InvoiceContext from "../../InvoiceContext";

const Invoices = () => {
  const { invoiceEditValue } = useContext(InvoiceContext);
  const [isEdit, setIsEdit] = invoiceEditValue;

  const initials = {
    number: "",
    type: "",
    client: "",
    description: "",
    status: "",
    rate: "",
    date: "",
    amount: "",
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initialData, setInitialData] = useState(initials);
  const [filter, setFilter] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEdit();
    setInitialData(initials);
  };

  return (
    <div
      className="Invoice_container"
      style={{ backgroundColor: "rgba(219,219,219,0.767)" }}
    >
      <div>
        <RecordStatus setFilter={setFilter} />

        <AddInvoice
          initialData={initialData}
          setInitialData={setInitialData}
          showModal={showModal}
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
        />
        <GridListInvoices
          showModal={showModal}
          setInitialData={setInitialData}
          filter={filter}
        />
      </div>
    </div>
  );
};

export default Invoices;
