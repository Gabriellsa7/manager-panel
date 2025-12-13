"use client";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import {
  FaAngleRight,
  FaBriefcase,
  FaCalendar,
  FaChartLine,
  FaHome,
  FaUserTie,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Profile from "./profile";
import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const pathname = usePathname();

  const params = useParams();

  const barbershopId = params.id;

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setShowProfile(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [open]);

  const toggleSidebar = () => {
    if (open) {
      setShowProfile(false);
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <aside
      className={`
        h-screen bg-purple-700 text-white
        transition-all duration-500 flex flex-col items-center justify-between py-3
        ${open ? "w-52" : "w-20"}
      `}
    >
      <nav className="flex flex-col gap-4">
        {showProfile && <Profile />}
        <Link href={`/barbershop/${barbershopId}/home`}>
          <MenuItem
            icon={FaHome}
            text="Home"
            open={open}
            active={pathname === `/barbershop/${barbershopId}/home`}
          />
        </Link>
        <Link href={`/barbershop/${barbershopId}/dashboard`}>
          <MenuItem
            icon={FaChartLine}
            text="Dashboard"
            open={open}
            active={pathname === `/barbershop/${barbershopId}/dashboard`}
          />
        </Link>
        <Link href={`/barbershop/${barbershopId}/appointments`}>
          <MenuItem
            icon={FaCalendar}
            text="Appointments"
            open={open}
            active={pathname === `/barbershop/${barbershopId}/appointments`}
          />
        </Link>
        <Link href={`/barbershop/${barbershopId}/services`}>
          <MenuItem
            icon={FaBriefcase}
            text="Services"
            open={open}
            active={pathname === `/barbershop/${barbershopId}/services`}
          />
        </Link>
        <Link href={`/barbershop/${barbershopId}/employees`}>
          <MenuItem
            icon={FaUserTie}
            text="Employees"
            open={open}
            active={pathname === `/barbershop/${barbershopId}/employees`}
          />
        </Link>
        <Link href={`/barbershop/${barbershopId}/settings`}>
          <MenuItem
            icon={IoMdSettings}
            text="Settings"
            open={open}
            active={pathname === `/barbershop/${barbershopId}/settings`}
          />
        </Link>
      </nav>
      <button onClick={toggleSidebar} className="hover:bg-purple-600">
        {open ? (
          <FaAngleRight size={24} className="rotate-180" />
        ) : (
          <FaAngleRight size={24} />
        )}
      </button>
    </aside>
  );
}

function MenuItem({
  icon: Icon,
  text,
  open,
  active,
}: {
  icon: IconType | string;
  text: string;
  open: boolean;
  active: boolean;
}) {
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 cursor-pointer
        rounded-2xl
        transition-all duration-300 ease-in-out
        ${active ? "bg-purple-100 scale-105 shadow-md" : "hover:bg-purple-600"}
      `}
    >
      <Icon className={`text-xl ${active ? "text-purple-600" : ""}`} />
      {open && (
        <span
          className={`whitespace-nowrap ${active ? "text-purple-600" : ""}`}
        >
          {text}
        </span>
      )}
    </div>
  );
}
