import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiCheckCircle, FiXCircle, FiLock, FiUnlock, FiMoreVertical } from 'react-icons/fi';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import api from '../../services/api';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/admin/users');
      setUsers(response.data.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBlock = async (userId, isBlocked) => {
    const action = isBlocked ? 'unblock' : 'block';
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

    try {
      toast.loading(`${action === 'block' ? 'Blocking' : 'Unblocking'} user...`);
      await api.put(`/admin/users/${userId}/block`);
      toast.dismiss();
      toast.success(`User ${action}ed successfully`);
      fetchUsers(); // Refresh list
    } catch (error) {
      toast.dismiss();
      toast.error(`Failed to ${action} user`);
      console.error(error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.includes(searchTerm) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Overview and control of all registered members</p>
        </div>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <Card padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-600">User</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Joined On</th>
                  <th className="px-6 py-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                      No users found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${user.role === 'admin' ? 'bg-purple-500' : 'bg-primary-500'}`}>
                            {user.fullName?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 flex items-center gap-2">
                              {user.fullName}
                              {user.role === 'admin' && <Badge color="purple">Admin</Badge>}
                            </div>
                            <div className="text-sm text-gray-500">{user.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            {user.isBlocked ? (
                              <Badge color="red">Blocked</Badge>
                            ) : user.isProfileApproved ? (
                              <Badge color="green">Approved</Badge>
                            ) : (
                              <Badge color="yellow">Pending Approval</Badge>
                            )}
                          </div>
                          {user.isPhoneVerified && (
                            <span className="text-[10px] text-green-600 font-medium flex items-center gap-0.5">
                              <FiCheckCircle className="w-2.5 h-2.5" /> Phone Verified
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link to={`/profiles/${user._id}`}>
                            <button title="View Profile" className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                              <FiUser className="w-5 h-5" />
                            </button>
                          </Link>
                          {user.role !== 'admin' && (
                            <button
                              onClick={() => handleToggleBlock(user._id, user.isBlocked)}
                              title={user.isBlocked ? 'Unblock User' : 'Block User'}
                              className={`p-2 rounded-lg transition-colors ${user.isBlocked
                                ? 'bg-green-50 text-green-600 hover:bg-green-100'
                                : 'bg-red-50 text-red-600 hover:bg-red-100'
                                }`}
                            >
                              {user.isBlocked ? <FiUnlock className="w-5 h-5" /> : <FiLock className="w-5 h-5" />}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UserManagement;
