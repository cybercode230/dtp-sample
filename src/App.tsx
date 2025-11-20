import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/security/NotFound";

const Home = lazy(() => import("./pages/Home/Home"));
const AuthIndex = lazy(() => import("./pages/Auths/Index"));
const Signin = lazy(() => import("./pages/Auths/Signin"));
const Signup = lazy(() => import("./pages/Auths/Signup"));
const VerifyAccount = lazy(() => import("./pages/Auths/VerifyAccount"));
const ForgotPassword = lazy(() => import("./pages/Auths/ForgotPassword"));

const App: React.FC = () => (
  <Router>
    <Suspense fallback={<div className="h-screen flex items-center justify-center text-gray-500 animate-pulse">Loading...</div>}>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth nested routes */}
        <Route path="/auth" element={<AuthIndex />}>
          <Route index element={<Navigate to="signin" replace />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="verify" element={<VerifyAccount />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
