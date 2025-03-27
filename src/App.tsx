import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/client/Index";
import Login from "./pages/client/Login";
import SignUp from "./pages/client/SignUp";
import Profile from "./pages/client/Profile";
import Users from "./pages/admin/Users";
import Items from "./pages/admin/Items";
import AdminDashboard from "./pages/admin/Dashboard";
import SellerApplications from "./pages/admin/SellerApplications";
import AuctionApprovals from "./pages/admin/AuctionApprovals";
import AuctionsPage from "./pages/client/AuctionsPage";
import AuctionPage from "./pages/client/AuctionPage";
import ArtistsPage from "./pages/client/ArtistsPage";
import ArtistDetailPage from "./pages/client/ArtistDetailPage";
import AboutPage from "./pages/client/AboutPage";
import NotFound from "./pages/client/NotFound";
import ForgotPassword from "./pages/client/ForgotPassword";
import ResetPassword from "./pages/client/ResetPassword";
import SellerApplication from "./pages/client/SellerApplication";
import SellerDashboard from "./pages/seller/Dashboard";

// Create a client with default options for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auctions" element={<AuctionsPage />} />
            <Route path="/artwork/:id" element={<AuctionPage />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/artist/:id" element={<ArtistDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/seller-application" element={
              <ProtectedRoute>
                <SellerApplication />
              </ProtectedRoute>
            } />
            
            Admin Routes
            <Route path="/admindashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            } />
            <Route path="/items" element={
              <ProtectedRoute>
                <Items />
              </ProtectedRoute>
            } />
            <Route path="/seller-applications" element={
              <ProtectedRoute>
                <SellerApplications />
              </ProtectedRoute>
            } />
            <Route path="/auction-approvals" element={
              <ProtectedRoute>
                <AuctionApprovals />
              </ProtectedRoute>
            } />

            {/* Seller Routes */}
            <Route path="/seller/dashboard" element={
              <ProtectedRoute>
                <SellerDashboard />
              </ProtectedRoute>
            } />
            
            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
