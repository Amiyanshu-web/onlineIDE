import logo from './logo.svg';
import './App.css';
import Question from './component/Question/question';
import Complier from './component/IDE/Complier';
import Header from './component/Header';

function App() {
  return (
    <>
      <Header/>
    <div className="App d-flex">
      <Question />
      <Complier />
    </div>
    </>
  );
}

export default App;
