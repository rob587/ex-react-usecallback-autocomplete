import { useState, useEffect, useCallback } from "react";

function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue === "") {
      setData([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      const url = `http://localhost:3333/products?search=${inputValue}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(data);
        });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  return (
    <>
      <input
        type="text"
        placeholder="cerca prodotto"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {inputValue && data.length > 0 && (
        <ul>
          {data.map((product, i) => (
            <li key={i}>{product.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
