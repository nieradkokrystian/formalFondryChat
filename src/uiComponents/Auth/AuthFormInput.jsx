function AuthFormInput({ id, value, onChange, type, text }) {
  return (
    <>
      <label htmlFor={id} className="text-sm text-gray-600 tracking-wider">
        {text}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        className="inputButton g-blue-500 text-white font-bold py-2 rounded-lg px-3 transition duration-300 target-cursor outline-0"
        onChange={onChange}
      />
    </>
  );
}

export default AuthFormInput;
