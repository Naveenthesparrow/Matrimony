import Card from '../../components/common/Card';
import { useTranslation } from '../../context/TranslationContext';

const Messages = () => {
  const { language } = useTranslation();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{language === 'ta' ? 'செய்திகள்' : 'Messages'}</h1>
        <p className="text-gray-600">{language === 'ta' ? 'உங்கள் சந்திப்புகள்' : 'Your conversations'}</p>
      </div>
      
      <Card padding="lg">
        <p className="text-gray-600 text-center">{language === 'ta' ? 'இன்னும் செய்திகள் இல்லை' : 'No messages yet'}</p>
      </Card>
    </div>
  );
};

export default Messages;
