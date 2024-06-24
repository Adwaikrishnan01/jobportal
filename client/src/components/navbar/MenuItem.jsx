
const MenuItem = ({onClick,label}) => {
  return (
    <div onClick={onClick} 
    className="px-8 py-3 hover:bg-fuchsia-100
    transition font-semibold">{label}
    </div>
  )
}

export default MenuItem