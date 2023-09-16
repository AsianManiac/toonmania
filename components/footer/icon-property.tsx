interface IconPropertyProps {
    Icon: any;
    size: number;
}
const IconProperty = ({ 
    Icon, 
    size 
}: IconPropertyProps) => {
    return (
      <div>
          <Icon size={size}/>
      </div>
   
    )
  }
  
  export default IconProperty