import React from 'react'
import { ThemeToggle } from './ThemeToggle'

const Navbar = () => {
    return (
        <div className='min-h-16 w-full p-5 border-b border-b-teal-900 flex items-center justify-between'>
            <p className='font-lexend-deca font-bold text-2xl'>
                SAVVY
            </p>
            <div>
                <ThemeToggle />
            </div>
        </div>
    )
}

export default Navbar