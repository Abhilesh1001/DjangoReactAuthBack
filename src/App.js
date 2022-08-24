import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import TextForm1 from './components/TextForm1'

let name = 'Harry'
function App() {
  return (
    <>  
      <Navbar title ='TextUtils' aboutText = 'About TextUtis'/>
      <div className="container">
      <TextForm1 heading = 'Enter the text to analyse'/>
      </div>
</>
  );
}

export default App;
