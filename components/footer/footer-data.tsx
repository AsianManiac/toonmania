
const FooterData = ({
    children
}: {
    children: React.ReactNode
}) => {
    return ( 
        <div className="flex flex-col justify-center items-center">
            {children}
        </div>
     );
}
 
export default FooterData;