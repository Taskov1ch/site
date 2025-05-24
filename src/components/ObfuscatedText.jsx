// src/components/ObfuscatedText.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../styles/ObfuscatedText.css'; // Добавим немного стилей

const ObfuscatedText = ({
  text,
  start,
  delay = 0,
  speed = 20, // Скорость проявления (мс на символ)
  // Символ(ы) для маскировки
  charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:",.<>?/`~ あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const isMounted = useRef(false);

  // Генерируем начальный обфусцированный текст один раз
  const obfuscationChar = '*'; // Default obfuscation character
  const initialText = useMemo(() => {
    return text.split('').map(char => (char === ' ' ? ' ' : obfuscationChar)).join('');
  }, [text, obfuscationChar]);

  useEffect(() => {
    // Устанавливаем начальное состояние при монтировании
    if (!isMounted.current) {
        setDisplayedText(initialText);
        isMounted.current = true;
    }

    // Функция очистки
    const cleanup = () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };

    if (start) {
      cleanup(); // Очищаем предыдущие таймеры на случай ре-рендера

      timeoutRef.current = setTimeout(() => {
        let index = 0;
        let currentText = initialText.split('');

        intervalRef.current = setInterval(() => {
          let changesMade = false;
          // Проходимся по тексту и "раскрываем" символы
          for (let i = 0; i < text.length; i++) {
              if (i < index && currentText[i] !== text[i]) {
                  currentText[i] = text[i];
                  changesMade = true;
              } else if (i >= index && text[i] !== ' ') {
                  // Показываем случайные символы для тех, что еще не раскрыты
                  currentText[i] = charSet[Math.floor(Math.random() * charSet.length)];
                  changesMade = true;
              }
          }

          if (changesMade) {
              setDisplayedText(currentText.join(''));
          }

          index++;

          if (index > text.length + 10) { // +10 для небольшого эффекта в конце
            clearInterval(intervalRef.current);
            setDisplayedText(text); // Устанавливаем финальный текст
          }
        }, speed);
      }, delay);

    } else {
        // Если start=false, сбрасываем к начальному (если нужно)
        // setDisplayedText(initialText);
    }

    return cleanup; // Очищаем при размонтировании или изменении зависимостей
  }, [text, start, delay, speed, charSet, initialText]);

  return <span className="obfuscated-text">{displayedText}</span>;
};

export default ObfuscatedText;