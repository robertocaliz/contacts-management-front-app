'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Square {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
}

export const SquareRain: React.FC = () => {
    const [squares, setSquares] = useState<Square[]>([]);
    const [isRaining, setIsRaining] = useState(true);

    // Adiciona um novo quadrado à chuva
    const addSquare = () => {
        if (!isRaining) return;

        const newSquare: Square = {
            id: Date.now(),
            x: Math.random() * window.innerWidth,
            y: -50,
            size: Math.random() * 20 + 10,
            color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
        };

        setSquares((prevSquares) => [...prevSquares, newSquare]);
    };

    // Remove um quadrado após ter caído para fora da tela
    const removeSquare = (id: number) => {
        setSquares((prevSquares) =>
            prevSquares.filter((square) => square.id !== id),
        );
    };

    // Inicia a chuva
    useEffect(() => {
        const interval = setInterval(addSquare, 100); // Adiciona um novo quadrado a cada 100ms

        setTimeout(() => {
            clearInterval(interval); // Para de adicionar quadrados após 3 segundos
            setIsRaining(false); // Define isRaining para false para parar de adicionar quadrados
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Atualiza a posição dos quadrados
    useEffect(() => {
        if (!isRaining) return;

        const updateSquarePositions = () => {
            setSquares((prevSquares) =>
                prevSquares.map((square) => ({
                    ...square,
                    y: square.y + Math.random() * 5 + 2, // Altere a velocidade aqui ajustando este valor
                })),
            );
        };

        const animationFrame = requestAnimationFrame(updateSquarePositions);

        return () => cancelAnimationFrame(animationFrame);
    }, [isRaining]);

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            {squares.map((square) => (
                <motion.div
                    key={square.id}
                    style={{
                        position: 'absolute',
                        top: square.y,
                        left: square.x,
                        width: square.size,
                        height: square.size,
                        backgroundColor: square.color,
                    }}
                    animate={{ y: '100vh' }} // Define o movimento para baixo
                    transition={{ duration: 3, ease: 'linear' }} // Ajusta a velocidade aqui alterando a duração
                    onAnimationComplete={() => removeSquare(square.id)} // Remove o quadrado após completar a animação
                />
            ))}
        </div>
    );
};
