import React, { useState } from 'react';
import { Upload, File, CheckCircle } from 'lucide-react';

interface ResumeUploaderProps {
  onUpload: (file: File) => Promise<void>;
  currentResume?: {
    fileName: string;
    uploadDate: string;
  };
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onUpload, currentResume }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };
  
  const handleFileUpload = async (file: File) => {
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or Word document');
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }
    
    setError(null);
    setIsUploading(true);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);
    
    try {
      await onUpload(file);
      setUploadProgress(100);
      
      // Reset after completion
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
    } catch (err) {
      setError('Failed to upload resume. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    } finally {
      clearInterval(progressInterval);
    }
  };
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {currentResume ? (
        <div className="mb-6">
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="bg-blue-100 rounded-md p-2">
              <File className="h-6 w-6 text-blue-700" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{currentResume.fileName}</h3>
              <p className="text-sm text-gray-500">Uploaded on {formatDate(currentResume.uploadDate)}</p>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-1" />
              <span className="text-green-700 text-sm">Active</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Your resume is being used to match you with relevant job opportunities.
          </p>
        </div>
      ) : null}
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
        } transition-colors duration-150 cursor-pointer`}
      >
        {isUploading ? (
          <div className="py-4">
            <div className="mb-2">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-200 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">Uploading... {uploadProgress}%</p>
          </div>
        ) : (
          <>
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-700 font-medium">
              {currentResume ? 'Upload a new resume' : 'Upload your resume'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Supports PDF, DOCX (Max 5MB)
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-600">
          <strong>Tip:</strong> Keep your resume up-to-date to receive the most relevant job recommendations.
        </p>
      </div>
    </div>
  );
};

export default ResumeUploader;