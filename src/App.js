
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from "./pages/IndexPage/IndexPage";
import FormPage from "./pages/FormPage/FormPage";
import {AlertProvider} from "./hooks/useAlert";

function App() {
  return (
      <AlertProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<IndexPage/>} />
                  <Route path="/requestForm" element={<FormPage/>}/>
              </Routes>
          </BrowserRouter>
      </AlertProvider>
    
  );
}

export default App;
