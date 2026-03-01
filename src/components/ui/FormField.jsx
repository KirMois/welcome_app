import './FormField.css';

/**
 * Поле формы: label + input/textarea/select.
 */
export function FormField({
  id,
  label,
  type = 'text',
  name,
  value,
  defaultValue,
  placeholder,
  required,
  rows,
  options = [],
  className = '',
  ...props
}) {
  const inputId = id || name;

  let input = null;
  if (type === 'textarea') {
    input = (
      <textarea
        id={inputId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        rows={rows ?? 3}
        className="form-field__input form-field__textarea"
        {...props}
      />
    );
  } else if (type === 'select') {
    input = (
      <select
        id={inputId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        className="form-field__input form-field__select"
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else {
    input = (
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="form-field__input"
        {...props}
      />
    );
  }

  return (
    <div className={`form-field ${className}`.trim()}>
      <label htmlFor={inputId} className="form-field__label">
        {label}
        {required && <span className="form-field__required" aria-hidden> *</span>}
      </label>
      {input}
    </div>
  );
}
