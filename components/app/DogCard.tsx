
import React from 'react';
import { DogReport, User } from '../../types';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface DogCardProps {
  report: DogReport;
  reporter?: User;
  volunteer?: User;
  onAccept: (reportId: number) => void;
  onUploadProof: (reportId: number) => void;
  currentUser: User | null;
}

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline-block mr-1 text-gray-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);


export const DogCard: React.FC<DogCardProps> = ({ report, reporter, volunteer, onAccept, onUploadProof, currentUser }) => {
    const timeAgo = (date: Date) => {
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    const StatusBadge: React.FC<{ status: DogReport['status'] }> = ({ status }) => {
        const styles = {
            reported: 'bg-blue-100 text-blue-800',
            claimed: 'bg-yellow-100 text-yellow-800',
            fed: 'bg-green-100 text-green-800'
        };
        return <span className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full ${styles[status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
    }

    return (
        <Card className="flex flex-col relative transform transition-transform hover:scale-105">
            <img src={report.imageUrl} alt="Reported dog" className="w-full h-48 object-cover rounded-lg" />
            <StatusBadge status={report.status} />
            <div className="pt-4 flex-grow">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                    <LocationIcon />
                    <span>{report.location.address}</span>
                </div>
                <p className="text-gray-700 italic">"{report.notes}"</p>
                <p className="text-xs text-gray-500 mt-2">Reported by {reporter?.name || 'Unknown'} &bull; {timeAgo(report.timestamp)}</p>
                {report.status === 'claimed' && volunteer && <p className="text-xs text-yellow-600 font-semibold mt-1">Claimed by {volunteer.id === currentUser?.id ? 'you' : volunteer.name}</p>}
                {report.status === 'fed' && volunteer && <p className="text-xs text-green-600 font-semibold mt-1">Fed by {volunteer.name}</p>}

            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
                {report.status === 'reported' && (
                    <Button onClick={() => onAccept(report.id)} className="w-full">Accept Mission</Button>
                )}
                {report.status === 'claimed' && report.volunteerId === currentUser?.id && (
                     <Button onClick={() => onUploadProof(report.id)} variant="secondary" className="w-full">Upload Proof</Button>
                )}
                {report.status === 'fed' && (
                    <div className="text-center font-bold text-green-600">Mission Complete!</div>
                )}
            </div>
        </Card>
    );
};
