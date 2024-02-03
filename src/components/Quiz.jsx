import { useCallback, useState } from "react";
import quizComplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";
import Question from "./Question";
import Summary from "./Summary";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const handleSelectedAnswer = useCallback(function handleSelectedAnswer(ans) {
    setUserAnswers((prev) => {
      return [...prev, ans];
    });
  });

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer],
  );

  const quizCompleted = activeQuestionIndex === QUESTIONS.length;

  if (quizCompleted) {
    return <Summary userAnswers={userAnswers} />;
  }
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectedAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
