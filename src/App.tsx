import { useState } from 'react';
import { Login, SignUp } from './features/auth/index.js';
import './App.css';

type AuthView = 'login' | 'signup' | 'app';

function App() {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  // Render different views based on state
  if (currentView === 'login') {
    return <Login onSignUpClick={() => setCurrentView('signup')} />;
  }

  if (currentView === 'signup') {
    return <SignUp onSignInClick={() => setCurrentView('login')} />;
  }

  // Main app view (placeholder for now)
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Notes App</h1>
        <p className="text-gray-600">Main app view - To be implemented</p>
        <button
          onClick={() => setCurrentView('login')}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default App;
