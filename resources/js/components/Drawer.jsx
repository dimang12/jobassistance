// File: resources/js/components/Drawer.jsx
'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Drawer({ children, title, show = false, size = 'md', onClose = () => {} }) {
    const [open, setOpen] = useState(show)

    const sizeClass = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
    }[size];

    useEffect(() => {
        setOpen(show);
    }, [show]);

    return (
        <Dialog open={open} onClose={() => { setOpen(false); onClose(); }} className="relative z-10">
            <div className="fixed inset-0" />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <DialogPanel
                            transition
                            className={`pointer-events-auto w-screen transform transition duration-200 ease-in-out data-[closed]:translate-x-full sm:duration-300 ${sizeClass}`}
                        >
                            <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                                <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <DialogTitle className="text-base font-semibold text-white">{title}</DialogTitle>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                type="button"
                                                onClick={() => { setOpen(false); onClose(); }}
                                                className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                            >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon aria-hidden="true" className="size-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 flex overflow-y-scroll">
                                    {children}
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
