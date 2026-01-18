import { useEffect, useState } from "react";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  // 初回読み込み
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  // 保存
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([
      ...todos,
      { id: crypto.randomUUID(), text, done: false },
    ]);
    setText("");
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>今日のやること</h1>

      {/* 入力フォーム */}
      <form
        style={styles.form}
        onSubmit={(e) => {
          e.preventDefault(); // Enterで保存
          addTodo();
        }}
      >
        <input
          style={styles.input}
          type="text"
          placeholder="やることを入力"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button style={styles.add}>追加</button>
      </form>

      {/* リスト */}
      <div style={styles.list}>
        {todos.map(todo => (
          <div key={todo.id} style={styles.item}>
            <label style={styles.label}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
              />
              <span style={{
                ...styles.text,
                textDecoration: todo.done ? "line-through" : "none",
                color: todo.done ? "#aaa" : "#333"
              }}>
                {todo.text}
              </span>
            </label>
            <button
              style={styles.delete}
              onClick={() => removeTodo(todo.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: any = {
  page: {
    minHeight: "100vh",
    background: "#FFF7EE",
    padding: 16,
    fontFamily: "-apple-system",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
  },
  form: {
    width: "100%",
    maxWidth: 420,
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16, // ★ iPhoneズーム防止
    padding: 10,
    borderRadius: 12,
    border: "1px solid #ccc",
  },
  add: {
    fontSize: 16,
    padding: "10px 14px",
    borderRadius: 12,
    border: "none",
    background: "#FFB703",
  },
  list: {
    width: "100%",
    maxWidth: 420,
  },
  item: {
    background: "#fff",
    borderRadius: 14,
    padding: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontSize: 16,
  },
  delete: {
    background: "none",
    border: "none",
    fontSize: 20,
    color: "#E85A5A",
  },
};
