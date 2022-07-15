import React, { useContext, useState, useEffect } from "react";
import InvoicesClientDetails from "./InvoicesClientDetails/InvoicesClientDetails";

import InvoiceContext from "../../InvoiceContext";

const InvoiceClient = () => {
  const { invoiceValue } = useContext(InvoiceContext);
  const [tableData, setTableData] = invoiceValue;
  const [gjiroAmount, setGjiroAmount] = useState([]);

  const clients = () => {
    let dataGJ = tableData?.filter((el) => el.client === "GjiroFarm");
    setGjiroAmount(dataGJ);
  };

  useEffect(() => {
    clients();
  }, []);

  //   console.log(gjiroAmount);

  //   const arr = gjiroAmount?.map((obj) => obj.amount);
  //   console.log(...arr);

  //   const amount111 = { ...arr };
  //   console.log(amount111);

  //   const arr1 = gjiroAmount.map((obj) => obj.client);
  //   console.log(...arr1);

  //   const amount222 = { ...arr1 };
  //   console.log(amount111);

  //   //   console.log(Object.keys(ea));

  //   console.log(gjiroAmount);
  //   calculate rowSum, for 1 client
  //   const arrAmount = gjiroAmount;
  //   const gjiroAmountArray = arrAmount
  //     ?.map((er) => er.amount)
  //     ?.reduce((a, b) => a + b);

  //   console.log(gjiroAmountArray);

  const content = (
    <div>
      <div style={{ display: "flex", flexDirection: "row", gap: "250px" }}>
        <h3>ID/Name</h3>
        <h3>Amount</h3>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "1px",
          }}
        >
          {/* <span>{amount222[0]}</span>
          <span>{amount222[1]}</span>
          <span>{amount222[2]}</span>
          <span>{amount222[3]}</span> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "280px",
          }}
        >
          {/* <span>{amount111[0]}</span>
          <span>{amount111[1]}</span>
          <span>{amount111[2]}</span>
          <span>{amount111[3]}</span> */}
          <div> </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <InvoicesClientDetails content={content} />
    </div>
  );
};

export default InvoiceClient;
