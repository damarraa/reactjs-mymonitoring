const Label = (props) => {
    const{judul} = props;
  return (
    <div className='block text-base mb-2 justify-center'>
      <label className="txtcolor font-normal">{judul}</label>
    </div>
  )
}

export default Label
