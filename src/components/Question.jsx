import { useState } from "react";
import Answer from "./Answer";
import QuestionTimer from "./QuestionTimer";
import questions from "../questions";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000;
  }
  if (answer.isCorrect !== null) {
    timer = 2000;
  }
  function handleSelectAnswer(ans) {
    setAnswer({
      selectedAnswer: ans,
      isCorrect: null,
    });
    setTimeout(() => {
      setAnswer({
        selectedAnswer: ans,
        isCorrect: ans === questions[index].answers[0],
      });
      setTimeout(() => {
        onSelectAnswer(ans);
      }, 2000);
    }, 1000);
  }
  let ansState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    ansState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    ansState = "answered";
  }
  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        mode={ansState}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
      />
      <h1>{questions[index].text}</h1>
      <Answer
        answers={questions[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={ansState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
