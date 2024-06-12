const Button = (props) => {
    const{judul} = props;
  return (
    <div className="mt-5 w-full max-w-xs">
     <button className="btncolor w-full border-2 border-dark-red text-white focus:ring-4 font-medium py-3 px-20 rounded-md ">{judul}</button>
    </div>
  )
}

export default Button
