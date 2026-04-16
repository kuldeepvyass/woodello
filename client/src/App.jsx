import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoriesPage from "./pages/CategoriesPage";
import HowToChoosePage from "./pages/HowToChoosePage";
import ApplicationGuidePage from "./pages/ApplicationGuidePage";
import ShadeGalleryPage from "./pages/ShadeGalleryPage";
import TechnicalDownloadsPage from "./pages/TechnicalDownloadsPage";
import MerchantPage from "./pages/MerchantPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/product-single" element={<Navigate to="/products/ultraguard-pu-matt" replace />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/how-to-choose" element={<HowToChoosePage />} />
        <Route path="/application-guide" element={<ApplicationGuidePage />} />
        <Route path="/shade-gallery" element={<ShadeGalleryPage />} />
        <Route path="/technical-downloads" element={<TechnicalDownloadsPage />} />
        <Route path="/become-merchant" element={<MerchantPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
