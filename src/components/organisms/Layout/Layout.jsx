const Layout = ({ children }) => {
  return (
    <article className="grid grid-flow-dense grid-cols-12 col-span-12">
      {children}
    </article>
  );
};

export default Layout;
