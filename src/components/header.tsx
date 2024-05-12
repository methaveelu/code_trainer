// 'use client'
import Link from 'next/link';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
} from '@nextui-org/react'
import { SearchIcon } from './SearchIcon';
import HeaderAuth from './headerAuth';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'
import { paths } from '@/path';
import {BsList} from 'react-icons/bs'

interface HeaderProps {
    questionPage?: boolean;
}


export default async function Header({questionPage}: HeaderProps) {


    return(
        <Navbar isBordered className='shadow ' style={{backgroundColor:'#070f46'}}>
            <NavbarBrand>
                <Link href={'/'} className='font-bold'>Code-trainer</Link>
            </NavbarBrand>

            <NavbarContent justify='center'>
                <NavbarItem>
                    <Input 
                        name='term' 
                        placeholder='Search Topic'
                        startContent={
                            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                        }
                    />    
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify='end'>
                    <HeaderAuth/>
            </NavbarContent>
        </Navbar>
    )
}

