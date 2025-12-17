import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Trash2, RefreshCw, Copy } from 'lucide-react';

const ApiKeys = () => {
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newKey, setNewKey] = useState(null);

    const fetchKeys = async () => {
        try {
            const response = await api.get('/apikeys');
            setKeys(response.data);
        } catch (error) {
            console.error("Failed to fetch keys", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKeys();
    }, []);

    const handleGenerate = async () => {
        try {
            const response = await api.post('/apikeys');
            setNewKey(response.data.apiKey);
            fetchKeys();
        } catch (error) {
            console.error("Failed to generate key", error);
        }
    };

    const handleRevoke = async (id) => {
        if (!window.confirm('Are you sure you want to revoke this key?')) return;
        try {
            await api.post(`/apikeys/revoke/${id}`);
            fetchKeys();
        } catch (error) {
            console.error("Failed to revoke key", error);
        }
    };

    const handleRotate = async (id) => {
        if (!window.confirm('Are you sure you want to rotate this key? The old one will be revoked immediately.')) return;
        try {
            const response = await api.post(`/apikeys/rotate/${id}`);
            setNewKey(response.data.apiKey);
            fetchKeys();
        } catch (error) {
            console.error("Failed to rotate key", error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900">API Keys</h1>
                <button
                    onClick={handleGenerate}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Key
                </button>
            </div>

            {newKey && (
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <Copy className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-green-700">
                                New API Key generated. Please copy it now, you won't be able to see it again!
                            </p>
                            <p className="mt-2 text-sm font-mono font-bold text-green-800 bg-green-100 p-2 rounded select-all">
                                {newKey}
                            </p>
                        </div>
                        <div className="ml-auto pl-3">
                            <div className="-mx-1.5 -my-1.5">
                                <button
                                    onClick={() => setNewKey(null)}
                                    className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                                >
                                    <span className="sr-only">Dismiss</span>
                                    <span className="text-xl">&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Key ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Created At
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {keys.map((key) => (
                            <tr key={key._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-mono text-gray-900">{key._id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${key.revoked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                        }`}>
                                        {key.revoked ? 'Revoked' : 'Active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(key.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {!key.revoked && (
                                        <>
                                            <button
                                                onClick={() => handleRotate(key._id)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                title="Rotate Key"
                                            >
                                                <RefreshCw className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleRevoke(key._id)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Revoke Key"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApiKeys;
