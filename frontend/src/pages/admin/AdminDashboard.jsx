import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import { FiUsers, FiCheckCircle, FiXCircle, FiActivity } from 'react-icons/fi';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState([
    { label: 'Total Users', value: '0', icon: FiUsers, color: 'blue', link: '/admin/users' },
    { label: 'Pending Approval', value: '0', icon: FiCheckCircle, color: 'yellow', link: '/admin/pending-profiles' },
    { label: 'Active Profiles', value: '0', icon: FiActivity, color: 'green', link: '/admin/users' },
    { label: 'Blocked Users', value: '0', icon: FiXCircle, color: 'red', link: '/admin/users' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        if (response.data.status === 'success') {
          const { totalUsers, pendingApprovals, activeProfiles, blockedUsers } = response.data.data.stats;
          setStats([
            { label: 'Total Users', value: totalUsers, icon: FiUsers, color: 'blue', link: '/admin/users' },
            { label: 'Pending Approval', value: pendingApprovals, icon: FiCheckCircle, color: 'yellow', link: '/admin/pending-profiles' },
            { label: 'Active Profiles', value: activeProfiles, icon: FiActivity, color: 'green', link: '/admin/users' },
            { label: 'Blocked Users', value: blockedUsers, icon: FiXCircle, color: 'red', link: '/admin/users' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link key={index} to={stat.link} className="block transition-transform hover:-translate-y-1">
            <Card padding="md" className="h-full hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {loading ? '...' : stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
