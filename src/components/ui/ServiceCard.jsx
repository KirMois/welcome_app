import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, CurrencyEuroIcon } from '@heroicons/react/24/outline';
import './ServiceCard.css';

function formatPrice(item) {
  if (item.priceLabel) return item.priceLabel;
  const suffix = item.priceSuffix ?? '€';
  return `от ${item.price} ${suffix}`;
}

export function ServiceCard({ item, categoryTitle, buttonText }) {
  const navigate = useNavigate();
  const price = formatPrice(item);
  const serviceLabel = [categoryTitle, item.name].filter(Boolean).join(' — ');

  return (
    <article className="service-card" onClick={() => navigate('/lead-form', { state: { preselectedService: serviceLabel } })}>
      <div className="service-card__body">
        <h3 className="service-card__title">{item.name}</h3>
        <p className="service-card__desc">{item.description}</p>
      </div>
      <div className="service-card__footer">
        <div className="service-card__price-wrap">
          <CurrencyEuroIcon className="service-card__price-icon" aria-hidden="true" />
          <span className="service-card__price">{price}</span>
        </div>
        <button
          type="button"
          className="service-card__btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate('/lead-form', { state: { preselectedService: serviceLabel } });
          }}
        >
          {buttonText}
          <ArrowRightIcon className="service-card__btn-icon" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
