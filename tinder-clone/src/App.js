import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router} from 'react-router-dom';
import MainComponent from './component/MainComponent';
function App() {
  return (
    <div className="App">
      <Router>
          <MainComponent />
      </Router>
    </div>
  );
}

export default App;
