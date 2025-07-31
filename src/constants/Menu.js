import {
  House as HomeIcon,
  VenetianMask as UserIcon,
  Cpu as DashboardIcon,
  Newspaper as ArticleIcon,
  Coffee as ProjectsIcon,
  Rocket as ContactIcon,
  MessageCircleMore as ChatIcon,
  User as ProfileIcon,
} from 'lucide-react';

const iconSize = 18;

export const MENU_ITEMS = [
  {
    title: 'Home',
    href: '/',
    icon: <HomeIcon size={iconSize} />,
    isShow: true,
    eventName: 'Pages: Home',
    type: 'Pages',
  },
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon size={iconSize} />,
    isShow: true,
    eventName: 'Pages: Dashboard',
    type: 'Pages',
  },
  {
    title: 'About',
    href: '/about',
    icon: <UserIcon size={iconSize} />,
    isShow: true,
    eventName: 'Pages: About',
    type: 'Pages',
  },
  {
    title: 'Articles',
    href: '/articles',
    icon: <ArticleIcon size={iconSize} />,
    isShow: true,
    eventName: 'Pages: Articles',
    type: 'Pages',
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: <ProjectsIcon size={iconSize} />,
    isShow: true,
    eventName: 'Pages: Projects',
    type: 'Pages',
  },
  {
    title: 'Contact',
    href: '/contact',
    icon: <ContactIcon size={iconSize} />,
    isShow: true,
    eventName: 'Pages: Contact',
    type: 'Pages',
  },
  {
    title: 'Chat Room',
    href: '/chatroom',
    icon: <ChatIcon size={iconSize} />,
    isShow: true,
    eventName: 'Pages: Chat Room',
    type: 'Pages',
  },
];
