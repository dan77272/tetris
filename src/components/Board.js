import { useEffect, useState } from "react";
import Next from "./Next";
import Score from "./Score";
import shapes from './shapes'
import { useDispatch, useSelector } from "react-redux";
import { increaseScore } from "../features/scoreSlice";

export default function Board() {
    const ROWS = 20;
    const COLUMNS = 10;

    const pieces = ['I', 'L', 'J', 'O', 'S', 'Z', 'T'];
    const pieceColours = {'I': '#00f0f0', 'L': '#0000f0', 'J': '#f0a000', 'O': '#f0f000', 'S': '#00f000', 'Z': '#a000f0', 'T': '#f00000'}
    const [currentPieceType, setCurrentPieceType] = useState(() => pieces[Math.floor(Math.random() * pieces.length)]);
    const [piecePosition, setPiecePosition] = useState({ x: Math.floor(COLUMNS / 2) - 2, y: 0 }); // Start from the top middle
    const [board, setBoard] = useState(() => Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0)));

    const [rotate, setRotate] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)
    const dispatch = useDispatch()
    const level = useSelector(state => state.level.value)
    
    const clearSound = new Audio('./clear.wav');

    function rotatePiece() {
        let newRotate = (rotate + 1) % 4;
        let newShape = shapes[currentPieceType][newRotate];
        let offset = 0;
    
        // Check if the new shape will be out of bounds and calculate the necessary offset
        for (let y = 0; y < newShape.length; y++) {
            for (let x = 0; x < newShape[y].length; x++) {
                if (newShape[y][x]) {
                    let newX = piecePosition.x + x;
                    if (newX >= COLUMNS) {
                        offset = Math.max(offset, newX - COLUMNS + 1);
                    }
                }
            }
        }
    
        // Apply the offset if needed to keep the piece within the board
        if (offset > 0) {
            const newX = piecePosition.x - offset;
            if (!checkCollision(newX, piecePosition.y, currentPieceType, newRotate)) {
                setPiecePosition({ x: newX, y: piecePosition.y });
                setRotate(newRotate);
            }
        } else {
            if (!checkCollision(piecePosition.x, piecePosition.y, currentPieceType, newRotate)) {
                setRotate(newRotate);
            }
        }
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    movePiece(-1, 0);
                    break;
                case 'ArrowRight':
                    movePiece(1, 0);
                    break;
                case 'ArrowDown':
                    movePiece(0, 1);
                    break;
                case 'ArrowUp':
                    rotatePiece()
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [piecePosition, currentPieceType, board, rotate]);

    function movePiece(dx, dy) {
        const newX = piecePosition.x + dx;
        const newY = piecePosition.y + dy;
    
        if (!checkCollision(newX, newY, currentPieceType)) {
            setPiecePosition({ x: newX, y: newY });
        } else {
            if (dy > 0) { // Collision occurred while moving down
                let newBoard = getBoardWithPiece();
                let clearedInfo = checkAndClearFullLines(newBoard);
                newBoard = clearedInfo.clearedBoard;
    
                setRotate(0);
                setBoard(newBoard);
                
                // Check for game over condition (e.g., collision at top of the board)
                if (piecePosition.y === 0) {
                    // Set a game over state here
                    setIsGameOver(true);
                } else {
                    // Continue the game with a new piece
                    setCurrentPieceType(pieces[Math.floor(Math.random() * pieces.length)]);
                    setPiecePosition({ x: Math.floor(COLUMNS / 2) - 2, y: 0 });
                }
            }
        }
    }
    

    useEffect(() => {
        let speed = (level === 1) ? 700 : (level === 2) ? 400 : (level === 3) ? 100 : 400
        const interval = setInterval(() => {
            movePiece(0, 1);
        }, speed);

        return () => clearInterval(interval);
    }, [piecePosition, currentPieceType, board]);

    const checkCollision = (x, y, type) => {
        const shape = shapes[type][rotate];
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j]) {
                    const newX = x + j;
                    const newY = y + i;
                    if (newX >= COLUMNS || newX < 0 || newY >= ROWS || (newY >= 0 && board[newY][newX])) {
                        return true; // Collision detected
                    }
                }
            }
        }
        return false; // No collision
    };

    function getBoardWithPiece() {
        const newBoard = board.map(row => [...row]);
        const shape = shapes[currentPieceType][rotate];
        const pieceColor = pieceColours[currentPieceType];
        shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell) {
                    if (newBoard[y + piecePosition.y] && newBoard[y + piecePosition.y][x + piecePosition.x] !== undefined) {
                        newBoard[y + piecePosition.y][x + piecePosition.x] = pieceColor;
                    }
                }
            });
        });

        return newBoard;
    }

    function checkAndClearFullLines(board) {
        let newBoard = board.filter(row => row.some(cell => cell === 0));
        const linesCleared = ROWS - newBoard.length;

        if(linesCleared > 0) {
            clearSound.play()
            dispatch(increaseScore(linesCleared * 10))
        }
    
        while (newBoard.length < ROWS) {
            newBoard.unshift(Array(COLUMNS).fill(0));
        }
    
        return { clearedBoard: newBoard, linesCleared };
    }

    return (
        <div className="flex justify-center items-start h-screen pt-12">
            <Next/>
            {isGameOver ? 
            <div className="border-[5px] border-solid rounded-lg mx-24 h-[800px] w-[400px] flex justify-center items-center">
                <p className="text-[40px] font-semibold text-white">Gamer Over</p>
            </div> : 
            <div className="border-[5px] border-solid rounded-lg mx-24">
                <audio src="./Tetris.mp3" autoPlay loop>
                </audio>
                {getBoardWithPiece().map((row, rowIndex) => (
                    <div key={rowIndex} className="flex flex-row">
                        {row.map((cell, cellIndex) => (
                            <div key={cellIndex} style={{width: '40px', height: '40px', backgroundColor: cell !== 0 ? cell : 'transparent', border: 'solid 1px black'}}></div>
                        ))}
                    </div>
                ))}
            </div>
            }
            <Score/>
        </div>
    );
}
