function FormField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  as = 'input',
  error,
  options = [],
  required = false,
  rows = 4,
  ...props
}) {
  const sharedProps = {
    id: name,
    name,
    value: value ?? '',
    onChange,
    className: `input-field ${error ? 'border-rose-400 focus:ring-rose-100' : ''}`,
    ...props,
  }

  return (
    <div>
      <label htmlFor={name} className="label-text">
        {label}
        {required ? <span className="ml-1 text-rose-500">*</span> : null}
      </label>

      {as === 'textarea' ? (
        <textarea rows={rows} {...sharedProps} />
      ) : as === 'select' ? (
        <select {...sharedProps}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} {...sharedProps} />
      )}

      {error ? <p className="mt-2 text-sm text-rose-600">{error}</p> : null}
    </div>
  )
}

export default FormField
