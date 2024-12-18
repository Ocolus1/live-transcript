import React from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';
import { UploadedImage } from '../services/image/types';

interface ImageAnalysisModalProps {
  image: UploadedImage;
  onClose: () => void;
}

const ImageAnalysisModal: React.FC<ImageAnalysisModalProps> = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">Image Analysis</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div>
            <img
              src={image.url}
              alt={image.name}
              className="w-full rounded-lg"
            />
          </div>
          
          <div className="space-y-4">
            {image.analysis && (
              <>
                <div>
                  <h4 className="font-semibold mb-2">Detected UI Elements</h4>
                  <div className="space-y-2">
                    {image.analysis.elements.map((element, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="font-medium">{element.description}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Type: {element.type}, Location: {element.location}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Compliance Issues</h4>
                  <div className="space-y-2">
                    {image.analysis.compliance.map((issue, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className={`w-5 h-5 ${
                            issue.severity === 'high' ? 'text-red-500' :
                            issue.severity === 'medium' ? 'text-yellow-500' :
                            'text-green-500'
                          }`} />
                          <span className="font-medium">{issue.element}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {issue.recommendation}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Standard: {issue.standard}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysisModal;