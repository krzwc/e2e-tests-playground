import "./App.css";
import "antd/dist/antd.css";
import { JobBoard } from "./components/job-board";

function App() {
  return (
    <div className="App">
      <h3>Interplanetary job postings</h3>
      <JobBoard />
    </div>
  );
}

export default App;
