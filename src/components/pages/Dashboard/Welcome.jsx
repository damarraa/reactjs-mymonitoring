import React from 'react'

const Welcome = () => {
  return (
    <div>
       <div className="w-full  p-2 bg-sky-700 rounded-md  border border-gray-200 flex items-center ">
        <div className='ml-4 w-full'>
          <div className="font-bold text-white text-2xl">Selamat Datang di MY-REPORTING</div>
          <p className="text-white mt-2 text-sm">Kelola laporan dengan mudah dan cepat</p>
        </div>
        <div className=" relative mt-8 mr-6 ">
            <img src="vector_pole.png" alt="" className="w-16" />
          </div>
      </div>
    </div>
  )
}

export default Welcome
