import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline/index.js";
import TopNav from "@/components/TopNav.jsx";
import Footer from "@/components/footer.jsx";
import NavMenu from "@/components/NavMenu.jsx";
import {navigationLinks as navigation, subNavigationLinks} from "@/components/Menus/Links.Config.jsx";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function AuthenticatedLayout({ header, children, navLinks }) {
    const user = usePage().props.auth.user;
    const path =window.location.pathname;

    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            <div className={"h-full"}>
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

                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
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
                <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-20 lg:overflow-y-auto lg:bg-indigo-800 lg:pb-4">
                    <div className="flex h-16 shrink-0 items-center justify-center">
                        <img
                            alt="Your Company"
                            src="/img/pages/j.png"
                            className="h-10 w-auto"
                        />
                    </div>
                    <nav className="mt-8">
                        <ul role="list" className="flex flex-col items-center space-y-1">
                            {navigation.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            (path === item.href) ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-indigo-600 hover:text-white',
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

                <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
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

                <main className="lg:pl-20 h-full">
                    <div className="xl:pl-72 h-full">
                        <div className="flex flex-col h-full">
                            <header className={'border-b'}>
                                <TopNav />
                            </header>
                            <div className={"flex-grow  px-4 py-10 bg-gray-100 overflow-y-scroll sm:px-6 lg:px-8 lg:py-6"}>
                                {children}
                            </div>
                            <footer className={'border-t'}>
                                <Footer />
                            </footer>
                        </div>
                    </div>
                </main>

                <aside
                    className="fixed  inset-y-0 left-20 hidden w-72 overflow-y-auto bg-gray-200 border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
                    {/* Secondary column (hidden on smaller screens) */}
                    <NavMenu navigation={navLinks}  />
                </aside>
            </div>
        </>
    );
}
