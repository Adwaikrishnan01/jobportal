const Button= ({label,onClick,disabled,outline,small,icon:Icon}) => {
    return (
      <button disabled={disabled}
              onClick={onClick}
              className={` disabled:opacity-70 disabled:cursor-not-allowed mt-3
              hover:opacity-80 cursor-pointer relative rounded-md w-full
               ${outline ? 'bg-white' : 'bg-fuchsia-600'}
              ${outline ? 'border-solid border-2 border-black' : 'border-solid border-2 border-fuchsia-700'}
              ${outline ? 'text-black' : 'text-white'} 
              ${small? 'px-2 py-1':'px-3 py-2'}
              ${small? 'font-light':'font-bold'}
              ${small? 'text-sm':'text-md'}`}>
                  {Icon&&
                  (<Icon size={20} className="absolute"></Icon>)}
              {label}
              </button>
    )
  }
  
  export default Button