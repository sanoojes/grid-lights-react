import { useEffect, useState } from "react";

const App = () => {
  const array = [...Array(9).fill("")];
  const [clicked, setClicked] = useState<Array<number>>([]);
  const [wasFull, setWasFull] = useState(false);

  const handleClick = (idx: number) => {
    // Toggle the clicked state of the item
    if (clicked.includes(idx)) {
      setClicked((prev) => prev.filter((i) => i !== idx));
    } else {
      setClicked((prev) => [...prev, idx]);
    }
  };

  useEffect(() => {
    let timer: number; // ReturnType<typeof setTimeout> = number
    if (clicked.length === 0) return setWasFull(false);
    if (clicked.length === array.length || wasFull) {
      setWasFull(true);
      timer = setInterval(() => {
        setClicked((prev) => {
          if (prev.length === 0) {
            clearInterval(timer);
            return prev;
          }
          return prev.slice(0, -1);
        });
      }, 300);
    }
    return () => clearInterval(timer);
  }, [clicked.length]);

  return (
    <main className="flex flex-col h-screen w-screen bg-neutral-950 items-center justify-center">
      <h1 className="text-xl font-bold text-neutral-50">Grid Lights React</h1>
      <ul className="grid grid-cols-3 p-4">
        {array.map((value, idx) => (
          <li
            key={idx}
            className={`aspect-square w-24 border-2 border-neutral-950 transition-all duration-300 ease-in-out ${
              clicked.includes(idx) ? "bg-green-500" : "bg-neutral-900"
            }`}
            onClick={() => handleClick(idx)}
          >
            {value}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;

