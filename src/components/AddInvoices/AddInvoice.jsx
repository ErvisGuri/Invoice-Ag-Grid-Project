import React, { useState } from "react";
import { Select, InputNumber, DatePicker, Space, Input, Button } from "antd";

import "antd/dist/antd.css";
import "../AddInvoices/AddInvoice.css";

const { Option } = Select;
const { TextArea } = Input;

const AddInvoice = () => {
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [client, setClient] = useState("");
  const [desc, setDesc] = useState("");
  const [currency, setCurrency] = useState("");
  const [date, setDate] = useState("");
  const [rate, setRate] = useState("");
  const [amount, setAmount] = useState("");

  const handleNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleClient = (e) => {
    setClient(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleCurrency = (e) => {
    setCurrency(e.target.value);
  };

  const handleRate = (e) => {
    setRate(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  return (
    <>
      <h1 className="title"> Create New Invoice</h1>
      <div className="addInvoices_container">
        <div className="Column1">
          <div className="number" onChange={handleNumber}>
            <span>Number</span>
            <InputNumber style={{ width: "180px" }} />
          </div>
          <div className="type" onChange={handleType}>
            <span>Type</span>
            <Select style={{ width: "180px" }}>
              <Option value="Fature Shitje">Fature Shitje</Option>
              <Option value="Fsh pa artikull">Fsh pa artikull</Option>
              <Option value="Fsh me dalje nga mag">Fsh me dalje nga mag</Option>
              <Option value="Shtije me POS">Shtije me POS</Option>
            </Select>
          </div>
          <div className="client" onChange={handleClient}>
            <span>Client</span>
            <Select style={{ width: "180px" }}>
              <Option value="GjiroFarm">GjiroFarm</Option>
              <Option value="RZB">RZB</Option>
              <Option value="Lufra">Lufra</Option>
              <Option value="TiranaBank">TiranaBank</Option>
              <Option value="Alumil">Alumil</Option>
            </Select>
          </div>
          <div
            className="desc"
            style={{ display: "flex" }}
            onChange={handleDesc}
          >
            <span>Description</span>
            <TextArea />
          </div>
        </div>
        <div className="column2">
          <div className="currency" onChange={handleCurrency}>
            <span>Currency</span>
            <Select style={{ width: "180px" }}>
              <Option value="Eur">Eur</Option>
              <Option value="All">ALL</Option>
              <Option value="$">$</Option>
            </Select>
          </div>
          <div className="rate" onChange={handleRate}>
            <span>Rate</span>
            <InputNumber style={{ width: "180px" }} />
          </div>
          <div className="date" onChange={handleDate}>
            <span>Date</span>
            <Space direction="vertical">
              <DatePicker style={{ width: "180px" }} />
            </Space>
          </div>
          <div className="amount" onChange={handleAmount}>
            <span>Amount</span>
            <InputNumber style={{ width: "180px" }} />
          </div>
        </div>
        <div className="column3">
          <Button className="addInvoiceBtn" type="submit">
            Add Invoice
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddInvoice;
