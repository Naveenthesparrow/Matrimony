import Card from '../../components/common/Card';
import { useTranslation } from '../../context/TranslationContext';

const Interests = () => {
  const { language } = useTranslation();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{language === 'ta' ? 'ஆர்வங்கள்' : 'Interests'}</h1>
        <p className="text-gray-600">{language === 'ta' ? 'அனுப்பிய மற்றும் பற்றப்பட்ட ஆர்வங்களை நிர்வகிக்கவும்' : 'Manage sent and received interests'}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="md">
          <h2 className="text-xl font-semibold mb-4">{language === 'ta' ? 'பற்றப்பட்ட ஆர்வங்கள்' : 'Received Interests'}</h2>
          <p className="text-gray-600">{language === 'ta' ? 'இன்னும் ஆர்வங்கள் பற்றவில்லை' : 'No interests received yet'}</p>
        </Card>
        
        <Card padding="md">
          <h2 className="text-xl font-semibold mb-4">{language === 'ta' ? 'அனுப்பிய ஆர்வங்கள்' : 'Sent Interests'}</h2>
          <p className="text-gray-600">{language === 'ta' ? 'இன்னும் ஆர்வங்கள் அனுப்பவில்லை' : 'No interests sent yet'}</p>
        </Card>
      </div>
    </div>
  );
};

export default Interests;
