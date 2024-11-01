
"use client";

// app/register/page.jsx
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase'

export default function RegisterPage() {
  const [inputValue, setInputValue] = useState('');

  // Firestoreにデータを登録する関数
  const handleRegister = async () => {
    try {
      const docRef = await addDoc(collection(db, 'yourCollectionName'), {
        content: inputValue,
        createdAt: new Date(),
      });
      alert('データが登録されました。ドキュメントID: ' + docRef.id);
      setInputValue(''); // 入力値をリセット
    } catch (error) {
      console.error('登録中にエラーが発生しました:', error);
      alert('登録に失敗しました。');
    }
  };

  return (
    <div>
      <h1>データ登録</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="データを入力"
      />
      <button onClick={handleRegister}>Firestoreに登録</button>
    </div>
  );
}
