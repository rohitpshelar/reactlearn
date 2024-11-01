import './App.css';
import Navbar from './components/Navbar';
import Textform from './components/Textform';

function App() {
  return (
    <>
    <Navbar title={"Rohit"}/>
    <div className='container'>
    <Textform title={"Enter text"}/>
    </div>  
    </>
  );
}

export default App;
