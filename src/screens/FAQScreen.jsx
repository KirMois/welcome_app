import { APP_DATA } from '../data/appData';
import { FAQItem } from '../components/ui/FAQItem';
import './FAQScreen.css';

export function FAQScreen() {
  const { title, subtitle, items } = APP_DATA.faq;

  return (
    <section className="screen faq-screen">
      <h2 className="screen-headline">{title}</h2>
      <p className="screen-subheadline">{subtitle}</p>
      <ul className="faq-screen__list">
        {items.map((item, i) => (
          <FAQItem key={i} id={`faq-q-${i}`} question={item.q} answer={item.a} />
        ))}
      </ul>
    </section>
  );
}
