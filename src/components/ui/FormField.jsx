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
  error,
  rows,
  options = [],
  className = '',
  ...props
}) {
  const inputId = id || name;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [props['aria-describedby'], errorId].filter(Boolean).join(' ') || undefined;
  const ariaInvalid = error ? true : props['aria-invalid'];

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
        aria-invalid={ariaInvalid}
        aria-describedby={describedBy}
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
        aria-invalid={ariaInvalid}
        aria-describedby={describedBy}
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
        aria-invalid={ariaInvalid}
        aria-describedby={describedBy}
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
      {error && (
        <div id={errorId} className="form-field__error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
