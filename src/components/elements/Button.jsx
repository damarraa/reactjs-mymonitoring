const Button = (props) => {
    const{judul} = props;
  return (
    <div className="mt-5 w-full max-w-xs">
     <button className="bg-slate-900 w-full border-dark-red text-white focus:ring-4 font-medium py-3 px-20 rounded-md ">{judul}</button>
    </div>
  )
}

export default Button
