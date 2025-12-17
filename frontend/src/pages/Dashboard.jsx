import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Users, Key, FileText } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Welcome back, {user?.username || user?.email}!
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>
                        You are logged in as a <strong>{user?.role}</strong>.
                        Use the sidebar to navigate to different sections.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {['admin', 'manager'].includes(user?.role) && (
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Users className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            User Management
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                Manage your team
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <Link to="/users" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    View all users
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Key className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        API Keys
                                    </dt>
                                    <dd>
                                        <div className="text-lg font-medium text-gray-900">
                                            Manage access keys
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                            <Link to="/apikeys" className="font-medium text-indigo-600 hover:text-indigo-500">
                                View API keys
                            </Link>
                        </div>
                    </div>
                </div>

                {user?.role === 'admin' && (
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <FileText className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Audit Logs
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">
                                                View system activity
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <Link to="/audit" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    View logs
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
