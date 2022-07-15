import Invoices from './components/Invoices/Invoices.jsx';
import { Routes, Route } from 'react-router-dom';
import InvoiceClient from './components/InvoiceClient/InvoiceClient.jsx';



function App() {
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
