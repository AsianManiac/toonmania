"use client"

import { IconType } from "react-icons";

interface GenreInputProps {
    icon: IconType;
    label: string;
    selected: boolean;
    onClick: (value: string) => void;
}

const GenreInput: React.FC<GenreInputProps> = ({ 
    icon: Icon,
    label,
    selected,
    onClick
 }) => {
    return ( 
        <div
            onClick={() => onClick(label)}
            className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${selected ? 'border-black' : 'border-neutral-200'}`}
        >
            <Icon size={30}/>
            <div className="font-semibold text-xs">
                {label}
            </div>
        </div>
     );
}
 
export default GenreInput;