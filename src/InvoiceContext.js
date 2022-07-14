import React, { createContext, useState } from "react";

const InvoiceContext = createContext();


export function InvoiceProvider({ children }) {
    const [tableData, setTableData] = useState(null);



    return (
        <InvoiceContext.Provider
            value={{
                invoiceValue: [tableData, setTableData],
            }}
        >
            {children}
        </InvoiceContext.Provider>
    );
}

export default InvoiceContext;