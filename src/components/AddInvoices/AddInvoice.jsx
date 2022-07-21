import React, { useState, useContext, useEffect } from "react";
import AddInvoiceModal from "./AddInvoiceModal";
import "antd/dist/antd.css";
import "../AddInvoices/AddInvoice.css";

import { Link } from "react-router-dom";
import InvoiceContext from "../../InvoiceContext";
import { Button, Form } from "antd";
import moment from "moment";
import io from "socket.io-client";

const url = "http://localhost:4000/invoices";
const socket = io.connect("http://localhost:3001");

const AddInvoice = ({
  initialData,
  setInitialData,
  showModal,
  handleCancel,
  isModalVisible,
}) => {
  const [key, setKey] = useState(false);
  const { invoiceValue } = useContext(InvoiceContext);
  const [tableData, setTableData] = invoiceValue;
  const [dataSocket, setDataSocket] = useState("");
  const recordSocket = tableData?.map((el) => el.id);

  const isUpdate = initialData.id !== undefined;

  const Nr = recordSocket?.length + 1;

  /// dataSocket(paid, unpaid, pending)  object nr
  useEffect(() => {
    const newRecord = tableData?.map((el) => el.status);
    const dataSocket = {};
    newRecord?.forEach((el) => {
      if (el in dataSocket) {
        parseInt(dataSocket[el]++);
      } else {
        parseInt((dataSocket[el] = 1));
      }
    });
    setDataSocket(dataSocket);
  }, [tableData]);

  const { Paid, Unpaid, Pending } = dataSocket;

  const sendRecord = () => {
    socket.emit("send_record", { Nr, Paid, Unpaid, Pending });
  };

  useEffect(() => {
    socket.on("receive_record", (data) => {
      console.log(data);
    });
  }, [socket]);

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
      sendRecord();
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
      sendRecord();
      setKey((k) => !k);
    }
    setInitialData(initials);
    handleCancel();
  };

  const onChange = (obj, e) => {
    if (obj === "date") {
      let test = obj;
      setInitialData((prev) => ({ ...prev, [test]: moment(e).valueOf() }));
    }
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
                marginTop: "15px",
                marginBottom: "15px",
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
