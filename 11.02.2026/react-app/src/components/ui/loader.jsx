import React from 'react'



export const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-1 z-50 bg-secondary overflow-hidden">
            <div className="h-full w-full bg-primary origin-left animate-progress"></div>
            <style>{`
                @keyframes progress {
                    0% { transform: translateX(-100%); }
                    50% { transform: translateX(0); }
                    100% { transform: translateX(100%); }
                }
                .animate-progress {
                    animation: progress 1.5s infinite ease-in-out;
                }
            `}</style>
        </div>
    )
}
