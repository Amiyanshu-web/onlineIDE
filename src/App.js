import logo from './logo.svg';
import './App.css';
import Question from './component/Question/question';
import Complier from './component/IDE/Complier';

function App() {
  return (
    <div className="App d-flex">
      <Question className='question'/>
      <Complier className='complier'/>
    </div>
  );
}

export default App;
