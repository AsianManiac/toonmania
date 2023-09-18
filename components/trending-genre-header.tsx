import { cn } from "@/lib/utils";

interface TrendingHeaderProps {
    title: String;
    className?: string | undefined;
    border?: string | undefined;
}

const TrendingHeader = ({
    title,
    className,
    border
}: TrendingHeaderProps) => {
    return ( 
        <div className={cn(`py-7 items-center justify-center`, `${border}`)}>
            <p 
                className={cn(`font-semibold`, `${className}`)}
            >
                {title}
            </p>
        </div>
     );
}
 
export default TrendingHeader;