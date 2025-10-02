import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, SignUp } from './features/auth/index.js';
import { HomePage } from './components/HomePage';
import { NoteViewPage } from './pages/NoteViewPage';
import './App.css';

type AuthView = 'login' | 'signup' | 'app';

function App() {
  const [currentView, setCurrentView] = useState<AuthView>('app');

  // Render different views based on state
  if (currentView === 'login') {
    return <Login onSignUpClick={() => setCurrentView('signup')} />;
  }

  if (currentView === 'signup') {
    return <SignUp onSignInClick={() => setCurrentView('login')} />;
  }

  // Main app view with routing
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes/:id" element={<NoteViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
