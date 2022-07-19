import React, { createContext, useState } from "react";

const InvoiceContext = createContext();


export function InvoiceProvider({ children }) {
    const [tableData, setTableData] = useState();
    const [isEdit, setIsEdit] = useState(false)



    return (
        <InvoiceContext.Provider
            value={{
                invoiceValue: [tableData, setTableData],
                invoiceEditValue: [isEdit, setIsEdit]
            }}
        >
            {children}
        </InvoiceContext.Provider>
    );
}

export default InvoiceContext;