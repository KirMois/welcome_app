import './PrimaryButton.css';

export function PrimaryButton({ children, as = 'button', type = 'button', onClick, disabled, ...rest }) {
  const Tag = as;
  return (
    <Tag
      className="btn--primary"
      type={as === 'button' ? type : undefined}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </Tag>
  );
}
