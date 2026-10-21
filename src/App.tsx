import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CreateRecipePage from './pages/CreateRecipePage';
import MenuPlannerPage from './pages/MenuPlannerPage';
import ProfilePage from './pages/ProfilePage';
import SavedPage from './pages/SavedPage';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen" style={{ backgroundColor: '#FAFAF5' }}>
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 md:ml-64 pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-4 py-6">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                <Route path="/create" element={<CreateRecipePage />} />
                <Route path="/planner" element={<MenuPlannerPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/saved" element={<SavedPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
