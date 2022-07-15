import React, { useState, useContext } from "react";

import GridListInvoices from "../GridListInvoices/GridListInvoices";
import AddInvoice from "../AddInvoices/AddInvoice";

const Invoices = () => {
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="Invoice_container">
      <div>
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
        />
      </div>
    </div>
  );
};

export default Invoices;
