import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { LockKeyhole, LogOut } from "lucide-react"

export default function User() {
    return (
        <>
            <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button className="text-md" variant="link">Geri Hoxha</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-60 text-sm flex flex-col space-y-3">
                    <Button icon={<LockKeyhole />} size={'sm'}>Ndrysho fjalekalimin</Button>
                    <Button icon={<LogOut />} size={'sm'} variant={'destructive'}>Log out</Button>
                </HoverCardContent>
            </HoverCard>
        </>
    )
}