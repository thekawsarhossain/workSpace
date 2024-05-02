"use client";

import Link from "next/link";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from "@/utils/common";
import logo from "@/assets/images/logo.png"
import Image from "next/image";
import { Button } from "antd";
import ModeToggle from "./mode-toggle";
import { useRouter } from "next/navigation";

const navItems = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Projects",
        href: "/projects",
    }
]

const Header = () => {
    const pathname = usePathname();
    const router = useRouter()
    const [user, _setUser] = useState(() => {
        const email = typeof window !== 'undefined' ? localStorage.getItem("email") : "";
        return { email }
    })

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/50 dark:border-border/90 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className='container flex h-14 w-full md:max-w-screen-2xl justify-between items-center p-2 md:p-8'>
                <nav className="relative z-10 flex items-center">
                    <Link href="/" className="mr-4 md:mr-16">
                        <span className="sr-only">WorkSpace</span>
                        <Image src={logo} alt="WorkSpace-Logo" loading="lazy" width={70} />
                    </Link>
                    <ul className="space-x-0 md:space-x-2 font-medium text-sm mr-2 md:mr-8 flex">
                        {navItems.map((item) => item.href && (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={cn(
                                    "h-8 items-center justify-center rounded-md text-sm font-medium transition-colors px-3 py-2 inline-flex 'text-secondary-foreground' hover:bg-secondary",
                                    pathname === item.href
                                        ? "bg-secondary"
                                        : ""
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center justify-center space-x-1 md:space-x-5">
                    <Button onClick={() => {
                        user.email && typeof window !== 'undefined' ? localStorage.clear() : router.push("/login")
                    }} type="primary">{user?.email ? "Logout" : "Login"}</Button>
                    <ModeToggle />
                </div>
            </div >
        </header >
    );
};

export default Header;
