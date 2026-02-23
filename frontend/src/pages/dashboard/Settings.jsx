import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { useTranslation } from '../../context/TranslationContext';

const Settings = () => {
  const { language } = useTranslation();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{language === 'ta' ? 'அமைப்புகள்' : 'Settings'}</h1>
        <p className="text-gray-600">{language === 'ta' ? 'உங்கள் கணக்கு அமைப்புகளை நிர்வகிக்கவும்' : 'Manage your account settings'}</p>
      </div>

      <div className="space-y-6">

        <Card padding="lg">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <Button>Update Password</Button>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
