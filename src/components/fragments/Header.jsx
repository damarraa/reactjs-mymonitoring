import {Fragment, useEffect, useState} from 'react'
import { Menu, Transition } from '@headlessui/react'
import {HiOutlineSearch } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { CgProfile } from 'react-icons/cg'
import api from '../../api'

export default function Header() {
	const navigate = useNavigate()
	const [searchQuery, setSearchQuery] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await api.get('/api/user');
				setUser(response.data);
			} catch (error) {
				console.error('Failed to fetch user', error);
			}
		};

		fetchUser();
	}, []);

	const handleLogout = async () => {
		try {
			const token = localStorage.getItem('token');
			console.log('Token tersimpan' , token);
			if (!token) {
				console.error('Token tidak ditemukan di localStorage');
				return;
			}
			await api.post('/api/logout', {}, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			});

			localStorage.removeItem('token');
			localStorage.removeItem('user');
			navigate('/login');
		} catch (error) {
			console.error('Logout failed', error);
		}
	}

	const handleUpdateProfile = async () => {
		try {
			const token = localStorage.getItem('token');
			console.log('Token tersimpan' , token);
			if (!token) {
				console.error('Token tidak ditemukan di localStorage');
				return;
			}
			navigate('/Pengaturan');
		} catch (error) {
			console.error('Error: ', error);
		}
	}

	return (
		<div className="shadow bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between">
			{/* <div className="relative">
				<HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
				<input
					type="search"
					placeholder="Cari Data"
					className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-md"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div> */}
			<div className="flex items-center gap-2 justify-end w-full">
				{/* Saya ingin kode nya disini menimpa span dibawah */}
				{user && <span className='text-sm text-gray-700 ml-2'>Halo, {user.name}!</span>}
				<Menu as="div" className="relative">
					<div>
						<Menu.Button className="ml-2 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
							<div className="h-8 w-8 rounded-full bg-neutral-50 bg-cover bg-no-repeat bg-center">
								<CgProfile className='h-8 w-8' style={{color:'#6b7280'}}></CgProfile>
							</div>
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
							<Menu.Item>
								{/* kode handleEditProfile disini */}
								{({ active }) => (
									<div
										onClick={handleUpdateProfile}
										// onClick={() => navigate('/Pengaturan')}
										className={classNames(
											active && 'bg-gray-100',
											'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
										)}
									>
										Pengaturan
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										// onClick={() => navigate('/Login')}
										onClick={handleLogout} // panggil handleLogout
										className={classNames(
											active && 'bg-gray-100',
											'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
										)}
									>
										Log Out
									</div>
								)}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</div>
	)
}
