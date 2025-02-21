import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { InputPage } from './pages/InputPage';
import { QuestionPage } from './pages/QuestionPage';
import { BusinessCanvasPage } from './pages/BusinessCanvasPage';
import { BusinessGraphPage } from './pages/BusinessGraphPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/questions" element={<QuestionPage />} />
          <Route path="/business-canvas" element={<BusinessCanvasPage />} />
          <Route path="/business-graph" element={<BusinessGraphPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;