import { useState, useEffect } from "react";

useEffect(() => {
  const saved = localStorage.getItem("todos");
  if (saved) {
    setTodos(JSON.parse(saved));
  }
}, []);
type Todo = {
  text: string;
  done: boolean;
};

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { text: text.trim(), done: false }]);
    setText("");
  };
  
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
  const toggleTodo = (index: number) => {
    setTodos(
      todos.map((t, i) =>
        i === index ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
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
            style={{
              ...styles.item,
              background: todo.done ? "#EAEAEA" : "#fff",
              color: todo.done ? "#888" : "#000",
              textDecoration: todo.done ? "line-through" : "none",
            }}
            onClick={() => toggleTodo(index)}          // ワンタップ：チェック
            onDoubleClick={() => deleteTodo(index)}    // ダブルタップ：削除
          >
            {todo.text}
          </div>
        ))}
      </div>

      <div style={styles.hint}>
        タップ：チェック ／ ダブルタップ：削除
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
    borderRadius: 12,
    marginBottom: 8,
    fontSize: 16,
    cursor: "pointer",
    userSelect: "none",
    transition: "0.15s",
  },
  hint: {
    marginTop: 12,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
};
