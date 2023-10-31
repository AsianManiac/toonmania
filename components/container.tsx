"use client"

import { cn } from "@/lib/utils";

interface ContainerProps{
    className?: string;
    children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({
    className,
    children
}) => {
    return ( 
            <div
                className={cn(
                    "max-w-[2520px] mx-auto xl:px-28 lg:px-24 md:px-10 sm:px-2 xs:px-4", className )}
            >
                {children}
            </div>
     );
}
 
export default Container;