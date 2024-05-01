"use client";

import Link from "next/link";
import React from 'react';
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

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/50 dark:border-border/90 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className='container flex h-14 max-w-screen-2xl justify-between items-center'>
                <nav className="relative z-10 flex items-center">
                    <Link href="/" className="mr-16">
                        <span className="sr-only">WorkSpace</span>
                        <Image src={logo} alt="WorkSpace-Logo" loading="lazy" width={70} />
                    </Link>
                    <ul className="space-x-2 font-medium text-sm mr-8 hidden md:flex">
                        {navItems.map((item) => item.href && (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={cn(
                                    "h-8 items-center justify-center rounded-md text-sm font-medium transition-colors px-3 py-2 inline-flex text-secondary-foreground hover:bg-secondary",
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

                <div className="flex items-center justify-center space-x-5">
                    <Button onClick={() => router.push("/login")} type="primary">Login</Button>
                    <ModeToggle />
                </div>
            </div >
        </header >
    );
};

export default Header;
