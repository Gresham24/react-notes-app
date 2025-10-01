import { useState } from 'react';
import { Login, SignUp } from './features/auth/index.js';
import { HomePage } from './components/HomePage';
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

  // Main app view
  return <HomePage />;
}

export default App;
