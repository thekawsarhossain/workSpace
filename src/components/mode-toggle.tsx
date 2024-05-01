"use client"

import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import { Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';

const ModeToggle = () => {
    const { theme, setTheme } = useTheme()

    const lightThemeButton = {
        key: '1',
        label: <button onClick={() => setTheme("light")} className='px-4'>Light</button>,
    };

    const darkThemeButton = {
        key: '2',
        label: <button onClick={() => setTheme("dark")} className='px-4'>Dark</button>,
    };

    const items: MenuProps['items'] = [
        ...(theme === "dark" ? [lightThemeButton] : [darkThemeButton]),
        {
            key: '3',
            label: <button onClick={() => setTheme("system")} className='px-4'>System</button>,
        },
    ];

    return (
        <Dropdown menu={{ items }} className='cursor-pointer'>
            <a onClick={(e: { preventDefault: () => any; }) => e.preventDefault()} className="w-10 px-0 mt-6">
                <SunOutlined className="absolute top-5 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonOutlined className="absolute top-5 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </a>
        </Dropdown>
    );
};

export default ModeToggle;