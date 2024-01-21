import logo from './logo.svg';
import './App.css';
import PersonPage from './pages/PersonPage';
import { ScheduleProvider } from './contexts/ScheduleContext';
import ScheduleOptionsPage from './pages/ScheduleOptionsPage';
import SchedulePage from './pages/SchedulePage';


function App() {
  return (
    <div className="App">
      <body>
        <ScheduleProvider>
          <PersonPage />
          <ScheduleOptionsPage />
          <SchedulePage />
        </ScheduleProvider>
      </body>
    </div>
  );
}

export default App;
