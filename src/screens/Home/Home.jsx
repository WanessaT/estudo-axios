
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Home.css'
import { blogFetch } from "../../axios/config";

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); //Controla a página atual
    const postPerPage = 5; //Definindo quantos posts serão exibidos em cada página 
    const [totalPosts, setTotalPosts] = useState(0); //Total de posts
    const [loading, setLoading] = useState(false);

    // Buscando os posts com paginação
    const getPosts = async (page) => {
        setLoading(true);
        try {
            const response = await blogFetch.get("/posts", {
                params: {
                    _limit: postPerPage,
                    _page: page,
                },
                headers: {
                    "Cache-Control": "no-cache"
                }
            });
            setPosts([...response.data]);
            setTotalPosts(Number(response.headers["x-total-count"])); // Total de posts da API

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // Chama a função de buscar posts sempre que a página atual mudar 
    useEffect(() => {
        getPosts(currentPage);
    }, [currentPage]);

    // Função para avançar ou voltar páginas 
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalPosts / postPerPage)) {
            setCurrentPage(newPage);
        };
    };


    return (
        <div className="home">
            <h1>Últimas publicações</h1>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                posts.map((post) => (
                    <div className="post" key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <Link to={`/posts/${post.id}`} className="btn">Ler mais</Link>
                    </div>
                ))
            )}
            <div className="pagination">
                <button
                    className="btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <span>Página {currentPage}</span>
                <button
                    className="btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= Math.ceil(totalPosts / postPerPage)}
                >
                    Próxima
                </button>
            </div>
        </div>
    )
};
