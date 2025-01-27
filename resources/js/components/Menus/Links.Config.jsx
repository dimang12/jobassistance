import {
    CalendarIcon, ChartPieIcon, ChatBubbleLeftRightIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon, AcademicCapIcon,
} from "@heroicons/react/24/outline/index.js";


export const navigationLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'Team', href: '/profile', icon: UsersIcon, current: true },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Course', href: '/courses', icon: AcademicCapIcon, current: false },
    { name: 'Calendar', href: '/calendar', icon: CalendarIcon, current: false },
    { name: 'Ask', href: '/ask', icon: ChatBubbleLeftRightIcon, current: false },
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
    { mainNav: '/courses', children: [
        { name: 'Web Development', href: '/courses?category=1' },
        { name: 'Mobile Development', href: '/courses?category=2' },
        { name: 'Data Science', href: '/courses?category=3' },
        { name: 'Artificial Intelligence', href: '/courses?category=4' },
        { name: 'Machine Learning', href: '/courses?category=5' }
    ]},
    { mainNav: '/ask', children: [] },
    { mainNav: '/documents', children: [] },
    { mainNav: '/reports', children: [] }
]
