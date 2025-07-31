import NavbarBrand from './NavbarBrand';
import NavbarLayout from './NavbarLayout';
import NavbarMenu from './NavbarMenu';
import NavbarSheet from './NavbarSheet';

export default function NavbarApp() {
  return (
    <>
      <NavbarLayout>
        <NavbarBrand />
        <NavbarMenu className='hidden md:block' />
        {/* Mobile Menu */}
        <div className='md:hidden'>
          <NavbarSheet />
        </div>
      </NavbarLayout>
    </>
  );
}
