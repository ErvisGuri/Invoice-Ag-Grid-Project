import React, { useState, useContext } from "react";

import GridListInvoices from "../GridListInvoices/GridListInvoices";
import AddInvoice from "../AddInvoices/AddInvoice";

const Invoices = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="Invoice_container">
      <AddInvoice
        showModal={showModal}
        handleCancel={handleCancel}
        isModalVisible={isModalVisible}
      />
      <GridListInvoices showModal={showModal} />
    </div>
  );
};

export default Invoices;
