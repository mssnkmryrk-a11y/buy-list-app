import { useState, useEffect } from "react";

export default function BuyListApp() {
  const [text, setText] = useState("");
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("buy-list");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  const save = (next: string[]) => {
    setItems(next);
    localStorage.setItem("buy-list", JSON.stringify(next));
  };

  const addItem = () => {
    if (!text.trim()) return;
    save([...items, text.trim()]);
    setText("");
  };

  const removeItem = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    save(next);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🛒 買う予定</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addItem();
        }}
        style={styles.form}
      >
        <input
          style={styles.input}
          placeholder="マイクで話してもOK"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button style={styles.add}>追加</button>
      </form>

      <ul style={styles.list}>
        {items.map((item, i) => (
          <li key={i} style={styles.item} onClick={() => removeItem(i)}>
            {item}
          </li>
        ))}
      </ul>

      <p style={styles.hint}>※ タップで削除</p>
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
    maxWidth: 360,
    display: "flex",
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
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
    maxWidth: 360,
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    background: "#fff",
    padding: 12,
    borderRadius: 14,
    marginBottom: 8,
    fontSize: 16,
    textAlign: "center",
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: "#777",
  },
};
