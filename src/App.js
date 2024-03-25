import { useSelector } from 'react-redux';
import './App.css';
import Board from './components/Board';
import Menu from './components/Menu';

function App() {
  const start = useSelector(state => state.startGame.value)
  console.log(start)
  return (
    <div className=''>
      {start ? <Board/> : <Menu/>}
    </div>
  );
}

export default App;
