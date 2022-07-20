import React, { useState, useContext, useEffect } from "react";
import AddInvoiceModal from "./AddInvoiceModal";
import "antd/dist/antd.css";
import "../AddInvoices/AddInvoice.css";

import { Link } from "react-router-dom";
import InvoiceContext from "../../InvoiceContext";
import { Button } from "antd";

const url = "http://localhost:4000/invoices";

const AddInvoice = ({
  initialData,
  setInitialData,
  showModal,
  handleCancel,
  isModalVisible,
}) => {
  const [key, setKey] = useState(false);

  const isUpdate = initialData.id !== undefined;

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

  const { invoiceValue } = useContext(InvoiceContext);
  const [tableData, setTableData] = invoiceValue;

  const getInvoices = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => setTableData(resp));
  };

  const handleSubmit = () => {
    if (!isUpdate) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(initialData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((r) => r.json())
        .then(() => {
          getInvoices();
        });
      setKey((k) => !k);
    } else {
      fetch(url + `/${initialData.id}`, {
        method: "PUT",
        body: JSON.stringify(initialData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((r) => r.json())
        .then(() => {
          getInvoices();
        });
      setKey((k) => !k);
    }
    setInitialData(initials);
    handleCancel();
  };
  console.log(isUpdate);

  const onChange = (obj, e) => {
    let test = obj;
    setInitialData((prev) => ({ ...prev, [test]: e }));
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <>
      <div className="buttonsBtn">
        <div>
          <Link to="/details">
            <Button
              style={{
                width: "180px",
                backgroundColor: "rgb(128, 126, 126)",
                color: "white",
                borderRadius: "15px",
                marginLeft: "200px",
                marginTop: "20px",
                marginBottom: "10px",
                position: "sticky",
              }}
            >
              Invoices Client Details
            </Button>
          </Link>
        </div>
        <div>
          <AddInvoiceModal
            {...{ onChange, handleSubmit }}
            InvoiceData={initialData}
            key={key}
            handleCancel={handleCancel}
            showModal={showModal}
            isModalVisible={isModalVisible}
          />
        </div>
      </div>
    </>
  );
};

export default AddInvoice;
