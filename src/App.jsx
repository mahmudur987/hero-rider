import { useState } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Route";

function App() {
  const [count, setCount] = useState(0);

  return (
    <RouterProvider router={routes}>
      <div className="App">
        <Toaster />
      </div>
    </RouterProvider>
  );
}

export default App;
