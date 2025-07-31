import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/shadcnui/navigation-menu';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavbarMenu({ ...props }) {
  const router = useRouter();
  const currentPath = router.pathname;

  // Daftar menu bisa dibuat sebagai array untuk perulangan juga
  const menuItems = [
    { href: '/home', label: 'Home' },
    { href: '/topup', label: 'Top Up' },
    { href: '/transaction', label: 'Transaction' },
    { href: '/account', label: 'Account' },
  ];

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className='gap-6 space-x-0 px-4 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start'>
        {menuItems.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <>
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild active={isActive}>
                  <Link
                    href={item.href}
                    className={`NavigationMenuLink transition-colors duration-200 ${
                      isActive ? 'font-semibold text-red-500' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
