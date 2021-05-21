export interface MenuItem {
  name: string;
  path?: string;
  icon?: string;
  activeIcon?: string;
}

export const menu: MenuItem[] = [
  {
    name: 'Home',
    path: '/home',
    icon: 'bi-house-door',
    activeIcon: 'bi-house-door-fill',
  },
  {
    name: 'Explore',
    path: '/explore',
    icon: 'bi-hash',
    activeIcon: 'bi-hash',
  },
  {
    name: 'Search',
    path: '/search',
    icon: 'bi-search',
    activeIcon: 'bi-search',
  },
  {
    name: 'Profile',
    path: '/my-profile',
    icon: 'bi-person',
    activeIcon: 'bi-person-fill',
  },
  {
    name: 'Notifications',
    path: '/notifications',
    icon: 'bi-bell',
    activeIcon: 'bi-bell-fill',
  },
];
