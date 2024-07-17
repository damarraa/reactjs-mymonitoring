import {
	HiOutlineViewGrid,
} from 'react-icons/hi'

import{TbCalendarTime} from 'react-icons/tb'
import{
	LuFileCheck2,
	LuFileCog,
	LuFileSearch,
	LuUtilityPole
} from 'react-icons/lu'
import { FaUserCog } from 'react-icons/fa'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/Dashboard',
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
		path: '/LaporanPemeriksaan',
		icon: <LuFileCheck2 />
	},
	{
		key: 'temuan_pemeriksaan',
		label: 'Data Laporan Temuan',
		path: '/TemuanPemeriksaan',
		icon: <LuFileSearch />
	},
	{
		key: 'lperbaikan_maintenance',
		label: 'Data Laporan Perbaikan ',
		path: '/LaporanPerbaikan',
		icon: <LuFileCog />
	},
	{
		key: 'datafeeder',
		label: 'Manajemen Feeder',
		path: '/DataFeeder',
		icon: <LuUtilityPole />
	},
	{
		key: 'manajemen_user',
		label: 'Manajemen User',
		path: '/ManajemenUser',
		icon: <FaUserCog />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		
	},
]

export const REGISTER = [
	{
		key: 'login',
		label: 'Login',
		path: '/Login',

	}
]