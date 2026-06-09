import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { InterviewMode } from './components/InterviewMode';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [theme, setTheme] = useState(() => {
    // Check localStorage or default to dark
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {selectedProblem ? (
        <InterviewMode
          problem={selectedProblem}
          onBack={() => setSelectedProblem(null)}
        />
      ) : (
        <Dashboard onSelectProblem={setSelectedProblem} />
      )}
    </>
  );
}

export default App;
