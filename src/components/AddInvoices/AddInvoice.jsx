import React, { useState, useContext, useEffect } from "react";
import AddInoviceModal from "./AddInvoiceModal";
import "antd/dist/antd.css";
import "../AddInvoices/AddInvoice.css";

import InvoiceContext from "../../InvoiceContext";
import api from "../../api/invoicesapi";

const url = "http://localhost:4000/invoices";

const AddInvoice = ({ showModal, handleCancel, isModalVisible }) => {
  const { invoiceValue } = useContext(InvoiceContext);
  const [key, setKey] = useState(false);

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

  const [data, setData] = useState(initials);
  const [tableData, setTableData] = invoiceValue;

  const getInvoices = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };

  const onChange = (obj, e) => {
    let test = obj;
    setData((prev) => ({ ...prev, [test]: e }));
  };
  const handleSubmit = () => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then(() => {
        getInvoices();
      });
    setKey((k) => !k);
    setData(initials);
    handleCancel();
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <>
      <div>
        <AddInoviceModal
          {...{ onChange, handleSubmit }}
          InvoiceData={data}
          key={key}
          handleCancel={handleCancel}
          showModal={showModal}
          isModalVisible={isModalVisible}
        />
      </div>
    </>
  );
};

export default AddInvoice;
