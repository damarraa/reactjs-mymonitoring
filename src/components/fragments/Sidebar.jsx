import { Link, useLocation, useNavigate } from "react-router-dom";
import classNames from 'classnames';
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from "../../link/navigation";
import axios from 'axios';

const linkClass = 'flex items-center gap-4 px-3 py-3 hover:bg-slate-700 hover:no-underline active:bg-slate-700 rounded-sm text-base mx-5';

export default function Sidebar(){
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://your-laravel-backend-url/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Handle error accordingly
    }
  };

  return (
    <div className="bg-slate-900 w-72 flex flex-col text-white">
      <div className="flex justify-center">
        <img src="iconlogo.png" alt="" className='mt-12 w-52'/>
      </div>
      <div className="py-9 flex flex-1 flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-neutral-50">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          link.key === '' ? (
            <div
              key={link.key}
              className={classNames(linkClass, 'cursor-pointer text-neutral-400')}
              onClick={handleLogout}
            >
              <span className="text-xl">
                {link.icon}
              </span>
              {link.label}
            </div>
          ) : (
            <SidebarLink key={link.key} link={link} />
          )
        ))}
      </div>
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(pathname === link.path ? 'shadow bg-slate-700 text-white text-sm font-semibold' : 'text-neutral-400 text-sm', linkClass)}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
