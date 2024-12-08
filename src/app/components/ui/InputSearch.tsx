interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const InputSearch = ({ ...props }: InputProps) => {
  return (
    <div className="relative py-4">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        {...props}
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-black border-2 border-gray-300 rounded-lg bg-white     placeholder-black  "
        placeholder="Buscar productos"
      />
    </div>
  );
};
