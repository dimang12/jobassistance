import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {Dialog, DialogBackdrop, DialogPanel, TransitionChild} from "@headlessui/react";
import {
    Bars3Icon,
    CalendarIcon, ChartPieIcon, DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon
} from "@heroicons/react/24/outline/index.js";
import TopNav from "@/components/TopNav.jsx";
import Footer from "@/components/footer.jsx";
import NavMenu from "@/components/NavMenu.jsx";

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
    { name: 'Team', href: '/profile', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // return (
    //     <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
    //         <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
    //             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    //                 <div className="flex h-16 justify-between">
    //                     <div className="flex">
    //                         <div className="flex shrink-0 items-center">
    //                             <Link href="/">
    //                                 <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
    //                             </Link>
    //                         </div>
    //
    //                         <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
    //                             <NavLink
    //                                 href={route('dashboard')}
    //                                 active={route().current('dashboard')}
    //                             >
    //                                 Dashboard
    //                             </NavLink>
    //                         </div>
    //                     </div>
    //
    //                     <div className="hidden sm:ms-6 sm:flex sm:items-center">
    //                         <div className="relative ms-3">
    //                             <Dropdown>
    //                                 <Dropdown.Trigger>
    //                                     <span className="inline-flex rounded-md">
    //                                         <button
    //                                             type="button"
    //                                             className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
    //                                         >
    //                                             {user.name}
    //
    //                                             <svg
    //                                                 className="-me-0.5 ms-2 h-4 w-4"
    //                                                 xmlns="http://www.w3.org/2000/svg"
    //                                                 viewBox="0 0 20 20"
    //                                                 fill="currentColor"
    //                                             >
    //                                                 <path
    //                                                     fillRule="evenodd"
    //                                                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
    //                                                     clipRule="evenodd"
    //                                                 />
    //                                             </svg>
    //                                         </button>
    //                                     </span>
    //                                 </Dropdown.Trigger>
    //
    //                                 <Dropdown.Content>
    //                                     <Dropdown.Link
    //                                         href={route('profile.edit')}
    //                                     >
    //                                         Profile
    //                                     </Dropdown.Link>
    //                                     <Dropdown.Link
    //                                         href={route('logout')}
    //                                         method="post"
    //                                         as="button"
    //                                     >
    //                                         Log Out
    //                                     </Dropdown.Link>
    //                                 </Dropdown.Content>
    //                             </Dropdown>
    //                         </div>
    //                     </div>
    //
    //                     <div className="-me-2 flex items-center sm:hidden">
    //                         <button
    //                             onClick={() =>
    //                                 setShowingNavigationDropdown(
    //                                     (previousState) => !previousState,
    //                                 )
    //                             }
    //                             className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
    //                         >
    //                             <svg
    //                                 className="h-6 w-6"
    //                                 stroke="currentColor"
    //                                 fill="none"
    //                                 viewBox="0 0 24 24"
    //                             >
    //                                 <path
    //                                     className={
    //                                         !showingNavigationDropdown
    //                                             ? 'inline-flex'
    //                                             : 'hidden'
    //                                     }
    //                                     strokeLinecap="round"
    //                                     strokeLinejoin="round"
    //                                     strokeWidth="2"
    //                                     d="M4 6h16M4 12h16M4 18h16"
    //                                 />
    //                                 <path
    //                                     className={
    //                                         showingNavigationDropdown
    //                                             ? 'inline-flex'
    //                                             : 'hidden'
    //                                     }
    //                                     strokeLinecap="round"
    //                                     strokeLinejoin="round"
    //                                     strokeWidth="2"
    //                                     d="M6 18L18 6M6 6l12 12"
    //                                 />
    //                             </svg>
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //
    //             <div
    //                 className={
    //                     (showingNavigationDropdown ? 'block' : 'hidden') +
    //                     ' sm:hidden'
    //                 }
    //             >
    //                 <div className="space-y-1 pb-3 pt-2">
    //                     <ResponsiveNavLink
    //                         href={route('dashboard')}
    //                         active={route().current('dashboard')}
    //                     >
    //                         Dashboard
    //                     </ResponsiveNavLink>
    //                 </div>
    //
    //                 <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
    //                     <div className="px-4">
    //                         <div className="text-base font-medium text-gray-800 dark:text-gray-200">
    //                             {user.name}
    //                         </div>
    //                         <div className="text-sm font-medium text-gray-500">
    //                             {user.email}
    //                         </div>
    //                     </div>
    //
    //                     <div className="mt-3 space-y-1">
    //                         <ResponsiveNavLink href={route('profile.edit')}>
    //                             Profile
    //                         </ResponsiveNavLink>
    //                         <ResponsiveNavLink
    //                             method="post"
    //                             href={route('logout')}
    //                             as="button"
    //                         >
    //                             Log Out
    //                         </ResponsiveNavLink>
    //                     </div>
    //                 </div>
    //             </div>
    //         </nav>
    //
    //         {header && (
    //             <header className="bg-white shadow dark:bg-gray-800">
    //                 <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    //                     {header}
    //                 </div>
    //             </header>
    //         )}
    //
    //         <main>{children}</main>
    //     </div>
    // );

    return (
        <>
            <div className={"h-100"}>
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div
                                    className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)}
                                            className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white"/>
                                    </button>
                                </div>
                            </TransitionChild>

                            <div
                                className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        alt="Your Company"
                                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                        className="h-8 w-auto"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="-mx-2 flex-1 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-800 text-white'
                                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                    )}
                                                >
                                                    <item.icon aria-hidden="true" className="h-6 w-6 shrink-0"/>
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>

                {/* Static sidebar for desktop */}
                <div
                    className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-indigo-800 lg:pb-4">
                    <div className="flex h-16 shrink-0 items-center justify-center">
                        <img
                            alt="Your Company"
                            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                            className="h-8 w-auto"
                        />
                    </div>
                    <nav className="mt-8">
                        <ul role="list" className="flex flex-col items-center space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-indigo-600 hover:text-white',
                                            'group flex gap-x-3 rounded-md p-3 text-sm/6 font-semibold',
                                        )}
                                    >
                                        <item.icon aria-hidden="true" className="h-6 w-6 shrink-0"/>
                                        <span className="sr-only">{item.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div
                    className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                    <button type="button" onClick={() => setSidebarOpen(true)}
                            className="-m-2.5 p-2.5 text-gray-400 lg:hidden">
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6"/>
                    </button>
                    <div className="flex-1 text-sm/6 font-semibold text-white">Dashboard</div>
                    <a href="#">
                        <span className="sr-only">Your profile</span>
                        <img
                            alt=""
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            className="h-8 w-8 rounded-full bg-gray-800"
                        />
                    </a>
                </div>

                <main className="lg:pl-20">
                    <div className="xl:pl-72">
                        <div className="flex flex-col h-100">
                            <header>
                                <TopNav />
                            </header>
                            <div className={"flex-grow  px-4 py-10 overflow-y-scroll sm:px-6 lg:px-8 lg:py-6"}>
                                {children}
                            </div>
                            <footer>
                                <Footer />
                            </footer>
                        </div>
                    </div>
                </main>

                <aside
                    className="fixed  inset-y-0 left-20 hidden w-72 overflow-y-auto bg-gray-50 border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
                    {/* Secondary column (hidden on smaller screens) */}
                    <NavMenu />
                </aside>
            </div>
        </>
    );
}
