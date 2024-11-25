import React, { useState } from "react";

const UrlEncoder = () => {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    setEncoded(encodeURIComponent(text));
  };

  return (
    <div>
      <h1>URL-кодировщик</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Введите текст"
      />
      <p>Закодированный текст:</p>
      <textarea readOnly value={encoded} />
    </div>
  );
};

export default UrlEncoder;
