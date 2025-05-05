import { useState } from 'react';
import './App.css';

function App() {
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');

  const buscarCep = () => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.erro) {
          setErro('CEP não encontrado');
          setDados(null);
        } else {
          setErro('');
          setDados(data);
        }
      })
      .catch(() => {
        setErro('Erro na busca');
        setDados(null);
      });
  };

  return (
    <div className="App">
      <input
        type="text"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
        placeholder="Digite o CEP"
      />
      <button onClick={buscarCep}>Buscar</button>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {dados && (
        <div>
          <p><strong>Logradouro:</strong> {dados.logradouro}</p>
          <p><strong>Bairro:</strong> {dados.bairro}</p>
          <p><strong>Localidade:</strong> {dados.localidade}</p>
          <p><strong>UF:</strong> {dados.uf}</p>
        </div>
      )}
    </div>
  );
}

export default App;