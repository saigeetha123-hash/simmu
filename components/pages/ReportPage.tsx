
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface ReportPageProps {
  onReport: (photo: File, notes: string, location: string) => void;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V8.25c0-1.12.93-2.02 2.08-1.92l1.32.13c.72.07 1.45.36 2.05.81l.6.45c.48.36 1.06.63 1.68.79l1.39.37c.83.22 1.69.22 2.52 0l1.39-.37c.62-.16 1.2-.43 1.68-.79l.6-.45c.6-.45 1.33-.74 2.05-.81l1.32-.13c1.15-.09 2.08.8 2.08 1.92v9c0 1.12-.93 2.02-2.08 1.92l-1.32-.13a2.91 2.91 0 00-2.05.81l-.6.45c-.48.36-1.06.63-1.68.79l-1.39.37c-.83.22-1.69.22-2.52 0l-1.39-.37a2.91 2.91 0 00-1.68-.79l-.6-.45a2.91 2.91 0 00-2.05-.81l-1.32-.13C3.93 19.27 3 18.37 3 17.25z" />
    </svg>
);


export const ReportPage: React.FC<ReportPageProps> = ({ onReport }) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('Detecting location...');

  React.useEffect(() => {
    // Simulate auto-location detection
    setTimeout(() => {
      setLocation('Near City Hall, Downtown');
    }, 1500);
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (photo && notes && location !== 'Detecting location...') {
      onReport(photo, notes, location);
    } else {
      alert('Please fill all fields and upload a photo.');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <Card className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Report a Dog in Need</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">1. Upload Photo</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {preview ? (
                  <img src={preview} alt="Preview" className="mx-auto h-48 w-auto rounded-md" />
                ) : (
                  <UploadIcon/>
                )}
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handlePhotoChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">2. Add Notes</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
              placeholder="e.g., '3 puppies, very weak'"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700">3. Location</label>
             <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm"
                value={location}
                readOnly
             />
          </div>

          <Button type="submit" className="w-full py-3" disabled={!photo || !notes || location === 'Detecting location...'}>
            Submit Report
          </Button>
        </form>
      </Card>
    </div>
  );
};
