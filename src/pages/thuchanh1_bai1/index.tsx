import React, { useState } from 'react';
import { Card, InputNumber, Button, Typography, Space } from 'antd';

const { Title, Text } = Typography;

export default function thuchanh1_bai1() {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  const handleGuess = () => {
    if (guess === null) {
      setMessage('Vui lòng nhập số');
      return;
    }

    if (gameOver) return;

    const remaining = attempts - 1;
    setAttempts(remaining);

    if (guess < randomNumber) {
      setMessage('Bạn đoán quá thấp!');
    } else if (guess > randomNumber) {
      setMessage('Bạn đoán quá cao!');
    } else {
      setMessage('Chúc mừng! Bạn đã đoán đúng!');
      setGameOver(true);
      return;
    }

    if (remaining === 0) {
      setMessage(`Bạn đã hết lượt! Số đúng là ${randomNumber}`);
      setGameOver(true);
    }
  };

  const handleReset = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess(null);
    setMessage('');
    setAttempts(10);
    setGameOver(false);
  };

  return (
    <Card style={{ maxWidth: 500, margin: '40px auto' }}>
      <Title level={3}>Trò chơi đoán số (1 - 100)</Title>

      <Space direction="vertical" style={{ width: '100%' }}>
        <Text>Số lượt còn lại: {attempts}</Text>

        <InputNumber
          min={1}
          max={100}
          value={guess ?? undefined}
          onChange={(value) => setGuess(value)}
          style={{ width: '100%' }}
          disabled={gameOver}
        />

        <Button
          type="primary"
          onClick={handleGuess}
          disabled={gameOver}
        >
          Đoán
        </Button>

        {message && (
          <Text strong>{message}</Text>
        )}

        {gameOver && (
          <Button onClick={handleReset}>
            Chơi lại
          </Button>
        )}
      </Space>
    </Card>
  );
}