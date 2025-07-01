
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Container, Loading, Owner, BackButton, IssuesList, PageAction, FilterList } from './style';
import { FaArrowLeft } from 'react-icons/fa';

export default function Repositorio() {
    const [repositorio, setRepositorio] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const [filter, setFilter] = useState([
        { state: 'all', label: 'Todas', active: true },
        { state: 'open', label: 'Abertas', active: false },
        { state: 'closed', label: 'Fechadas', active: false },
    ]);
    const [filterIndex, setFilterIndex] = useState(0);

    const { repositorio: nomeRepo } = useParams(); 



    useEffect(() => {
    async function loadRepositorio() {
        try {
        const [repoData, issuesData] = await Promise.all([
            api.get(`/repos/${nomeRepo}`),
            api.get(`/repos/${nomeRepo}/issues`, {
            params: {
                state: filter.find((f) => f.active).state,
                per_page: 4,
            },
            }),
        ]);

        setRepositorio(repoData.data);
        setIssues(issuesData.data);
        } catch (error) {
        console.error("Erro ao carregar dados do repositório:", error);
        } finally {
        setLoading(false);
        }
    }

    loadRepositorio();
    }, [nomeRepo, filter]);


    useEffect(() => {
        async function loadIssues(){
            try {
                const response = await api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: filter[filterIndex].state,
                        per_page: 4,
                        page,
                    },
                });

                setIssues(response.data);
                // console.log(filterIndex);
                
            } catch (error) {
                console.error("Erro ao carregar issues:", error);
            }
        }
        loadIssues();
        
    }, [ page, nomeRepo, filterIndex, filter]);
    function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
    }

    function handleFilter(index) {
    setFilterIndex(index);
    const active = filter.map((f) => ({ ...f, active: false }));
    active[index].active = true;
    setFilter(active);
    }

    if (loading) {
    return (

        <Loading>
            <h1>Carregando...</h1>
        </Loading>
    )  

    }

    return (
    <Container>
        <BackButton to="/">
            <FaArrowLeft size={16} />
        </BackButton>
        <Owner>
            <img src={repositorio.owner?.avatar_url} alt={repositorio.owner.login} />
            <h1>{repositorio.name}</h1>
            <p>{repositorio.description}</p>
        </Owner>

        <FilterList active={filterIndex}>
            {filter.map((filter, index) => (
            <button
                type="button"
                key={filter.label}
                onClick={() => handleFilter(index)}
            >
                {filter.label}
            </button> 
            ))}   
        </FilterList>

        <IssuesList>
            {issues.map((issue) => (
            <li key={issue.id}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />

                <div>
                <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map((label) => (
                    <span key={label.id}>{label.name}</span>
                    ))}
                </strong>

                <p>{issue.user.login}</p>
                </div>
            </li>
            ))}
        </IssuesList>
        <PageAction>
            <button type="button" onClick={() => handlePage('back')} disabled={page < 2}>Anterior</button>

            <button type="button" onClick={() => handlePage('next')}>Próximo</button>
        </PageAction>
    
    </Container>
    );
}
