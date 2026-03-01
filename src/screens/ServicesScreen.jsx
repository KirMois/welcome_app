import { APP_DATA } from '../data/appData';
import { ServiceCard } from '../components/ui/ServiceCard';
import './ServicesScreen.css';

export function ServicesScreen() {
  const { title, subtitle, categories, cardButtonText } = APP_DATA.services;

  return (
    <section className="screen services-screen">
      <h2 className="screen-headline">{title}</h2>
      <p className="screen-subheadline">{subtitle}</p>
      <div className="services-screen__list">
        {categories.map((cat) => (
          <div key={cat.id} className="services-screen__category">
            <h3 className="services-screen__category-title">{cat.title}</h3>
            {cat.smallText && (
              <p className="services-screen__category-small">{cat.smallText}</p>
            )}
            {cat.description && (
              <p className="screen-subheadline">{cat.description}</p>
            )}
            <div className="services-screen__cards">
              {cat.items.map((item) => (
                <ServiceCard
                  key={item.name}
                  item={item}
                  categoryTitle={cat.title}
                  categoryId={cat.id}
                  buttonText={cardButtonText}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
