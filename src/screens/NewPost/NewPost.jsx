
import './NewPost.css';
import { blogFetch } from '../../axios/config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NewPost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const createPost = async (event) => {
        event.preventDefault();
        // Informações de acordo com o que a API indica
        const post = { title, body, userId: 1 };

        try {
            await blogFetch.post("/posts", post);
            alert('Post criado com sucesso');
            setTitle('');
            setBody('');
            navigate('/');
        } catch (error) {
            console.error("Erro ao criar o post:", error);
            alert('Erro ao criar o post');
        }
    };

    // Verifica se os campos estão vazios 
    const isFormValid = title.trim() !== '' && body.trim() !== '';


    return (
        <div className="new-post">
            <h2>Inserir novo post</h2>
            <form onSubmit={(event) => createPost(event)}>
                <div className="form-control">
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Digite o título"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="body">Conteúdo</label>
                    <textarea
                        name="body"
                        id="body"
                        placeholder="Digite o conteúdo do post"
                        onChange={(event) => setBody(event.target.value)}
                    >
                    </textarea>
                </div>
                <input
                    type="submit"
                    value="Criar post"
                    className="btn"
                    disabled={!isFormValid} //Vai desabilitar o botão caso o form não esteja preecnhido corretamente
                />
            </form>
        </div>
    )
};
