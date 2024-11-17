const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavMenu({ navigation }) {
    return (
        <div className="flex grow flex-col gap-y-5 ">
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">

                        {navigation && navigation.children && navigation.children.map((item) => (
                                <li key={item.name}>
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-200 text-indigo-600'
                                                : 'text-gray-700 hover:bg-gray-200 hover:text-indigo-600',
                                            'group flex gap-x-3 rounded-full p-2 px-4 text-sm/6 font-semibold',
                                        )}
                                    >
                                        {item.name}
                                        {item.count ? (
                                            <span
                                                aria-hidden="true"
                                                className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs/5 font-medium text-gray-600 ring-1 ring-inset ring-gray-200"
                                            >
                        {item.count}
                      </span>
                                        ) : null}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
