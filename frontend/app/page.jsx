"use client";
import { useEffect, useState } from "react";
import API from "../lib/api";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.title || !form.content) {
    alert("Please fill in both fields");
    return;
  }

  await API.post("/posts", form);
  setForm({ title: "", content: "" });
  fetchPosts();
};


  const handleDelete = async (id) => {
    await API.delete(`/posts/${id}`);
    fetchPosts();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>MERN CRUD (Next.js)</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button type="submit">Add Post</button>
      </form>

      <ul>
        {posts.map((p) => (
          <li key={p._id}>
            <b>{p.title}</b>: {p.content}
            <button onClick={() => handleDelete(p._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
