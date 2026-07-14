import { BrowserRouter, Routes, Route } from "react-router-dom";
import FloatingChatButton from "./components/FloatingChatButton";
import Hero from "./components/Hero";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Chat from "./pages/Chat";
import Gallery from "./pages/Gallery";
import GalleryMedia from "./pages/GalleryMedia";
import Donate from "./pages/Donate";
import DonateDetails from "./pages/DonateDetails";
import DocumentViewer from "./pages/DocumentViewer";
import Visit from "./pages/Visit";
import Restoration from "./pages/Restoration";
import RestorationPhoto from "./pages/RestorationPhoto";
import Documents from "./pages/Documents";
import History from "./pages/History";
import DonorList from "./pages/DonorList";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route path="/chat" element={<Chat />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/gallery/:sectionSlug/:mediaIndex"
            element={<GalleryMedia />}
          />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donate/details" element={<DonateDetails />} />
          <Route path="/visit" element={<Visit />} />
          <Route path="/restoration" element={<Restoration />} />
          <Route
            path="/restoration/:sectionSlug/:photoIndex"
            element={<RestorationPhoto />}
          />
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/:documentIndex" element={<DocumentViewer />} />
          <Route path="/history" element={<History />} />
          
        </Routes>
        <FloatingChatButton />
        <Routes>
          <Route path="/donor-list" element={<DonorList />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
