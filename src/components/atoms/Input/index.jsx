export const InputText = ({
  label,
  placeholder,
  onChange,
  readOnly,
  required,
  name,
  value,
}) => {
  return (
    <div className=" flex flex-col bg-white gap-3 h-full text-black capitalize min-w-[328px] max-w-[328px]">
      {label ? (
        <label className=" text-mobileH6 font-medium">{label}</label>
      ) : null}
      <div className=" flex flex-col items-start gap-2 self-stretch w-full">
        <input
          className="px-4 py-3 md:py-4  text-mobileCaption md:text-desktopCaption placeholder:text-mobileCaption placeholder:font-medium placeholder:text-gray border border-lightGray hover:border-gray bg-white 
          min-h-[24px] flex items-center self-stretch focus:text-black focus:placeholder:text-lightGray disabled:bg-extraLight disabled:border-lightGray capitalize"
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required ? true : false}
          readOnly={readOnly ? true : false}
        />
      </div>
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
