import { Link, useLocation } from "react-router-dom"
import classNames from 'classnames'
// import { HiOutlineLogout } from 'react-icons/hi'
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from "../../link/navigation"

const linkClass = 'flex items-center gap-2 px-3 py-4 hover:bg-neutral-100 hover:no-underline active:bg-neutral-100 rounded-sm text-base'


export default function Sidebar(){
  return (
    <div className="shadow bg-white w-72 flex flex-col text-white ">
      <div className="flex">
        <img src="/logo_my.png" alt="" className='mb-3 mt-7 w-40 mx-14'/>
      </div>
      <div className=" py-8 flex flex-1 flex-col gap-0.5">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
			</div>
			<div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-50">
				{DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
					<SidebarLink key={link.key} link={link} />
				))}
				{/* <div className={classNames(linkClass, 'cursor-pointer text-neutral-400')}>
					<span className="text-xl">
						<HiOutlineLogout />
					</span>
					Log Out
				</div> */}
			</div>
    </div>
  )
}

function SidebarLink({ link }) {
	const { pathname } = useLocation()

	return (
		<Link
			to={link.path}
			className={classNames(pathname === link.path ? 'shadow bg-neutral-100 text-sky-440 text-sm font-semibold ' : 'text-neutral-400 text-sm' , linkClass)}>
			<span className="text-xl">{link.icon}</span>
			{link.label}
		</Link>
	)
}


