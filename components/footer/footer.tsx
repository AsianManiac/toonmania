import { AppleIcon, ChevronDown, Facebook, FacebookIcon, Instagram, PencilLine, Play, Twitter, Youtube } from "lucide-react";

import FooterIcon from "./footer-icon";
import FooterData from "./footer-data";

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuTrigger, 
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const footer = [
    {
        name: "About",
        href: "/about",
    },
    {
        name: "Feedback",
        href: "/feedback",
    },
    {
        name: "Help",
        href: "/help",
    },
    {
        name: "Terms",
        href: "/terms-&-conditions",
    },
    {
        name: "Privacy",
        href: "/privacy-policy",
    },
    {
        name: "Advertise",
        href: "/advertise",
    },
]
const Footer = () => {
    return ( 
        <div className="">
            {/* // Download ToonMania */}
            <div className="flex h-32 flex-col border-t-[1px] border-b-[1px] border-gray-300/70 items-center justify-center">
                <div className="text-lg font-normal">
                    <span>Download WEBTOON now!</span>
                </div>
                {/* width 134 height 40 */}
                <div className="flex flex-row space-x-2">
                    <FooterIcon
                        Icon={Play}
                        size={34}
                        text="GET IT ON"
                        location="Play Store"
                    />
                    <FooterIcon
                        Icon={AppleIcon}
                        size={34}
                        text="Download on the"
                        location="App Store"
                    />
                </div>
            </div>
            <FooterData>
                <div className="flex flex-row space-x-6 mt-12">
                    <Facebook fill="white" className="rounded-full h-5 w-5 bg-black"/>
                    <Instagram fill="white" className="rounded-full h-5 w-5"/>
                    <Twitter fill="black" className="rounded-full h-5 w-5"/>
                    <Youtube fill="black" className="rounded-full h-5 w-5"/>

                </div>
                <div className="flex flex-row space-x-5 mt-12 items-center ">
                    {footer.map((footer, index) => (
                        <a href={`${footer.href}`} key={index}>
                            {footer.name}
                            <span className="text-muted-foreground">&nbsp;&nbsp;&nbsp;&nbsp;|</span>
                        </a>
                    ))}
                    <DropdownMenu>
                    <DropdownMenuTrigger 
                        asChild
                        className="focus:outline-none"
                    >
                        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:bg-zinc-700/50 transition">
                        <p>English</p>
                        <ChevronDown/>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>English</DropdownMenuItem>
                        <DropdownMenuItem>中文 (繁體)</DropdownMenuItem>
                        <DropdownMenuItem>ภาษาไทย</DropdownMenuItem>
                        <DropdownMenuItem>Indonesia</DropdownMenuItem>
                        <DropdownMenuItem>Español</DropdownMenuItem>
                        <DropdownMenuItem>Français</DropdownMenuItem>
                        <DropdownMenuItem>Deutsch</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="text-gray-300/80 pt-5">
                    <span className="font-medium">ⓒ NAVER WEBTOON Ltd.</span>
                </div>
                <div className="mt-5">
                    <Image
                        src={`/webtoon-3.png`}
                        width={100}
                        height={24}
                        alt="ToonMania"
                    />
                </div>
            </FooterData>
        </div>
        
     );
}
 
export default Footer;