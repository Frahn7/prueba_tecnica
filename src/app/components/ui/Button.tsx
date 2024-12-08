interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant: "Default" | "Delete";
  className?: string;
}

export const Button = ({
  title,
  variant,
  className,
  ...props
}: ButtonProps) => {
  const classNam =
    variant === "Default"
      ? `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`
      : `focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ${className}`;

  return (
    <button type="button" {...props} className={classNam}>
      {title}
    </button>
  );
};
