import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Cores e tipografia do seu brand guide
const colors = {
    neutral_bg: '#F5F5F5',
    text_dark: '#0B3D2E',
    primary_green: '#2E7D32',
};

// Estrutura de links (baseada no seu JSON)
const navigation = [
    { name: 'Transparência', href: '#' },
    { name: 'Serviços Online', href: '#' },
    { name: 'Licitações e Contratos', href: '#' },
    { name: 'Legislação', href: '#' },
    { name: 'Notícias e Eventos', href: '#' },
    { name: 'Contato', href: '#' },
];

export default function Sidebar({ isOpen, onClose }) {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
                {/* Overlay de fundo */}
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                {/* Conteúdo da Sidebar */}
                <div className="fixed inset-0 flex justify-end">
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel
                            className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto pb-12 shadow-xl"
                            style={{ backgroundColor: colors.neutral_bg, color: colors.text_dark }}
                        >
                            <div className="flex items-center justify-between px-4 pt-5 pb-2">
                                {/* Logo Placeholder */}
                                <div className="h-8 w-auto">
                                    <img
                                        className="h-8 w-auto"
                                        src="{{logo_prefeitura_sorriso.png}}" // Substitua pelo caminho real do seu logo
                                        alt="Prefeitura de Sorriso - MT"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="-m-2 inline-flex items-center justify-center rounded-md p-2"
                                    onClick={onClose}
                                    style={{ color: colors.text_dark }}
                                >
                                    <span className="sr-only">Fechar menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Links de Navegação */}
                            <div className="mt-6 space-y-2 px-4">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-200"
                                        style={{ fontFamily: 'Roboto, Noto Sans, sans-serif' }}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>

                            <div className="mt-8 border-t border-gray-300 px-4 pt-6">
                                <a
                                    href="#" // Link para o portal da transparência ou outro serviço importante
                                    className="inline-block rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm"
                                    style={{ backgroundColor: colors.primary_green }}
                                >
                                    Acesso Rápido
                                </a>
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
