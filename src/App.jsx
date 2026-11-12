import { Link, Navigate, Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage.jsx";
import ProductFormPage from "./pages/ProductFormPage.jsx";

export default function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/admin/products">
            Админка каталога
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/admin/products" replace />} />
        <Route path="/admin/products" element={<ProductListPage />} />
        <Route path="/admin/products/new" element={<ProductFormPage />} />
        <Route path="/admin/products/:id/edit" element={<ProductFormPage />} />
      </Routes>
    </>
  );
}
