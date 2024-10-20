
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from "./pages/IndexPage/IndexPage";
import FormPage from "./pages/FormPage";


function App() {
  return (
       <BrowserRouter>
         <Routes>
           <Route path="/" element={<IndexPage/>} />
           <Route path="/requestForm" element={<FormPage/>}/>
         </Routes>
       </BrowserRouter>
  );
}

export default App;
