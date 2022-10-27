import { Navbar, INavbarProps } from './navbar.component';

type Props = {
  children: React.ReactNode;
  navbar?: INavbarProps;
};

export const Layout = (props: Props) => {
  const { children, navbar } = props;

  return (
    <>
      <Navbar {...navbar} />
      <main>{children}</main>
    </>
  );
};
