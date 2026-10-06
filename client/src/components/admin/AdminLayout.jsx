import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Plus,
  ShoppingBag,
  Users,
  MessageSquare,
  Store,
  LogOut,
  Menu,
  X,
} from "lucide-react";


function AdminLayout() {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);


  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");

    setMobileMenu(false);

    navigate("/login");
  };


  // ======================================================
  // CLOSE MOBILE MENU
  // ======================================================

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };


  // ======================================================
  // NAVIGATION CLASS
  // ======================================================

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-white text-black shadow-sm"
        : "text-white/55 hover:bg-white/5 hover:text-white"
    }`;


  return (
    <div className="min-h-screen bg-[#0d0f0f] text-white">

      <div className="flex min-h-screen">


        {/* ==================================================
            DESKTOP SIDEBAR
        ================================================== */}

        <aside className="fixed left-0 top-0 z-50 hidden h-screen w-[260px] border-r border-white/10 bg-[#111313] p-5 lg:block">

          {/* =========================
              LOGO
          ========================= */}

          <div className="mb-10 px-3">

            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="text-xl font-black tracking-[-0.06em]"
            >
              SHOPLY
              <span className="text-white/30">
                .
              </span>
            </button>

            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
              Admin Panel
            </p>

          </div>


          {/* =========================
              DESKTOP NAVIGATION
          ========================= */}

          <nav className="space-y-1">

            {/* Overview */}

            <p className="mb-3 px-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
              Overview
            </p>

            <NavLink
              to="/admin"
              end
              className={navClass}
            >
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </NavLink>


            {/* Store */}

            <p className="mb-3 mt-8 px-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
              Store
            </p>

            <NavLink
              to="/admin/products"
              end
              className={navClass}
            >
              <Package size={17} />
              <span>Products</span>
            </NavLink>

            <NavLink
              to="/admin/products/new"
              className={navClass}
            >
              <Plus size={17} />
              <span>Add Product</span>
            </NavLink>

            <NavLink
              to="/admin/orders"
              className={navClass}
            >
              <ShoppingBag size={17} />
              <span>Orders</span>
            </NavLink>


            {/* Customers */}

            <p className="mb-3 mt-8 px-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
              Customers
            </p>

            <NavLink
              to="/admin/users"
              className={navClass}
            >
              <Users size={17} />
              <span>Users</span>
            </NavLink>

            <NavLink
              to="/admin/reviews"
              className={navClass}
            >
              <MessageSquare size={17} />
              <span>Reviews</span>
            </NavLink>

          </nav>


          {/* =========================
              DESKTOP BOTTOM
          ========================= */}

          <div className="absolute bottom-(-3) left-5 right-5 space-y-2">

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/50 transition hover:bg-white/5 hover:text-white"
            >
              <Store size={17} />
              <span>Back to Store</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut size={17} />
              <span>Logout</span>
            </button>

          </div>

        </aside>


        {/* ==================================================
            MOBILE OVERLAY
        ================================================== */}

        {mobileMenu && (
          <button
            type="button"
            aria-label="Close admin menu"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-[90] cursor-default bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}


        {/* ==================================================
            MOBILE SIDEBAR / DRAWER
        ================================================== */}

        <aside
          className={`fixed left-0 top-0 z-[100] flex h-[100dvh] w-[280px] flex-col border-r border-white/10 bg-[#111313] p-5 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
            mobileMenu
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >

          {/* =========================
              MOBILE HEADER
          ========================= */}

          <div className="flex shrink-0 items-center justify-between px-2">

            <div>

              <button
                type="button"
                onClick={() => {
                  navigate("/admin");
                  closeMobileMenu();
                }}
                className="text-xl font-black tracking-[-0.06em]"
              >
                SHOPLY
                <span className="text-white/30">
                  .
                </span>
              </button>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                Admin Panel
              </p>

            </div>


            {/* Close Button */}

            <button
              type="button"
              onClick={closeMobileMenu}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:bg-white/10 hover:text-white"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>

          </div>


          {/* =================================================
              MOBILE NAVIGATION

              flex-1 + overflow-y-auto prevents overlap
          ================================================= */}

          <nav className="mt-8 min-h-0 flex-1 overflow-y-auto pr-1">

            {/* =========================
                OVERVIEW
            ========================= */}

            <p className="mb-3 px-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
              Overview
            </p>

            <NavLink
              to="/admin"
              end
              onClick={closeMobileMenu}
              className={navClass}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>


            {/* =========================
                STORE
            ========================= */}

            <p className="mb-3 mt-7 px-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
              Store
            </p>

            <NavLink
              to="/admin/products"
              end
              onClick={closeMobileMenu}
              className={navClass}
            >
              <Package size={18} />
              <span>Products</span>
            </NavLink>

            <NavLink
              to="/admin/products/new"
              onClick={closeMobileMenu}
              className={navClass}
            >
              <Plus size={18} />
              <span>Add Product</span>
            </NavLink>

            <NavLink
              to="/admin/orders"
              onClick={closeMobileMenu}
              className={navClass}
            >
              <ShoppingBag size={18} />
              <span>Orders</span>
            </NavLink>


            {/* =========================
                CUSTOMERS
            ========================= */}

            <p className="mb-3 mt-7 px-4 text-[9px] font-bold uppercase tracking-[0.2em] text-white/25">
              Customers
            </p>

            <NavLink
              to="/admin/users"
              onClick={closeMobileMenu}
              className={navClass}
            >
              <Users size={18} />
              <span>Users</span>
            </NavLink>

            <NavLink
              to="/admin/reviews"
              onClick={closeMobileMenu}
              className={navClass}
            >
              <MessageSquare size={18} />
              <span>Reviews</span>
            </NavLink>

          </nav>


          {/* =================================================
              MOBILE BOTTOM ACTIONS

              shrink-0 keeps them separate from nav
          ================================================= */}

          <div className="mt-4 shrink-0 border-t border-white/10 pt-3">

            {/* Back to Store */}

            <button
              type="button"
              onClick={() => {
                navigate("/");
                closeMobileMenu();
              }}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/50 transition hover:bg-white/5 hover:text-white"
            >
              <Store size={18} />
              <span>Back to Store</span>
            </button>


            {/* Logout */}

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>

          </div>

        </aside>


        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <main className="min-h-screen flex-1 lg:ml-[260px]">


          {/* =================================================
              MOBILE TOP BAR
          ================================================= */}

          <header className="sticky top-0 z-40 flex h-[68px] items-center justify-between border-b border-white/10 bg-[#0d0f0f]/95 px-4 backdrop-blur-xl sm:px-5 lg:hidden">

            {/* Hamburger */}

            <button
              type="button"
              onClick={() => setMobileMenu(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white transition hover:bg-white/10"
              aria-label="Open admin menu"
            >
              <Menu size={20} />
            </button>


            {/* Center Logo */}

            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="absolute left-1/2 -translate-x-1/2 text-lg font-black tracking-[-0.06em]"
            >
              SHOPLY
              <span className="text-white/30">
                .
              </span>
            </button>


            {/* Store Button */}

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 text-[9px] font-bold uppercase tracking-[0.12em] text-white/60 transition hover:bg-white/10 hover:text-white min-[380px]:px-4"
            >
              <Store size={14} />

              <span className="hidden min-[380px]:inline">
                Store
              </span>
            </button>

          </header>


          {/* =================================================
              PAGE CONTENT
          ================================================= */}

          <div className="p-4 sm:p-6 lg:p-10">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
}


export default AdminLayout;