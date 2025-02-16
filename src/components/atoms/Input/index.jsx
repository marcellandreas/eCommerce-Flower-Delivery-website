export const InputText = ({
  type = "text",
  label,
  placeholder,
  onChange,
  readOnly,
  required,
  name,
  value,
  classNameParent,
  classInput,
}) => {
  return (
    <div
      className={`flex flex-col bg-white gap-3  text-black capitalize w-full ${classNameParent}`}
    >
      {label ? (
        <label className=" text-mobileH6 font-medium">{label}</label>
      ) : null}
      <input
        className={`px-4 py-3 md:py-4  text-mobileCaption md:text-desktopCaption placeholder:text-mobileCaption placeholder:font-medium placeholder:text-gray border border-lightGray hover:border-gray bg-white 
           flex items-center self-stretch focus:text-black focus:placeholder:text-lightGray disabled:bg-extraLight disabled:border-lightGray capitalize ${classInput}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required ? true : false}
        readOnly={readOnly ? true : false}
      />
    </div>
  );
};

export const InputDate = ({ value }) => {
  return (
    <div>
      <input
        className="flex min-w-[360px] py-3 px-4 justify-between items-center bg-white border border-lightGray"
        type="date"
      />
    </div>
  );
};

// min-w-[328px] max-w-[328px]
