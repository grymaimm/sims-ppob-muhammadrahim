export default function NavbarLayout({ children }) {
  return (
    <nav className='fixed inset-x-0 top-0 z-50 mx-auto h-16 w-full border-b bg-background'>
      <div className='mx-auto flex h-full max-w-screen-xl items-center justify-between px-4'>
        {children}
      </div>
    </nav>
  );
}
