import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Key, FileText, LogOut } from 'lucide-react';

const Layout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'manager', 'user'] },
        { path: '/users', label: 'Users', icon: Users, roles: ['admin', 'manager'] },
        { path: '/apikeys', label: 'API Keys', icon: Key, roles: ['admin', 'manager', 'user'] },
        { path: '/audit', label: 'Audit Logs', icon: FileText, roles: ['admin'] },
    ];

    // Filter items based on user role
    const filteredNavItems = navItems.filter(item =>
        item.roles.includes(user?.role || 'user')
    );

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-indigo-600">SaaS Auth</h1>
                    <p className="text-sm text-gray-500 mt-1">Welcome, {user?.username}</p>
                </div>
                <nav className="mt-6">
                    {filteredNavItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${location.pathname === item.path ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600' : ''
                                }`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 mt-auto"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className="font-medium">Logout</span>
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
                    </h2>
                    <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium">
                            {user?.role?.toUpperCase()}
                        </span>
                    </div>
                </header>
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
