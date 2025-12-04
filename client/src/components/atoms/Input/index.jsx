import PropTypes from "prop-types";

const INPUT_BASE_CLASSES = "px-4 py-3 md:py-4 text-mobileCaption md:text-desktopCaption placeholder:text-mobileCaption placeholder:font-medium placeholder:text-gray border border-lightGray hover:border-gray bg-white flex items-center self-stretch focus:text-black focus:placeholder:text-lightGray focus:outline-none focus:ring-2 focus:ring-black disabled:bg-extraLight disabled:border-lightGray capitalize transition-colors duration-200";

export const InputText = ({
  type = "text",
  label,
  placeholder,
  onChange,
  readOnly = false,
  required = false,
  name,
  value,
  classNameParent = "",
  classInput = "",
}) => {
  return (
    <div className={`flex flex-col bg-white gap-3 text-black capitalize w-full ${classNameParent}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-mobileH6 font-medium"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        className={`${INPUT_BASE_CLASSES} ${classInput}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        aria-label={label || placeholder}
      />
    </div>
  );
};

InputText.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classNameParent: PropTypes.string,
  classInput: PropTypes.string,
};

export const InputDate = ({
  value,
  onChange,
  name,
  label
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="text-mobileH6 font-medium"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        className="flex min-w-[360px] py-3 px-4 justify-between items-center bg-white border border-lightGray hover:border-gray focus:outline-none focus:ring-2 focus:ring-black transition-colors duration-200"
        type="date"
        value={value}
        onChange={onChange}
        aria-label={label || "Select date"}
      />
    </div>
  );
};

InputDate.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
};

export const InputSelect = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  classNameParent = "",
  classInput = ""
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${classNameParent}`}>
      {label && (
        <label htmlFor={name} className="text-mobileH6 font-medium">
          {label}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className={`px-4 py-3 text-mobileCaption border border-lightGray hover:border-gray bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors duration-200 capitalize ${classInput}`}
      >
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

InputSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  options: PropTypes.array,
  required: PropTypes.bool,
  classNameParent: PropTypes.string,
  classInput: PropTypes.string,
};