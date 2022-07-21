import Invoices from './components/Invoices/Invoices.jsx';
import { Routes, Route } from 'react-router-dom';
import InvoiceClient from './components/InvoiceClient/InvoiceClient.jsx';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {

  useEffect(() => {
    socket.emit("join_message")
  }, [])

  return (

    <div className="App">
      <Routes>
        <Route exact path='/' element={<Invoices />} />
        <Route path='/details' element={<InvoiceClient />} />
      </Routes>
    </div>
  );
}

export default App;




{/* <div>
  <Popover
    content={content(params?.data.client)}
    title="Invoice Details"
    trigger="click"
  >
    {
      <span className="amountDetails">
        {valueDisplay(params?.data)}
      </span>
    }
  </Popover>
</div> */}



  // const content = (client) => {
  //   return (
  //     <div>
  //       <div
  //         style={{
  //           display: "flex",
  //           flexDirection: "row",
  //           gap: "250px",
  //           textDecoration: "underline",
  //         }}
  //       >
  //         <h3 style={{ marginLeft: "5px" }}>ID</h3>
  //         <h3>Amount</h3>
  //       </div>
  //       {tableData
  //         .filter((e) => e.client === client)
  //         .map((invoice, key) => (
  //           <div
  //             className="detailsRow"
  //             key={key}
  //             style={{ display: "flex", flexDirection: "row", gap: "6px" }}
  //           >
  //             <div
  //               style={{
  //                 display: "flex",
  //                 flexDirection: "column",
  //                 marginLeft: "5px",
  //               }}
  //             >
  //               {invoice.id}
  //             </div>
  //             <div
  //               style={{
  //                 display: "flex",
  //                 flexDirection: "column",
  //                 marginLeft: "280px",
  //               }}
  //             >
  //               {invoice.amount}
  //             </div>
  //           </div>
  //         ))}
  //     </div>
  //   );
  // };