const Input = (props) => {
    const{type, placeholder} = props;
  return (
    <div className='w-full max-w-xs'>
      <input type={type} placeholder={placeholder} className='border text-base px-2.5 py-2 focus:outline-none focus:ring-0 focus:border-blue-600 rounded-lg bg-gray-50 border-gray-300 text-gray-900 w-full rounded-md'></input>
    </div>
  )
}

export default Input
