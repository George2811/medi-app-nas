import { Container } from 'react-bootstrap';
import './App.css';
import Bar from './components/Bar';
import TableHome from './components/TableHome';

function App() {
  return (
    <div className="App">
      <Bar></Bar>
      <Container className='mt-3 mb-5'>
        <TableHome/>
      </Container>
    </div>
  );
}

export default App;
