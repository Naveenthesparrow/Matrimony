import { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import api from '../../services/api';
import toast from 'react-hot-toast';

const PendingProfiles = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPendingProfiles = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/admin/profiles/pending');
      setPendingUsers(response.data.data.users);
    } catch (error) {
      console.error('Error fetching pending profiles:', error);
      toast.error('Failed to fetch pending profiles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingProfiles();
  }, []);

  const handleApprove = async (userId) => {
    try {
      toast.loading('Approving profile...');
      await api.put(`/admin/profiles/${userId}/approve`);
      toast.dismiss();
      toast.success('Profile approved successfully');
      fetchPendingProfiles(); // Refresh list
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to approve profile');
    }
  };

  const handleReject = async (userId) => {
    if (!window.confirm('Are you sure you want to reject this certificate?')) return;
    try {
      toast.loading('Rejecting profile...');
      await api.put(`/admin/profiles/${userId}/reject`);
      toast.dismiss();
      toast.success('Profile rejected successfully');
      fetchPendingProfiles(); // Refresh list
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to reject profile');
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pending Profiles</h1>
        <p className="text-gray-600">Review and approve user community certificates</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : pendingUsers.length === 0 ? (
        <Card padding="lg">
          <p className="text-gray-600 text-center py-8">No pending profiles for review</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {pendingUsers.map((user) => (
            <Card key={user._id} padding="lg">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 text-2xl font-bold">
                      {user.fullName?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{user.fullName}</h2>
                      <p className="text-gray-600">{user.phone}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-500">Gender</span>
                      <span className="font-semibold">{user.profile?.gender || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-500">Location</span>
                      <span className="font-semibold">{user.profile?.city}, {user.profile?.state}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-500">Uploaded On</span>
                      <span className="font-semibold">
                        {user.communityCertificate?.uploadedAt ? new Date(user.communityCertificate.uploadedAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleApprove(user._id)}
                      className="flex-1"
                      variant="primary"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(user._id)}
                      className="flex-1"
                      variant="outline"
                      danger
                    >
                      Reject
                    </Button>
                  </div>
                </div>

                <div className="flex-1 border-2 border-gray-100 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center relative min-h-[300px]">
                  {user.communityCertificate?.url?.endsWith('.pdf') ? (
                    <div className="text-center p-8">
                      <svg className="w-20 h-20 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                      </svg>
                      <p className="font-semibold mb-4">{user.communityCertificate?.filename}</p>
                      <a
                        href={user.communityCertificate?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-white border border-gray-300 rounded-lg font-bold hover:bg-gray-100 transition-colors inline-block"
                      >
                        Open PDF Certificate
                      </a>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col">
                      <img
                        src={user.communityCertificate?.url}
                        alt="Certificate"
                        className="w-full h-auto object-contain max-h-[500px]"
                      />
                      <div className="p-4 bg-white border-t flex justify-center">
                        <a
                          href={user.communityCertificate?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 font-bold hover:underline"
                        >
                          View Original Image
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingProfiles;
