import './SecondaryButton.css';

export function SecondaryButton({ children, as = 'button', type = 'button', onClick, ...rest }) {
  const Tag = as;
  return (
    <Tag
      className="btn--secondary"
      type={as === 'button' ? type : undefined}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Tag>
  );
}
