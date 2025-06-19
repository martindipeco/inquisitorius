import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router } from 'react-router-dom';
import Form from './components/Form/Form';
import { FormValues } from './components/Form/Form.types';

function App() {

  const handleSubmit = async (values: FormValues) => {
    // Aquí va la conexión para el backend Spring Boot
    console.log('Datos a enviar:', values);

  };

  return (
    <><LoginPage />
    <Router>
      <Form onSubmit={handleSubmit} />
    </Router></>
    
  );
}

export default App;
