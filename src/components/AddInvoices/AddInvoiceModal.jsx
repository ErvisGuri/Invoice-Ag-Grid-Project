import React, { useState } from "react";
import { Select, Input, DatePicker, Modal, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

const AddInvoiceModal = ({
  InvoiceData,
  onChange,
  handleSubmit,
  showModal,
  isModalVisible,
  handleCancel,
}) => {
  const { number, description, rate, amount, key } = InvoiceData;
  const { Option } = Select;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{ fontSize: "25px", marginLeft: "800px", marginTop: "40px" }}
        >
          AG Grid Project
        </span>
        <Button
          style={{
            width: "150px",
            backgroundColor: "rgb(128, 126, 126)",
            color: "white",
            borderRadius: "15px",
            marginLeft: "105px",
            marginBottom: "10px",
            position: "sticky",
            top: "270px",
          }}
          onClick={showModal}
        >
          Add Invoice
          <PlusOutlined />
        </Button>
      </div>
      <Modal
        width="800px"
        mask={true}
        maskStyle={{ backgroundColor: "rgb(213 213 213)" }}
        wrapclassName="addPostModal"
        title="Create New Invoice"
        visible={isModalVisible}
        onCancel={handleCancel}
        bodyStyle={{ height: "400px" }}
        footer={false}
      >
        <div className="addInvoices_container">
          <div className="Column12">
            <div className="Column1">
              <div className="InvoiceNr">
                <span>Invoice Nr</span>
                <Input
                  id="number"
                  type="number"
                  value={number}
                  style={{ width: "180px" }}
                  placeholder="Add Invoice Number"
                  onChange={(e) => onChange("number", e.target.value)}
                />
              </div>
              <div className="type">
                <span>Type</span>
                <Select
                  id="type"
                  onSelect={(e) => onChange("type", e)}
                  style={{ width: "180px" }}
                >
                  <Option value="Fature Shitje">Fature Shitje</Option>
                  <Option value="Fsh pa artikull">Fsh pa artikull</Option>
                  <Option value="Fsh me dalje nga mag">
                    Fsh me dalje nga mag
                  </Option>
                  <Option value="Shtije me POS">Shtije me POS</Option>
                </Select>
              </div>
              <div className="client">
                <span>Client</span>
                <Select
                  id="client"
                  onChange={(e) => onChange("client", e)}
                  placeholder="Choose Client"
                  style={{ width: "180px" }}
                >
                  <Option value="GjiroFarm">GjiroFarm</Option>
                  <Option value="RZB">RZB</Option>
                  <Option value="Lufra">Lufra</Option>
                  <Option value="TiranaBank">TiranaBank</Option>
                  <Option value="Alumil">Alumil</Option>
                </Select>
              </div>
              <div className="desc" style={{ display: "flex" }}>
                <span>Description</span>
                <Input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => onChange("description", e.target.value)}
                  style={{ width: "180px" }}
                />
              </div>
            </div>
            <div className="column2">
              <div className="status">
                <span>Status</span>
                <Select
                  id="status"
                  onChange={(e) => onChange("status", e)}
                  style={{ width: "180px" }}
                >
                  <Option value="Pending">Pending</Option>
                  <Option value="Paid">Paid</Option>
                  <Option value="Unpaid">Unpaid</Option>
                </Select>
              </div>
              <div className="rate">
                <span>Rate</span>
                <Input
                  id="rate"
                  value={rate}
                  type="number"
                  style={{ width: "180px" }}
                  onChange={(e) => onChange("rate", e.target.value)}
                />
              </div>
              <div className="date">
                <span>Date</span>
                <Space direction="vertical">
                  <DatePicker
                    id="date"
                    type="date"
                    onChange={(e) => onChange("date", e)}
                    key={key}
                    style={{ width: "180px" }}
                  />
                </Space>
              </div>
              <div className="amount">
                <span>Amount</span>
                <Input
                  id="amount"
                  value={amount}
                  type="number"
                  style={{ width: "180px" }}
                  onChange={(e) => onChange("amount", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="column3">
            <Button
              className="addInvoiceBtn"
              type="submit"
              onClick={handleSubmit}
            >
              Add Invoice
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddInvoiceModal;
