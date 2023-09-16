
import IconProperty from "./icon-property";

interface FooterIconprops {
    Icon: any;
    text: string;
    size: number;
    location: string;
}

const FooterIcon = ({ Icon, text, size, location } : FooterIconprops) => {
    return ( 
        <div className="flex space-x-2 flex-col">
            {/* width 134 height 40 */}
            <div className="flex flex-row">
                {/* icon here */}
                <div className="flex w-36 h-11 flex-row space-x-1 bg-black dark:bg-black/50 rounded-md px-2 py-1 items-center">
                    <div>
                        <IconProperty
                            Icon={Icon}
                            size={size}
                        />
                    </div>
                    <div className="">
                        <p className="text-[10px] font-medium text-gray-300">{text}</p>
                        <p className="font-semibold text-base/5 text-gray-200">{location}</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default FooterIcon;