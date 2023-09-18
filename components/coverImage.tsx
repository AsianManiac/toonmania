import Image from "next/image";

const CoverImage = () => {
    return ( 
        <Image
            alt="Cover Image"
            objectFit="fit"
            fill
            src={`/home_bg011.jpg`}
        />
     );
}
 
export default CoverImage;