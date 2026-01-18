import { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, text.trim()]);
    setText("");
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>やること</h1>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="やることを入力"
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <button style={styles.addBtn} onClick={addTodo}>
          追加
        </button>
      </div>

      <div>
        {todos.map((todo, index) => (
          <div
            key={index}
            style={styles.item}
            onClick={() =>
              setTodos(todos.filter((_, i) => i !== index))
            }
          >
            {todo}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    padding: 16,
    background: "#FFF7EE",
    fontFamily: "-apple-system",
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: "center",
  },
  inputArea: {
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16, // ★ iPhoneズーム防止
    padding: 10,
    borderRadius: 10,
    border: "1px solid #ccc",
  },
  addBtn: {
    fontSize: 16,
    padding: "0 14px",
    borderRadius: 10,
    border: "none",
    background: "#FFB703",
  },
  item: {
    padding: 14,
    background: "#fff",
    borderRadius: 12,
    marginBottom: 8,
    fontSize: 16,
    cursor: "pointer",
    userSelect: "none",
  },
};
