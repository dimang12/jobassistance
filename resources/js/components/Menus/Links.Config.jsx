import {
    CalendarIcon, ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon
} from "@heroicons/react/24/outline/index.js";

export const navigationLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'Team', href: '/profile', icon: UsersIcon, current: true },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]

export const subNavigationLinks = [
    { mainNav: '/dashboard', children: [] },
    { mainNav: '/profile', children: [
        { name: 'Profile', href: '/profile', current: true },
        { name: 'Settings', href: '/settings', current: false }
    ]},
    { mainNav: '/projects', children: [] },
    { mainNav: '/calendar', children: [
        { name: 'Applied Job', href: '/applied-job' },
        { name: 'Prepare Interview', href: '/prepare-interview' }
    ]},
    { mainNav: '/documents', children: [] },
    { mainNav: '/reports', children: [] }
]
