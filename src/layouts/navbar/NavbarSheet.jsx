import { Button } from '@/components/shadcnui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/shadcnui/sheet';
import { Menu } from 'lucide-react';
import NavbarBrand from './NavbarBrand';
import NavbarMenu from './NavbarMenu';

export default function NavbarSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='icon' className='rounded-full'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <NavbarBrand />
        <NavbarMenu orientation='vertical' className='mt-12' />
      </SheetContent>
    </Sheet>
  );
}
