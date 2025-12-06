import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { CoinsIcon, TrophyIcon, TrendingUpIcon, LockIcon, UnlockIcon, SparklesIcon, CalendarIcon } from 'lucide-react';
export function RewardCenterPage() {
  const [activeTab, setActiveTab] = useState<'history' | 'staking'>('history');
  const rewardHistory = [{
    id: 1,
    type: '퀘스트 완료',
    amount: 50,
    date: '2024-01-15',
    description: '오늘의 행동 평가'
  }, {
    id: 2,
    type: '검증 보상',
    amount: 30,
    date: '2024-01-14',
    description: '커뮤니티 검증 승인'
  }, {
    id: 3,
    type: '퀘스트 완료',
    amount: 40,
    date: '2024-01-14',
    description: '건강 체크리스트'
  }, {
    id: 4,
    type: '보너스',
    amount: 100,
    date: '2024-01-13',
    description: '7일 연속 참여'
  }, {
    id: 5,
    type: '퀘스트 완료',
    amount: 30,
    date: '2024-01-13',
    description: '식사 사진 업로드'
  }];
  const nextLevelRewards = [{
    level: 3,
    requirement: 2000,
    reward: '검증자 권한 해금',
    unlocked: false
  }, {
    level: 4,
    requirement: 5000,
    reward: '프리미엄 AI 분석',
    unlocked: false
  }, {
    level: 5,
    requirement: 10000,
    reward: 'DAO 투표권',
    unlocked: false
  }];
  return <Layout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="pt-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">보상 센터</h1>
          <p className="text-gray-600">포인트를 관리하고 보상을 확인하세요</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }}>
            <Card className="bg-gradient-to-br from-orange-500 to-amber-500 text-white border-0">
              <div className="flex items-center gap-3 mb-2">
                <CoinsIcon size={24} />
                <span className="text-sm opacity-90">총 포인트</span>
              </div>
              <p className="text-3xl font-bold">1,250</p>
              <p className="text-sm opacity-75 mt-1">+180 이번 주</p>
            </Card>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }}>
            <Card className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white border-0">
              <div className="flex items-center gap-3 mb-2">
                <TrophyIcon size={24} />
                <span className="text-sm opacity-90">신뢰 레벨</span>
              </div>
              <p className="text-3xl font-bold">Lv.2</p>
              <p className="text-sm opacity-75 mt-1">다음 레벨까지 750pt</p>
            </Card>
          </motion.div>
        </div>

        {/* Level Progress */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }}>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">레벨 진행도</h3>
              <Badge variant="info">Lv.2 → Lv.3</Badge>
            </div>
            <ProgressBar value={1250} max={2000} label="1,250 / 2,000 포인트" color="teal" />
            <div className="mt-4 bg-teal-50 border-2 border-teal-200 rounded-xl p-3">
              <p className="text-sm font-semibold text-teal-900 mb-1">
                🎉 Lv.3 달성 시 혜택
              </p>
              <p className="text-sm text-teal-700">
                검증자 권한이 해금되어 다른 사용자의 데이터를 검증하고 추가
                보상을 받을 수 있습니다.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          <button onClick={() => setActiveTab('history')} className={`flex-1 py-3 font-semibold transition-colors relative ${activeTab === 'history' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}>
            보상 내역
            {activeTab === 'history' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />}
          </button>
          <button onClick={() => setActiveTab('staking')} className={`flex-1 py-3 font-semibold transition-colors relative ${activeTab === 'staking' ? 'text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}>
            스테이킹
            {activeTab === 'staking' && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600" />}
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'history' && <motion.div key="history" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: 20
        }} className="space-y-3">
              {rewardHistory.map((reward, index) => <motion.div key={reward.id} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.05
          }}>
                  <Card hover>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          {reward.type === '보너스' ? <SparklesIcon size={20} className="text-orange-600" /> : reward.type === '검증 보상' ? <TrendingUpIcon size={20} className="text-orange-600" /> : <CoinsIcon size={20} className="text-orange-600" />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {reward.description}
                          </p>
                          <p className="text-sm text-gray-600">{reward.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-orange-600">
                          +{reward.amount}
                        </p>
                        <Badge variant="warning" size="sm">
                          {reward.type}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>)}
            </motion.div>}

          {activeTab === 'staking' && <motion.div key="staking" initial={{
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
                <h3 className="font-bold text-gray-900 mb-4">
                  포인트 스테이킹
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  포인트를 스테이킹하여 추가 보상을 받고 신뢰도를 높이세요
                </p>

                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-teal-700">현재 스테이킹</span>
                    <span className="text-2xl font-bold text-teal-900">
                      500 pt
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-teal-700">예상 수익 (30일)</span>
                    <span className="font-semibold text-teal-900">
                      +25 pt (5% APY)
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full">추가 스테이킹</Button>
                  <Button variant="ghost" className="w-full">
                    언스테이킹
                  </Button>
                </div>
              </Card>

              <Card>
                <h3 className="font-bold text-gray-900 mb-4">다음 레벨 보상</h3>
                <div className="space-y-3">
                  {nextLevelRewards.map(item => <div key={item.level} className={`p-4 rounded-xl border-2 ${item.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {item.unlocked ? <UnlockIcon size={18} className="text-green-600" /> : <LockIcon size={18} className="text-gray-400" />}
                          <span className="font-semibold text-gray-900">
                            Level {item.level}
                          </span>
                        </div>
                        <Badge variant={item.unlocked ? 'success' : 'default'} size="sm">
                          {item.requirement} pt
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700">{item.reward}</p>
                    </div>)}
                </div>
              </Card>
            </motion.div>}
        </AnimatePresence>
      </div>
    </Layout>;
}