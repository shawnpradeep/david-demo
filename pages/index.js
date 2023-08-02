import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [nameInput, setNameInput] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [seasonInput, setSeasonInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput,
          color: colorInput,
          season: seasonInput,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Clothes Micromarketing Demo</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="./smile.svg" className={styles.icon} />
        <h3>Enter preferences</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <input
            type="text"
            name="color"
            placeholder="Enter your favorite color"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
          />
          <input
            type="text"
            name="season"
            placeholder="Enter the current season"
            value={seasonInput}
            onChange={(e) => setSeasonInput(e.target.value)}
          />
          <input type="submit" value="Generate targeted suggestion" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
