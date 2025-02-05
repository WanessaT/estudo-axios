
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './style.css'
import { api } from "../../service/config";

const previewText = (text, maxLength = 290) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [totalPosts, setTotalPosts] = useState(0); //Total de posts
    const [loading, setLoading] = useState(false);

    // Buscando os posts com paginação
    const getPosts = async (page) => {
        setLoading(true);
        console.log(`Fetching posts for page ${page}`);
        try {
            const response = await api.get("/posts", {
                headers: {
                    "Cache-Control": "no-cache"
                }
            });
            setPosts(response.data);
            setTotalPosts(Number(response.headers["x-total-count"])); // Total de posts da API

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        window.confirm("Tem certeza que deseja excluir essa publicação?")
    }

    // Chama a função de buscar posts sempre que a página atual mudar 
    useEffect(() => {
        getPosts();
    }, []);

    // Função para avançar ou voltar páginas 
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(totalPosts)) {
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
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <h2>{post.title}</h2>
                            <img onClick={handleDelete} src="../../../public/delete.svg" alt="" />
                        </div>
                        <p>{previewText(post.body, 290)}</p>
                        <Link to={`/posts/${post.id}`} className="btn">Ler mais</Link>
                    </div>
                ))
            )}
            {/* <div className="pagination">
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
            </div> */}
        </div>
    )
};
