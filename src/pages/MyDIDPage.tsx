import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ShieldCheckIcon, DownloadIcon, UploadIcon, TrophyIcon, CalendarIcon, ActivityIcon, ImageIcon, FileTextIcon, ExternalLinkIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

type Pet = {
  name: string;
  breed: string;
  age: string;
};

export function MyDIDPage() {

  const navigate = useNavigate();
    const location = useLocation();
  
    const petFromState = (location.state as { pet?: Pet } | null)?.pet;
  
    const pet: Pet = petFromState ?? {
      name: '초코',
      breed: '푸들',
      age: '2',
    };
  
  const [activeTab, setActiveTab] = useState<'records' | 'sbt'>('records');
  const healthRecords = [{
    id: 1,
    date: '2024-01-15',
    type: 'behavior',
    title: '오늘의 행동 평가',
    result: '정상',
    confidence: 92,
    hasImage: true
  }, {
    id: 2,
    date: '2024-01-14',
    type: 'health',
    title: '건강 체크리스트',
    result: '양호',
    confidence: 88,
    hasImage: false
  }, {
    id: 3,
    date: '2024-01-13',
    type: 'vaccination',
    title: '예방접종 기록',
    result: '완료',
    confidence: 100,
    hasImage: true
  }];
  const sbtBadges = [{
    id: 1,
    name: '🐾 Verified Owner',
    description: 'DID 인증 완료',
    earnedAt: '2024-01-01',
    rarity: 'common'
  }, {
    id: 2,
    name: '⭐ Lv.2 Trusted Contributor',
    description: '신뢰도 레벨 2 달성',
    earnedAt: '2024-01-10',
    rarity: 'rare'
  }, {
    id: 3,
    name: '🔥 7-Day Streak',
    description: '7일 연속 참여',
    earnedAt: '2024-01-13',
    rarity: 'epic'
  }];
  const rarityColors = {
    common: 'bg-gray-100 border-gray-300 text-gray-700',
    rare: 'bg-blue-100 border-blue-300 text-blue-700',
    epic: 'bg-purple-100 border-purple-300 text-purple-700',
    legendary: 'bg-orange-100 border-orange-300 text-orange-700'
  };
  return <Layout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="pt-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My DID</h1>
          <p className="text-gray-600">내 데이터와 신원 정보를 관리하세요</p>
        </div>

        {/* DID Card */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }}>
          <Card className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white border-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-teal-100 text-sm mb-1">
                  Decentralized Identity
                </p>
                <p className="text-2xl font-bold mb-2">{pet.name}의 보호자</p>
                <p className="text-sm font-mono bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg inline-block">
                  did:petchain:0x7a3b...9f2c
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <ShieldCheckIcon size={32} />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-white/20">
              <div className="flex-1 text-center">
                <p className="text-teal-100 text-sm mb-1">레벨</p>
                <p className="text-xl font-bold">Lv.2</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-teal-100 text-sm mb-1">기록</p>
                <p className="text-xl font-bold">24건</p>
              </div>
              <div className="flex-1 text-center">
                <p className="text-teal-100 text-sm mb-1">SBT</p>
                <p className="text-xl font-bold">3개</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Data Ownership Notice */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }}>
          <Card className="bg-orange-50 border-2 border-orange-200">
            <div className="flex items-start gap-3">
              <TrophyIcon size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900 mb-1">
                  데이터 소유권
                </p>
                <p className="text-sm text-orange-700">
                  모든 건강 기록은 블록체인에 암호화되어 저장되며, 오직 당신만이
                  접근하고 관리할 수 있습니다.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Export/Import Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" className="flex items-center justify-center gap-2">
            <DownloadIcon size={18} />
            데이터 내보내기
          </Button>
          <Button variant="ghost" className="flex items-center justify-center gap-2">
            <UploadIcon size={18} />
            데이터 가져오기
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          <button onClick={() => setActiveTab('records')} className={`flex-1 py-3 font-semibold transition-colors relative ${activeTab === 'records' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}>
            건강 기록
            {activeTab === 'records' && <motion.div layoutId="didTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />}
          </button>
          <button onClick={() => setActiveTab('sbt')} className={`flex-1 py-3 font-semibold transition-colors relative ${activeTab === 'sbt' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}>
            SBT 배지
            {activeTab === 'sbt' && <motion.div layoutId="didTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />}
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'records' && <motion.div key="records" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: 20
        }} className="space-y-3">
              {healthRecords.map((record, index) => <motion.div key={record.id} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.05
          }}>
                  <Card hover>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${record.type === 'behavior' ? 'bg-teal-100' : record.type === 'health' ? 'bg-blue-100' : 'bg-green-100'}`}>
                          {record.type === 'behavior' && <ActivityIcon size={20} className="text-teal-600" />}
                          {record.type === 'health' && <FileTextIcon size={20} className="text-blue-600" />}
                          {record.type === 'vaccination' && <ShieldCheckIcon size={20} className="text-green-600" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {record.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <CalendarIcon size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {record.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      {record.hasImage && <ImageIcon size={18} className="text-gray-400" />}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant={record.result === '정상' || record.result === '양호' || record.result === '완료' ? 'success' : 'warning'}>
                        {record.result}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        신뢰도 {record.confidence}%
                      </span>
                    </div>
                  </Card>
                </motion.div>)}

              <Card className="bg-gray-50 border-2 border-dashed border-gray-300 text-center py-8">
                <p className="text-gray-600 mb-3">
                  더 많은 기록을 남기고 포인트를 받으세요
                </p>
                <Button variant="secondary" size="sm">
                  퀘스트 시작하기
                </Button>
              </Card>
            </motion.div>}

          {activeTab === 'sbt' && <motion.div key="sbt" initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} className="space-y-4">
              <Card>
                <h3 className="font-bold text-gray-900 mb-2">
                  Soul Bound Token (SBT)
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  양도 불가능한 업적 배지입니다. 신뢰도와 기여도를 증명하는
                  영구적인 기록입니다.
                </p>
              </Card>

              {sbtBadges.map((badge, index) => <motion.div key={badge.id} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }}>
                  <Card className={`border-2 ${rarityColors[badge.rarity as keyof typeof rarityColors]}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-xl font-bold mb-1">{badge.name}</h4>
                        <p className="text-sm mb-2">{badge.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <CalendarIcon size={12} />
                          <span>획득일: {badge.earnedAt}</span>
                        </div>
                      </div>
                      <Badge variant="default" size="sm">
                        {badge.rarity.toUpperCase()}
                      </Badge>
                    </div>
                    <button className="text-sm font-semibold flex items-center gap-1 hover:underline">
                      블록체인에서 보기 <ExternalLinkIcon size={14} />
                    </button>
                  </Card>
                </motion.div>)}

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrophyIcon size={32} className="text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    더 많은 배지 획득하기
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    활동을 계속하고 레벨을 올려 특별한 배지를 받으세요
                  </p>
                  <Button variant="secondary" size="sm">
                    다음 배지 보기
                  </Button>
                </div>
              </Card>
            </motion.div>}
        </AnimatePresence>

        {/* Future Integration Notice */}
        <Card className="bg-teal-50 border-2 border-teal-200">
          <div className="flex items-start gap-3">
            <ExternalLinkIcon size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-teal-900 mb-1">미래 연동 준비</p>
              <p className="text-sm text-teal-700">
                곧 동물병원 및 펫 보험사와 데이터를 안전하게 공유할 수 있습니다.
                모든 공유는 당신의 승인이 필요합니다.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>;
}