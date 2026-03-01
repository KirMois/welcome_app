import './QuizStep.css';

/**
 * Один шаг квиза: заголовок, прогресс «Шаг N из M», варианты (чекбоксы или радио).
 */
export function QuizStep({ stepNumber, totalSteps, question, options = [], multi, name, onNext }) {
  const progressText = `Шаг ${stepNumber} из ${totalSteps}`;
  const type = multi ? 'checkbox' : 'radio';

  return (
    <div className="quiz-step">
      <p className="quiz-step__progress" aria-live="polite">
        {progressText}
      </p>
      <h3 className="quiz-step__title">{question}</h3>
      <ul className="quiz-step__options" role={multi ? 'group' : 'radiogroup'} aria-label={question}>
        {options.map((opt, i) => (
          <li key={i}>
            <label className="quiz-step__option">
              <input
                type={type}
                name={name}
                value={opt}
                className="quiz-step__input"
              />
              <span className="quiz-step__option-text">{opt}</span>
            </label>
          </li>
        ))}
      </ul>
      {onNext && (
        <button type="button" className="btn btn--primary quiz-step__next" onClick={onNext}>
          Далее
        </button>
      )}
    </div>
  );
}
