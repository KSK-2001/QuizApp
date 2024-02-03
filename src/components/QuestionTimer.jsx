import { useEffect, useState } from "react";

export default function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainTime, setRemainTime] = useState(timeout);
  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [onTimeout, timeout]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainTime((prev) => prev - 100);
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <progress
      className={mode}
      id="question-time"
      max={timeout}
      value={remainTime}
    />
  );
}
