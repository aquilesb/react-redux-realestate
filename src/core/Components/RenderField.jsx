import React from 'react';
import { PropTypes } from 'prop-types';

/**
 * Render Field component
 */
const RenderField = ({
  input,
  placeholder,
  className,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <div>
      {touched &&
        ((error && <span className="field-error">{error}</span>) ||
          (warning && <span className="field-warning">{warning}</span>))}
      <input {...input} className={className} type={type} placeholder={placeholder} />
    </div>
  </div>
);

RenderField.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
    warning: PropTypes.string,
  }).isRequired,
};

export default RenderField;
