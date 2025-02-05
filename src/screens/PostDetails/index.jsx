
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom"; // hook para acessar o parâmetro da URL
import { api } from "../../service/config";

export const PostDetails = () => {
    const { id } = useParams(); //Vai capturar o ID da URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPostById = async () => {
        try {
            const response = await api.get(`/posts/${id}`);
            setPost(response.data);

        } catch (error) {
            setError('Erro ao carregar o post.');
            console.log(error);

        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        window.confirm("Tem certeza que deseja excluir essa publicação?")
    };

    useEffect(() => {
        getPostById();
    }, [id]) //Executa sempre que o id mudar

    if (loading) return <p>Carregando...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="post">
            <NavLink to="/"
                style={{ marginBottom: "1rem" }}
            >
                <img src="../../../public/arrow.svg" alt="" />
                Voltar
            </NavLink>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <h2>{post.title}</h2>
                <img onClick={handleDelete} src="../../../public/delete.svg" alt="" />
            </div>
            <p dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, '<br/>') }}></p>
        </div>
    )
};
