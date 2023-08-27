import { useState } from "react";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (symbol: string) => {
    return /[- +/*]/.test(symbol);
  };

  const buttonPress = (symbol: string) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "- " + answer
      );
    } else if (symbol === "percentage") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      // if (!lastNumber) return;
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;
    const parts = et.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(expression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
    } else {
      setAnswer(eval(newExpression) as string);
    }
    setExpression("");
  };

  return (
    <>
      <div className="container">
        <h1>Calculator</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button
            onClick={() => buttonPress("clear")}
            id="clear"
            className="light-gray"
          >
            C
          </button>
          <button
            onClick={() => buttonPress("negative")}
            id="negative"
            className="light-gray"
          >
            +/-
          </button>
          <button
            onClick={() => buttonPress("percentage")}
            id="percentage"
            className="light-gray"
          >
            %
          </button>
          <button
            onClick={() => buttonPress("/")}
            id="divide"
            className="yellow"
          >
            /
          </button>
          <button
            onClick={() => buttonPress("7")}
            id="seven"
            className="dark-gray"
          >
            7
          </button>
          <button
            onClick={() => buttonPress("8")}
            id="eight"
            className="dark-gray"
          >
            8
          </button>
          <button
            onClick={() => buttonPress("9")}
            id="nine"
            className="dark-gray"
          >
            9
          </button>
          <button
            onClick={() => buttonPress("*")}
            id="multiply"
            className="yellow"
          >
            *
          </button>
          <button
            onClick={() => buttonPress("4")}
            id="four"
            className="dark-gray"
          >
            4
          </button>
          <button
            onClick={() => buttonPress("5")}
            id="five"
            className="dark-gray"
          >
            5
          </button>
          <button
            onClick={() => buttonPress("6")}
            id="six"
            className="dark-gray"
          >
            6
          </button>
          <button
            onClick={() => buttonPress("-")}
            id="subtract"
            className="yellow"
          >
            -
          </button>
          <button
            onClick={() => buttonPress("1")}
            id="one"
            className="dark-gray"
          >
            1
          </button>
          <button
            onClick={() => buttonPress("2")}
            id="two"
            className="dark-gray"
          >
            2
          </button>
          <button
            onClick={() => buttonPress("3")}
            id="three"
            className="dark-gray"
          >
            3
          </button>
          <button onClick={() => buttonPress("+")} id="add" className="yellow">
            +
          </button>
          <button
            onClick={() => buttonPress("0")}
            id="zero"
            className="dark-gray"
          >
            0
          </button>
          <button
            onClick={() => buttonPress(".")}
            id="decimal"
            className="dark-gray"
          >
            .
          </button>
          <button
            onClick={() => buttonPress("=")}
            id="equals"
            className="yellow"
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
