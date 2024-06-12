import { IoNotificationsOutline } from "react-icons/io5"


const Pengaturan = () => {
  return (
    <div>
        <div className="pl-4 mt-4">
            <div className="font-bold txtcolor text-xl">Pengaturan Akun</div>
            <p className="mt-2 text-base">Tinjau dan perbarui detail akun Anda</p>
            <p className="font-light mt-2 text-sm">Lakukan pembaruan data terbaru</p>
        </div>
        <div className='shadow-xl bg-white rounded-md font-light flex p-7 mx-4 mt-5'>
          <IoNotificationsOutline fontSize={40} className='ml-1'/>
          <div className='ml-5'>
            <p className='font-bold text-xl text-neutral-800'>Data Analis</p>
            <p className='text-sm mt-2'>Harap pastikan data yang diperbarui telah sesuai</p>
          </div>
        </div>
        <div className="bg-blue justify-center rounded-md mx-4 p-10 text-sm">
            <form action="">
              <div className="flex grid grid-cols-2 mx-6 ">
                <div className="mr-4">
                  <label className="block mb-2 text-white font-bold" htmlFor="name">Nama</label>
                  <input className="w-full border rounded py-2 px-3 mb-3" type="text" id="name" name="name" placeholder="Nama"></input>
                </div>
                <div className="ml-4">
                  <label className="block mb-2 text-white font-bold" htmlFor="name">Email</label>
                  <input className="w-full border rounded py-2 px-3 mb-3" type="email" id="email" name="email" placeholder="Email"></input>
                </div>
              </div>
              <div className="flex grid grid-cols-2 mt-8 mx-6">
                <div className="mr-4">
                  <label className="block mb-2 text-white font-bold" htmlFor="name">Password saat ini</label>
                  <input className="w-full border rounded py-2 px-3 mb-3" type="password" id="oldpass" name="password" placeholder="Password saat ini"></input>
                </div>
                <div className="ml-4">
                  <label className="block mb-2 text-white font-bold" htmlFor="name">Password baru</label>
                  <input className="w-full border rounded py-2 px-3 mb-3" type="password" id="newpass" name="password" placeholder="Password baru"></input>
                </div>
              </div>
              <div className="ml-6 mt-4 relative">
                <button className="bgred hover:bg-red-600 text-white text-sm py-2 px-4 rounded" type="submit">Simpan</button>
              </div>
            </form>
            
           
          </div>   
  </div>
  )
}

export default Pengaturan
