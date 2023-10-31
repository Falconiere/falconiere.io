type DividerProps = {
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
};
const Divider = ({ className }: DividerProps) => (
  <div className={`divider h-[1px] bg-gray-700 my-4 ${className} `} />
);
export { Divider };
