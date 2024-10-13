import React from 'react'

export default function Modal({ shouldShow, onRequestClose, title, children, onDone }) {
    return shouldShow ? (
        <div
            className="fixed z-20 flex items-center justify-center z-[1] h-full w-full bg-black/40 overflow-auto"
            onClick={onRequestClose}
        >
            <div
                className="w-1/2 p-5 bg-white rounded-lg"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="text-xl font-bold mb-4">
                    {title}
                </div>

                <div className="mb-6">
                    {children}
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        onClick={onRequestClose}
                    >
                        Close
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={onDone}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}
