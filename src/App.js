import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import GameIntro from './Components/GameIntro';
import NewGuess from './Components/NewGuess';
import PreviousGuess from './Components/PreviousGuess';


function App() {
  return (
    <div className="App">
      <Header />
      <GameIntro />
      <NewGuess />
      <PreviousGuess />
    </div>
  );
}

export default App;
