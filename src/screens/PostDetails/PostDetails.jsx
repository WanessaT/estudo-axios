
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // hook para acessar o parâmetro da URL
import { blogFetch } from "../../axios/config";

export const PostDetails = () => {
    const { id } = useParams(); //Vai capturar o ID da URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPostById = async () => {
        try {
            const response = await blogFetch.get(`/posts/${id}`);
            setPost(response.data);

        } catch (error) {
            setError('Erro ao carregar o post.');
            console.log(error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPostById();
    }, [id]) //Executa sempre que o id mudar

    if (loading) return <p>Carregando...</p>
    if (error) return <p>{error}</p>

    return (
        <div className="post">
            <h2>{post.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: post.body.replace(/\n/g, '<br/>') }}></p>
        </div>
    )
};
