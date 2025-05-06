import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  Download, 
  Bookmark, 
  User, 
  Calendar, 
  DollarSign, 
  Home, 
  MapPin,
  Clock,
  FileText,
  ClipboardList
} from 'lucide-react';

interface PropertyDetailProps {
  propertyId: string;
  onOwnerSelect: (ownerId: string) => void;
  onBack: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ 
  propertyId, 
  onOwnerSelect,
  onBack
}) => {
  const { properties, owners } = useAppContext();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get property data
  const property = properties.find(p => p.id === propertyId);
  
  // Get owner data
  const owner = owners.find(o => o.id === property?.ownerId);
  
  if (!property || !owner) {
    return <div>Property not found</div>;
  }
  
  const handlePrevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? property.imageUrls.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex(prev => 
      prev === property.imageUrls.length - 1 ? 0 : prev + 1
    );
  };
  
  return (
    <div className="h-[calc(100vh-8rem)] overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className={`
            flex items-center space-x-2 py-1 px-3 rounded-lg
            ${theme === 'dark' 
              ? 'hover:bg-indigo-900/30 text-gray-300' 
              : 'hover:bg-gray-100 text-gray-700'}
          `}
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>
        
        <div className="flex space-x-2">
          <button className={`
            p-2 rounded-lg
            ${theme === 'dark' 
              ? 'hover:bg-indigo-900/30 text-gray-300' 
              : 'hover:bg-gray-100 text-gray-700'}
          `}>
            <Bookmark size={18} />
          </button>
          <button className={`
            p-2 rounded-lg
            ${theme === 'dark' 
              ? 'hover:bg-indigo-900/30 text-gray-300' 
              : 'hover:bg-gray-100 text-gray-700'}
          `}>
            <Share2 size={18} />
          </button>
          <button className={`
            p-2 rounded-lg
            ${theme === 'dark' 
              ? 'hover:bg-indigo-900/30 text-gray-300' 
              : 'hover:bg-gray-100 text-gray-700'}
          `}>
            <Download size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Property Image Carousel */}
          <div className="relative rounded-xl overflow-hidden mb-6 aspect-video">
            <img 
              src={property.imageUrls[currentImageIndex]} 
              alt={property.address.street}
              className="w-full h-full object-cover"
            />
            
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button 
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronRight size={20} />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.imageUrls.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`
                    w-2 h-2 rounded-full 
                    ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}
                  `}
                ></button>
              ))}
            </div>
          </div>
          
          {/* Property Details */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{property.address.street}</h1>
            <p className="text-gray-400 mb-4">
              {property.address.city}, {property.address.state} {property.address.zipCode}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className={`
                p-4 rounded-xl
                ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
              `}>
                <div className="flex items-center mb-2">
                  <DollarSign size={18} className="mr-2 text-[#00E6FF]" />
                  <span className="text-sm text-gray-400">Value</span>
                </div>
                <p className="text-lg font-semibold">${property.value.toLocaleString()}</p>
              </div>
              
              <div className={`
                p-4 rounded-xl
                ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
              `}>
                <div className="flex items-center mb-2">
                  <Home size={18} className="mr-2 text-[#00E6FF]" />
                  <span className="text-sm text-gray-400">Size</span>
                </div>
                <p className="text-lg font-semibold">{property.size.area} {property.size.unit}</p>
              </div>
              
              <div className={`
                p-4 rounded-xl
                ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
              `}>
                <div className="flex items-center mb-2">
                  <Calendar size={18} className="mr-2 text-[#00E6FF]" />
                  <span className="text-sm text-gray-400">Year Built</span>
                </div>
                <p className="text-lg font-semibold">{property.yearBuilt}</p>
              </div>
              
              <div className={`
                p-4 rounded-xl
                ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
              `}>
                <div className="flex items-center mb-2">
                  <FileText size={18} className="mr-2 text-[#00E6FF]" />
                  <span className="text-sm text-gray-400">Type</span>
                </div>
                <p className="text-lg font-semibold capitalize">{property.type.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
          
          {/* Tabs Navigation */}
          <div className="border-b mb-6">
            <nav className="flex space-x-8" aria-label="Tabs">
              {['overview', 'history', 'transactions', 'tax'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    py-2 px-1 border-b-2 font-medium text-sm 
                    ${activeTab === tab
                      ? theme === 'dark'
                        ? 'border-[#00E6FF] text-[#00E6FF]'
                        : 'border-indigo-600 text-indigo-600'
                      : theme === 'dark'
                      ? 'border-transparent text-gray-400 hover:text-gray-300'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                    }
                  `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="mb-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-3">Property Overview</h2>
                  <p className="text-gray-400">
                    This {property.type.replace('_', ' ')} property built in {property.yearBuilt} offers {property.size.area} {property.size.unit} of space. 
                    Located in {property.address.city}, {property.address.state}, the property is currently valued at ${property.value.toLocaleString()}.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-3">Location</h2>
                  <div className={`
                    h-60 rounded-xl overflow-hidden relative
                    ${theme === 'dark' ? 'bg-[#0A1128]' : 'bg-gray-100'}
                  `}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p>Map would render here</p>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <button className={`
                        px-3 py-2 rounded-lg font-medium text-sm
                        ${theme === 'dark' 
                          ? 'bg-[#00E6FF] text-[#0A1128]' 
                          : 'bg-indigo-600 text-white'}
                      `}>
                        View Full Map
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'history' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Ownership History</h2>
                <div className="space-y-6">
                  {property.ownershipHistory.map((record, index) => (
                    <div 
                      key={index}
                      className={`
                        p-4 rounded-xl border-l-4 
                        ${theme === 'dark' 
                          ? 'bg-[#0A1128]/50 border-[#00E6FF]' 
                          : 'bg-gray-50 border-indigo-600'}
                      `}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">
                            {record.ownerId === owner.id ? owner.name : 'Previous Owner'}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {new Date(record.startDate).toLocaleDateString()} - 
                            {record.endDate ? new Date(record.endDate).toLocaleDateString() : 'Present'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${record.purchasePrice.toLocaleString()}</p>
                          <p className="text-xs text-gray-400 mt-1">Purchase Price</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'transactions' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
                <div className={`
                  overflow-hidden rounded-xl
                  ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-white border border-gray-200'}
                `}>
                  <table className="min-w-full divide-y divide-gray-800/20">
                    <thead className={theme === 'dark' ? 'bg-[#171b29]' : 'bg-gray-50'}>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/20">
                      {property.transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {new Date(transaction.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                            {transaction.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            ${transaction.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {transaction.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'tax' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Tax Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className={`
                    p-4 rounded-xl
                    ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
                  `}>
                    <p className="text-sm text-gray-400 mb-1">Tax Assessment</p>
                    <p className="text-lg font-semibold">${property.taxAssessment.toLocaleString()}</p>
                  </div>
                  
                  <div className={`
                    p-4 rounded-xl
                    ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
                  `}>
                    <p className="text-sm text-gray-400 mb-1">Annual Tax (Est.)</p>
                    <p className="text-lg font-semibold">${(property.taxAssessment * 0.015).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className={`
                  p-4 rounded-xl
                  ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
                `}>
                  <h3 className="font-medium mb-2">Tax History</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <p className="text-sm">2024 Assessment</p>
                      <p className="text-sm font-medium">${property.taxAssessment.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">2023 Assessment</p>
                      <p className="text-sm font-medium">${(property.taxAssessment * 0.95).toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">2022 Assessment</p>
                      <p className="text-sm font-medium">${(property.taxAssessment * 0.9).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar with Owner Information */}
        <div className="lg:col-span-1">
          <div className={`
            p-4 rounded-xl mb-6
            ${theme === 'dark' 
              ? 'bg-[#171b29]/70 border border-indigo-900/30' 
              : 'bg-white border border-gray-100 shadow-sm'}
          `}>
            <div className="flex items-center mb-4">
              <div className={`
                p-2 rounded-full mr-3
                ${theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-50'}
              `}>
                <User size={24} className={theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'} />
              </div>
              <div>
                <h2 className="font-semibold">Owner Information</h2>
                <p className="text-sm text-gray-400">Current property owner</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-lg">{owner.name}</h3>
              <p className="text-sm text-gray-400 capitalize">{owner.type}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <p className="text-xs text-gray-400">Net Worth</p>
                <p className="font-medium">${(owner.netWorth.estimate / 1000000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Confidence</p>
                <p className="font-medium">{owner.netWorth.confidenceScore}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Properties</p>
                <p className="font-medium">{owner.properties.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Type</p>
                <p className="font-medium capitalize">{owner.type}</p>
              </div>
            </div>
            
            <button
              onClick={() => onOwnerSelect(owner.id)}
              className={`
                w-full py-2 rounded-lg transition-colors duration-200
                ${theme === 'dark' 
                  ? 'bg-[#5643CC] hover:bg-[#6753dc] text-white' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'}
              `}
            >
              View Full Profile
            </button>
          </div>
          
          <div className={`
            p-4 rounded-xl mb-6
            ${theme === 'dark' 
              ? 'bg-[#171b29]/70 border border-indigo-900/30' 
              : 'bg-white border border-gray-100 shadow-sm'}
          `}>
            <div className="flex items-center mb-4">
              <div className={`
                p-2 rounded-full mr-3
                ${theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-50'}
              `}>
                <Clock size={20} className={theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'} />
              </div>
              <div>
                <h2 className="font-semibold">Last Sold</h2>
                <p className="text-sm text-gray-400">Transaction history</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="font-medium">
                    {new Date(property.lastSold.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Price</p>
                  <p className="font-medium">${property.lastSold.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className={`
              p-3 rounded-lg
              ${theme === 'dark' ? 'bg-[#0A1128]/50' : 'bg-gray-50'}
            `}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <DollarSign size={16} className="mr-1 text-gray-400" />
                  <span className="text-sm">Price Change</span>
                </div>
                <div className="text-[#00E6FF] font-medium">
                  +{(((property.value - property.lastSold.price) / property.lastSold.price) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
          
          <div className={`
            p-4 rounded-xl
            ${theme === 'dark' 
              ? 'bg-[#171b29]/70 border border-indigo-900/30' 
              : 'bg-white border border-gray-100 shadow-sm'}
          `}>
            <div className="flex items-center mb-4">
              <div className={`
                p-2 rounded-full mr-3
                ${theme === 'dark' ? 'bg-indigo-900/30' : 'bg-indigo-50'}
              `}>
                <ClipboardList size={20} className={theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'} />
              </div>
              <div>
                <h2 className="font-semibold">Export Options</h2>
                <p className="text-sm text-gray-400">Download property data</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <button className={`
                w-full py-2 px-3 rounded-lg flex items-center justify-center
                ${theme === 'dark' 
                  ? 'bg-[#0A1128]/50 hover:bg-[#0A1128]/70 border border-gray-700' 
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}
              `}>
                <Download size={16} className="mr-2" />
                Export as PDF
              </button>
              
              <button className={`
                w-full py-2 px-3 rounded-lg flex items-center justify-center
                ${theme === 'dark' 
                  ? 'bg-[#0A1128]/50 hover:bg-[#0A1128]/70 border border-gray-700' 
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}
              `}>
                <Download size={16} className="mr-2" />
                Export as CSV
              </button>
              
              <button className={`
                w-full py-2 px-3 rounded-lg flex items-center justify-center
                ${theme === 'dark' 
                  ? 'bg-[#0A1128]/50 hover:bg-[#0A1128]/70 border border-gray-700' 
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}
              `}>
                <Share2 size={16} className="mr-2" />
                Share Property
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;