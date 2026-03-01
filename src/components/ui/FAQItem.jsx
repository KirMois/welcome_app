import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import './FAQItem.css';

export function FAQItem({ question, answer, id: idProp }) {
  const [open, setOpen] = useState(false);
  const id = idProp || `faq-${Math.random().toString(36).slice(2, 9)}`;
  const answerId = `${id}-answer`;

  return (
    <li className="faq-item">
      <button
        type="button"
        id={id}
        className="faq-item__question"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={answerId}
      >
        <span>{question}</span>
        <span className={`faq-item__icon ${open ? 'faq-item__icon--open' : ''}`} aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </button>
      <div
        id={answerId}
        className={`faq-item__answer ${open ? 'faq-item__answer--open' : ''}`}
        role="region"
        aria-labelledby={id}
      >
        {answer}
      </div>
    </li>
  );
}
