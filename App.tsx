
import React, { useState, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { ReportPage } from './components/pages/ReportPage';
import { VolunteerDashboard } from './components/pages/VolunteerDashboard';
import { RestaurantDashboard } from './components/pages/RestaurantDashboard';
import { LeaderboardPage } from './components/pages/LeaderboardPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { Modal } from './components/ui/Modal';
import { Button } from './components/ui/Button';
import { Spinner } from './components/ui/Spinner';
import { generateShareablePost } from './services/geminiService';

import { Page, Role, User, DogReport, FoodDonation } from './types';
import { INITIAL_USERS, INITIAL_DOG_REPORTS, INITIAL_FOOD_DONATIONS, POINTS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [dogReports, setDogReports] = useState<DogReport[]>(INITIAL_DOG_REPORTS);
  const [foodDonations, setFoodDonations] = useState<FoodDonation[]>(INITIAL_FOOD_DONATIONS);

  const [isProofModalOpen, setProofModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [shareablePost, setShareablePost] = useState('');
  const [isGeneratingPost, setIsGeneratingPost] = useState(false);


  const login = (role: Role) => {
    if (role === Role.USER) {
      setCurrentUser(users.find(u => u.id === 2)!); // Login as Maria
    } else if (role === Role.RESTAURANT) {
      setCurrentUser(users.find(u => u.id === 4)!); // Login as Pizza Palace
    }
    setCurrentPage(Page.HOME);
  };
  const logout = () => setCurrentUser(null);

  const updateUserScore = useCallback(<T,>(userId: number, points: number, field: keyof T) => {
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, civilScore: u.civilScore + points, [field]: (u[field as keyof User] as number) + 1 } : u
    ));
  }, []);

  const handleReport = (photo: File, notes: string, location: string) => {
    if (!currentUser) return;

    const newReport: DogReport = {
      id: dogReports.length + 1,
      imageUrl: URL.createObjectURL(photo),
      location: { lat: 0, lng: 0, address: location },
      notes,
      status: 'reported',
      reporterId: currentUser.id,
      timestamp: new Date(),
    };
    setDogReports(prev => [newReport, ...prev]);
    updateUserScore(currentUser.id, POINTS.REPORT, 'dogsReported');
    alert('Report submitted! You have earned ' + POINTS.REPORT + ' points.');
    setCurrentPage(Page.VOLUNTEER_DASHBOARD);
  };

  const handleAcceptMission = (reportId: number) => {
    if (!currentUser) return;
    setDogReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'claimed', volunteerId: currentUser.id } : r));
  };
  
  const handleOpenProofModal = (reportId: number) => {
      setSelectedReportId(reportId);
      setProofModalOpen(true);
  };

  const handleProofSubmit = async () => {
    if (!selectedReportId || !currentUser) return;

    setDogReports(prev => prev.map(r => r.id === selectedReportId ? { ...r, status: 'fed', proofImageUrl: 'https://picsum.photos/seed/proof-new/400/300' } : r));
    updateUserScore(currentUser.id, POINTS.VOLUNTEER, 'dogsFed');
    
    setProofModalOpen(false);
    
    setIsGeneratingPost(true);
    setShareModalOpen(true);
    const post = await generateShareablePost(currentUser.name);
    setShareablePost(post);
    setIsGeneratingPost(false);
  };

  const handleAddDonation = (description: string, pickupTime: string) => {
      if(!currentUser) return;
      const newDonation: FoodDonation = {
        id: foodDonations.length + 1,
        restaurantId: currentUser.id,
        description,
        pickupTime,
        status: 'available',
      };
      setFoodDonations(prev => [newDonation, ...prev]);
      updateUserScore(currentUser.id, POINTS.RESTAURANT_DONATE, 'foodDonated');
      alert('Donation posted! You earned ' + POINTS.RESTAURANT_DONATE + ' points.');
  };
  
  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <HomePage setCurrentPage={setCurrentPage} stats={{dogsFed: 1254, volunteersActive: 320, foodSavedKg: 540}} />;
      case Page.REPORT_DOG:
        return <ReportPage onReport={handleReport} />;
      case Page.VOLUNTEER_DASHBOARD:
        return <VolunteerDashboard reports={dogReports} users={users} onAcceptMission={handleAcceptMission} onUploadProof={handleOpenProofModal} currentUser={currentUser} />;
      case Page.RESTAURANT_DASHBOARD:
        return <RestaurantDashboard donations={foodDonations} onAddDonation={handleAddDonation} currentUser={currentUser} />;
      case Page.LEADERBOARD:
        return <LeaderboardPage users={users} />;
      case Page.PROFILE:
        return <ProfilePage currentUser={currentUser} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} stats={{dogsFed: 1254, volunteersActive: 320, foodSavedKg: 540}} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header setCurrentPage={setCurrentPage} currentUser={currentUser} logout={logout} loginAs={login} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      
      <Modal isOpen={isProofModalOpen} onClose={() => setProofModalOpen(false)} title="Upload Proof of Feeding">
          <div className="space-y-4">
            <p>Please upload a photo of the dog after you've fed it. This verifies the mission and awards you points.</p>
            <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"/>
            <Button onClick={handleProofSubmit} className="w-full">Submit Proof</Button>
          </div>
      </Modal>

       <Modal isOpen={isShareModalOpen} onClose={() => setShareModalOpen(false)} title="Mission Complete!">
          <div className="space-y-4 text-center">
            <p className="text-lg">Thank you for your kindness! You've earned {POINTS.VOLUNTEER} Civil Score points.</p>
            {isGeneratingPost ? (
                <div className="flex flex-col items-center gap-2">
                    <Spinner/>
                    <p className="text-gray-600">Generating a shareable post for you...</p>
                </div>
            ) : (
                <div className="p-4 bg-gray-100 rounded-lg italic">
                    <p>"{shareablePost}"</p>
                </div>
            )}
            <Button onClick={() => setShareModalOpen(false)} className="w-full">Close</Button>
          </div>
      </Modal>
    </div>
  );
};

export default App;
