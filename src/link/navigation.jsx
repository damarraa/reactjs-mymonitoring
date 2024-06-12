import {
	HiOutlineViewGrid,
	HiOutlineCog,
	HiOutlineLogout
} from 'react-icons/hi'

import{TbCalendarTime} from 'react-icons/tb'
import{
	LuFileCheck2,
	LuFileCog
} from 'react-icons/lu'
import { key } from 'localforage'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'jadwalpemeriksaan',
		label: 'Jadwal dan Lokasi Pemeriksaan',
		path: '/JadwaldanLokasi',
		icon: <TbCalendarTime />
	},
	{
		key: 'lpemeriksaan',
		label: 'Data Laporan Pemeriksaan',
		path: '/LPemeriksaan',
		icon: <LuFileCheck2 />
	},
	{
		key: 'temuan_pemeriksaan',
		label: 'Data Temuan',
		path: '/TemuanPemeriksaan',
		icon: <LuFileCog />
	},
	{
		key: 'lperbaikan_maintenance',
		label: 'Data Laporan Perbaikan ',
		path: '/LPerbaikanMTC',
		icon: <LuFileCog />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'pengaturan',
		label: 'Pengaturan',
		path: '/Pengaturan',
		icon: <HiOutlineCog />
	},
	{
		key: 'login',
		label: 'Log Out',
		path: '/Login',
		icon: <HiOutlineLogout />
	},
]

export const REGISTER = [
	{
		key: 'login',
		label: 'Login',
		path: '/Login',

	}
]