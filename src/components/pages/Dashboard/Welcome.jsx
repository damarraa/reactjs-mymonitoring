import React from 'react'

const Welcome = () => {
  return (
    <div>
       <div className="w-full bg-cyan-600 rounded-md  border border-gray-200 flex items-center opacity-90 ">
        <div className='ml-12 w-full'>
          <div className="font-bold text-white text-3xl">Selamat Datang!</div>
          <p className="text-white mt-2 text-md">Kelola laporan dengan mudah dan cepat</p>
        </div>
        <div className=" mt-2 mr-10 ">
            <img src="online-search-74.png" alt="" className="w-56" />
        </div>
      </div>
    </div>
  )
}

export default Welcome