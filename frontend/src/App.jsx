import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ApartmentsList from './components/ApartmentList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Bienvenue sur Mesdames et messieurs</h1>
      <ApartmentsList />
    </div>
  );
};

export default App
