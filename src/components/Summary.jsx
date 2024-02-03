import quizCompled from "../assets/quiz-complete.png";
import questions from "../questions";
export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((ans) => ans === null);
  const correctAnswers = userAnswers.filter(
    (ans, index) => ans === questions[index].answers[0],
  );
  const correctAnswerShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100,
  );
  const skippedAnserShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100,
  );
  const wrongAnswerShare = 100 - correctAnswerShare - skippedAnserShare;
  return (
    <div id="summary">
      <img src={quizCompled} alt="quiz done" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnserShare}</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswerShare}</span>
          <span className="text">Correct</span>
        </p>
        <p>
          <span className="number">{wrongAnswerShare}</span>
          <span className="text">Wrong</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((ans, id) => {
          let cssClass = "user-answer";
          if (ans === null) {
            cssClass += " skipped";
          } else if (ans === questions[id].answers[0]) {
            cssClass += " correct";
          } else {
            cssClass += " wrong";
          }
          return (
            <li key={id}>
              <h3>{id + 1}</h3>
              <p className="question">{questions[id].text}</p>
              <p className={cssClass}>{ans ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
