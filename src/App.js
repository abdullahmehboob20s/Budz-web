import ScrollToTop from "components/ScrollToTop";
import CompetitionRules from "pages/CompetitionRules/CompetitionRules";
import HomePage from "pages/HomePage/HomePage";
import PrivacyPolicy from "pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "pages/TermsAndConditions/TermsAndConditions";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/term-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/competition-rules" element={<CompetitionRules />} />
      </Routes>
    </Router>
  );
}

export default App;
