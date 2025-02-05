import React from "react";
import { api } from "../service/config";
import { useNavigate } from "react-router-dom";

export function usePosts() {
    const navigate = useNavigate();

    const createPost = async (event) => {
        event.preventDefault();
        // Informações de acordo com o que a API indica
        const post = { title, body, userId: 1 };

        try {
            await api.post("/posts", post);
            alert('Post criado com sucesso');
            setTitle('');
            setBody('');
            navigate('/');
        } catch (error) {
            console.error("Erro ao criar o post:", error);
            alert('Erro ao criar o post');
        }
    };
;
};
