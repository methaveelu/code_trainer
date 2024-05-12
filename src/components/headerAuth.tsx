'use client'

import { 
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    User,
    NavbarItem
} from "@nextui-org/react";
import * as actions from '@/actions'
import { useSession } from "next-auth/react";

export default function HeaderAuth(){
    const session = useSession();
    let authContent: React.ReactNode;
    if (session.status === 'loading') {
        return null;
    } else if (session.data?.user) {
        authContent = (
          <Popover>
                <PopoverTrigger>
                    <User
                        as='button'
                        name = {session.data.user.name}
                        description = 'user'
                        className="transition-transform"
                        avatarProps={{src: `${session.data.user.image}`}}
                    
                    />
                </PopoverTrigger>

                <PopoverContent>
                    <form action={actions.signOut}>
                        <Button type="submit">Log Out</Button>
                    </form>
                </PopoverContent>
          </Popover>
        )
    } else {
        authContent = 
        (
        <>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button type="submit" color="secondary" variant="bordered">Sign-in</Button> 
                </form>
            </NavbarItem>
            <NavbarItem>
                <form action={actions.signIn}>
                    <Button type="submit" color="primary" variant="bordered">Sign-up</Button>
                </form>
            </NavbarItem>
        </>
        );
    }
    return(authContent)
    
}
