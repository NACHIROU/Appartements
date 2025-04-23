import { Routes, Route } from "react-router-dom";
import ApartmentListPage from "./pages/ApartmentListPage";
import AddApartmentPage from "./pages/AddApartmentFormPage";
import Header from "./components/Header";
import './App.css';


function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <div className="p-4 max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<ApartmentListPage />} />
          <Route path="/ajouter" element={<AddApartmentPage />} />
          
        </Routes>
      </div>
    </div>
  );
}
export default App;
