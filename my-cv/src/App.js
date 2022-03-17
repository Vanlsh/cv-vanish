import "./App.css";
import "./index.css";
import ProtfolioContainer from "./ProtfolioContainer/PortfolioContainer";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
        <ToastContainer/>
      <ProtfolioContainer />
    </div>
  );
}

export default App;
