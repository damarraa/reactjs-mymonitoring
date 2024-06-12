import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoNotificationsOutline, IoRemoveOutline } from 'react-icons/io5';

function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    tenggatAwal: '',
    tenggatAkhir: '',
    lokasi: ''
  });

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { tenggatAwal, value } = e.target;
    setFormData({
      ...formData,
      [tenggatAwal]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform form submission logic here, like sending data to a server
    console.log('Form data:', formData);
    // Clear form data after submission
    setFormData({
      tenggatAwal: '',
      tenggatAkhir: '',
      lokasi: ''
    });
    // Close the popup after submission
    togglePopup();
  };

  return (
    <div>
        <div className='flex relative'>
            <FaPlus 
            style={{color:'#ffffff'}} 
            fontSize={15} 
            className='absolute justify-center top-2.5 left-2'> 
            </FaPlus>
            <button className="bg-blue hover:bg-sky-600 text-white text-sm py-2 px-3 pl-7 rounded-sm" onClick={togglePopup}>Tambah Data</button>
        </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="absolute bg-gray-900 opacity-60 inset-0"></div>
          <div className="z-50 bg-white rounded-sm p-8 max-w-3xl w-full">
            <h2 className="text-base mb-4 font-bold txtcolor">Form Jadwal dan Lokasi Pemeriksaan</h2>
            <hr className='mb-3'/>
            <div className='bgred rounded-sm text-white flex p-3'>
                <IoNotificationsOutline fontSize={25} className='ml-1 mt-1'/>
                <div className='ml-3'>
                <p className='font-bold text-sm'>Perhatian!</p>
                <p className='text-xs'>Pastikan pilihan jadwal dan lokasi pemeriksaan telah tepat sebelum disimpan.</p>
                </div>  
            </div>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className='text-sm'>
                    <label className="block mb-2" htmlFor="date">Jadwal Pemeriksaan</label>
                    <div className='flex font-light'>
                        <input className="w-full border rounded py-2 px-3 mb-3" type="date" id="TenggatAwal" name="date" value={formData.tenggatAwal} onChange={handleChange} required />
                        <IoRemoveOutline  fontSize={40}></IoRemoveOutline>
                        <input className="w-full border rounded py-2 px-3 mb-3" type="date" id="TenggatAkhir" name="date" value={formData.tenggatAkhir} onChange={handleChange} required />
                    </div>
                    <label className="block mb-2" htmlFor="message">Lokasi Pemeriksaan</label>
                    <select className="w-full border rounded py-2 px-3 mb-3 font-light"  id="lokasi" name="lokasi" value={formData.lokasi} onChange={handleChange} required>
                        <option value="" disabled hidden>Pilih Lokasi Feeder</option>
                    </select>
                </div>
                <div className='flex mt-3 ml-3 relative left-3/4 gap-3'>
                    <button className="bg-white hover:bg-neutral-200 border border-neutral-200 text-gray-500 text-sm py-2 px-4 rounded" onClick={togglePopup}>Tutup</button>
                    <button className="bg-blue hover:bg-sky-600 text-white text-sm py-2 px-4 rounded" type="submit">Simpan</button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupForm;
