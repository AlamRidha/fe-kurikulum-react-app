import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <p className="text-3xl font-bold underline text-center">Hello world</p>
      </div>
    </>
  );
}

export default App;
