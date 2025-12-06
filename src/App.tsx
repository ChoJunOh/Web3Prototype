import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingPage } from './pages/OnboardingPage';
import { HomePage } from './pages/HomePage';
import { TaskPage } from './pages/TaskPage';
import { SubmissionResultPage } from './pages/SubmissionResultPage';
import { AggregatorResultPage } from './pages/AggregatorResultPage';
import { RewardCenterPage } from './pages/RewardCenterPage';
import { MyDIDPage } from './pages/MyDIDPage';
import { ValidatorPage } from './pages/ValidatorPage';
export function App() {
  return <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/submission-result" element={<SubmissionResultPage />} />
        <Route path="/aggregator-result" element={<AggregatorResultPage />} />
        <Route path="/rewards" element={<RewardCenterPage />} />
        <Route path="/did" element={<MyDIDPage />} />
        <Route path="/validator" element={<ValidatorPage />} />
      </Routes>
    </BrowserRouter>;
}