import React, { Children } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { CoinsIcon, TrophyIcon, CalendarIcon, ActivityIcon, AlertCircleIcon, ChevronRightIcon, SparklesIcon } from 'lucide-react';

type Pet = {
  name: string;
  breed: string;
  age: string;
};

export function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const petFromState = (location.state as { pet?: Pet } | null)?.pet;

  const pet: Pet = petFromState ?? {
    name: '초코',
    breed: '푸들',
    age: '2',
  };

  const tasks = [{
    id: 1,
    title: '오늘의 행동 평가',
    type: 'survey',
    reward: 50,
    urgent: true
  }, {
    id: 2,
    title: '식사 사진 업로드',
    type: 'photo',
    reward: 30,
    urgent: false
  }, {
    id: 3,
    title: '건강 체크리스트',
    type: 'health',
    reward: 40,
    urgent: false
  }];
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0
    }
  };
  return <Layout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="flex items-center justify-between pt-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">안녕하세요! 👋</h1>
            <p className="text-gray-600">{pet.name}의 건강을 관리해보세요</p>
          </div>
        </motion.div>

        {/* Pet Status Card */}
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: 0.1
      }}>
          <Card className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white border-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{pet.name}</h3>
                <p className="text-teal-100">{pet.breed} • {pet.age}살</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">🐕</span>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <p className="text-teal-100 text-sm mb-1">건강 상태</p>
                <p className="text-lg font-bold">양호</p>
              </div>
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <p className="text-teal-100 text-sm mb-1">다음 접종</p>
                <p className="text-lg font-bold">3주 후</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Points & Trust Level */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="grid grid-cols-2 gap-4">
          <Card hover onClick={() => navigate('/rewards')}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <CoinsIcon size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">포인트</p>
                <p className="text-2xl font-bold text-gray-900">1,250</p>
              </div>
            </div>
            <Badge variant="warning" size="sm">
              +50 오늘
            </Badge>
          </Card>

          <Card hover onClick={() => navigate('/did')}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                <TrophyIcon size={20} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">신뢰도</p>
                <p className="text-2xl font-bold text-gray-900">Lv.2</p>
              </div>
            </div>
            <ProgressBar value={65} max={100} showPercentage={false} color="teal" />
          </Card>
        </motion.div>

        {/* Urgent Alert */}
        <motion.div initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: 0.3
      }}>
          <Card className="bg-orange-50 border-2 border-orange-200">
            <div className="flex items-start gap-3">
              <AlertCircleIcon size={24} className="text-orange-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-orange-900 mb-1">
                  오늘의 행동 평가 필요
                </h4>
                <p className="text-sm text-orange-700 mb-3">
                  {pet.name}의 오늘 행동을 평가하고 50 포인트를 받으세요
                </p>
                <button onClick={() => navigate('/tasks', {state: {pet}})} className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1">
                  지금 평가하기 <ChevronRightIcon size={16} />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Today's Tasks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">오늘 할 일</h2>
            <button onClick={() => navigate('/tasks')} className="text-sm text-teal-600 font-semibold hover:text-teal-700">
              전체보기
            </button>
          </div>
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
            {tasks.map(task => <motion.div key={task.id} variants={item}>
                <Card hover onClick={() => navigate('/tasks', {state: {pet}})}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${task.urgent ? 'bg-orange-100' : 'bg-teal-100'}`}>
                        {task.type === 'survey' && <ActivityIcon size={20} className={task.urgent ? 'text-orange-600' : 'text-teal-600'} />}
                        {task.type === 'photo' && <SparklesIcon size={20} className="text-teal-600" />}
                        {task.type === 'health' && <CalendarIcon size={20} className="text-teal-600" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {task.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          +{task.reward} 포인트
                        </p>
                      </div>
                    </div>
                    <ChevronRightIcon size={20} className="text-gray-400" />
                  </div>
                </Card>
              </motion.div>)}
          </motion.div>
        </div>

        {/* Quick Stats */}
        <Card>
          <h3 className="font-semibold text-gray-900 mb-4">이번 주 활동</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">완료한 퀘스트</span>
                <span className="font-semibold text-gray-900">12/15</span>
              </div>
              <ProgressBar value={80} showPercentage={false} color="teal" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">획득한 포인트</span>
                <span className="font-semibold text-gray-900">450/500</span>
              </div>
              <ProgressBar value={90} showPercentage={false} color="orange" />
            </div>
          </div>
        </Card>
      </div>
    </Layout>;
}