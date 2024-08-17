import "./App.css";
import { useAppDispatch, useAppSelector } from "./lib/redux/hooks";
import { incrementByAmount, decrementByAmount } from "./context/count";
import { useState } from "react";

function App() {
  const count = useAppSelector((state) => state.count.value);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);

  return (
    <>
      <div>{count}</div>
      <input
        type="text"
        value={amount}
        onChange={(e) => {
          setAmount(Number(e.target.value));
        }}
      />
      <button
        onClick={() => {
          dispatch(incrementByAmount(amount));
        }}
      >
        increment
      </button>
      <button
        onClick={() => {
          dispatch(decrementByAmount(amount));
        }}
      >
        decrement
      </button>
    </>
  );
}

export default App;
