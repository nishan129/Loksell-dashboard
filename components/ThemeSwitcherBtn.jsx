"use client";
import React from 'react';
import { useState, useEffect } from "react";
import { Moon, Sun,} from 'lucide-react';
import { useTheme } from "next-themes";
export default function ThemeSwitcherBtn() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    console.log(theme);
    useEffect(() => {
    setMounted(true);
    }, []);
    if (!mounted) {
    return null;
    }
    return (
    <button
    className="dark:text-green-600 "
    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
    {theme === "light" ? <Moon /> : <Sun />}
    </button>
    );
}
