import Card from '../../components/common/Card';
import { useTranslation } from '../../context/TranslationContext';

const SavedProfiles = () => {
  const { language } = useTranslation();
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{language === 'ta' ? 'சேமிக்கப்பட்ட சுயவிவரங்கள்' : 'Saved Profiles'}</h1>
        <p className="text-gray-600">{language === 'ta' ? 'நீங்கள் பின்னர் பார்க்க சேமித்த சுயவிவரங்கள்' : "Profiles you've saved for later"}</p>
      </div>
      
      <Card padding="lg">
        <p className="text-gray-600 text-center">{language === 'ta' ? 'இன்னும் சேமிக்கப்பட்ட சுயவிவரங்கள் இல்லை' : 'No saved profiles yet'}</p>
      </Card>
    </div>
  );
};

export default SavedProfiles;
