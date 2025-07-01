import {
  Container,
  Form,
  SubmitButton,
  List,
  DeleteButton,
  ErrorText,
} from './style';
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import { useState, useCallback, useEffect } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Buscar do localStorage ao abrir
  useEffect(() => {
    const repositoriosStorage = localStorage.getItem('repos');
    if (repositoriosStorage) {
      setRepositorios(JSON.parse(repositoriosStorage));
    }
  }, []);

  // Salvar alterações no localStorage
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (newRepo.trim() === '') {
        setErrorMsg('Por favor, digite o nome do repositório.');
        return;
      }

      async function submit() {
        setLoading(true);
        setAlert(null);

        try {
          const response = await api.get(`/repos/${newRepo}`);
          const repoName = response.data.full_name;

          const hasRepo = repositorios.find(
            (repo) => repo.name.toLowerCase() === repoName.toLowerCase()
          );

          if (hasRepo) {
            throw new Error('Repositório Duplicado');
          }

          const data = {
            name: repoName,
            html_url: response.data.html_url,
          };

          setRepositorios([...repositorios, data]);
          setNewRepo('');
          setErrorMsg('');
        } catch (err) {
          if (err.message === 'Repositório Duplicado') {
            setErrorMsg('Esse repositório já foi adicionado.');
          } else {
            setErrorMsg('Repositório não encontrado ou inválido.');
          }
          setAlert(true);
          console.log(err);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositorios]
  );

  function handleInputChange(e) {
    setNewRepo(e.target.value);
    setAlert(null);
    setErrorMsg(''); // limpa a mensagem ao digitar
  }

  const handleDelete = useCallback(
    (repoDelete) => {
      const find = repositorios.filter((repo) => repo.name !== repoDelete);
      setRepositorios(find);
    },
    [repositorios]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
          type="text"
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#000" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      {errorMsg && <ErrorText>{errorMsg}</ErrorText>}

      <List>
        {repositorios.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
