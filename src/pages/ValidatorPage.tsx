import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ShieldCheckIcon, ClockIcon, CheckCircle2Icon, XCircleIcon, ImageIcon, AlertCircleIcon, TrendingUpIcon } from 'lucide-react';
export function ValidatorPage() {
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [reviewReason, setReviewReason] = useState('');
  const pendingTasks = [{
    id: 1,
    petName: '봉구',
    taskType: '행동 평가',
    submittedAt: '2024-01-15 14:30',
    responses: {
      식욕: '매우 좋음',
      배변: '정상',
      활동량: '매우 활발'
    },
    aiAnalysis: {
      result: '정상',
      confidence: 92
    },
    hasImage: true
  }, {
    id: 2,
    petName: '몽이',
    taskType: '건강 체크',
    submittedAt: '2024-01-15 13:15',
    responses: {
      식욕: '식욕 없음',
      배변: '설사',
      활동량: '무기력함'
    },
    aiAnalysis: {
      result: '주의 필요',
      confidence: 78
    },
    hasImage: false
  }];
  const handleApprove = () => {
    // Handle approval logic
    setSelectedTask(null);
  };
  const handleReject = () => {
    if (!reviewReason.trim()) {
      alert('반려 사유를 입력해주세요');
      return;
    }
    // Handle rejection logic
    setSelectedTask(null);
    setReviewReason('');
  };
  return <Layout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="pt-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheckIcon size={28} className="text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              검증자 대시보드
            </h1>
          </div>
          <p className="text-gray-600">제출된 데이터를 검토하고 검증하세요</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center">
            <ClockIcon size={20} className="text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {pendingTasks.length}
            </p>
            <p className="text-xs text-gray-600">대기중</p>
          </Card>
          <Card className="text-center">
            <CheckCircle2Icon size={20} className="text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-xs text-gray-600">승인</p>
          </Card>
          <Card className="text-center">
            <TrendingUpIcon size={20} className="text-teal-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">96%</p>
            <p className="text-xs text-gray-600">정확도</p>
          </Card>
        </div>

        {/* Info Banner */}
        <Card className="bg-teal-50 border-2 border-teal-200">
          <div className="flex items-start gap-3">
            <AlertCircleIcon size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-teal-900 mb-1">
                검증자 역할
              </p>
              <p className="text-sm text-teal-700">
                다른 보호자가 제출한 데이터를 검토하고 AI 분석 결과의 정확성을
                확인합니다. 정확한 검증을 통해 추가 보상을 받을 수 있습니다.
              </p>
            </div>
          </div>
        </Card>

        {/* Task List */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            검토 대기 목록
          </h2>
          <div className="space-y-3">
            {pendingTasks.map((task, index) => <motion.div key={task.id} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }}>
                <Card hover onClick={() => setSelectedTask(task.id)} className={selectedTask === task.id ? 'ring-2 ring-teal-500' : ''}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {task.petName} - {task.taskType}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ClockIcon size={14} />
                        <span>{task.submittedAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.hasImage && <ImageIcon size={18} className="text-gray-400" />}
                      <Badge variant={task.aiAnalysis.result === '정상' ? 'success' : 'warning'}>
                        AI: {task.aiAnalysis.result}
                      </Badge>
                    </div>
                  </div>

                  {selectedTask === task.id && <motion.div initial={{
                opacity: 0,
                height: 0
              }} animate={{
                opacity: 1,
                height: 'auto'
              }} className="mt-4 pt-4 border-t border-gray-200">
                      <div className="space-y-4">
                        {/* Submitted Data */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            제출된 응답
                          </h4>
                          <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                            {Object.entries(task.responses).map(([key, value]) => <div key={key} className="flex justify-between text-sm">
                                  <span className="text-gray-600">{key}</span>
                                  <span className="font-medium text-gray-900">
                                    {value}
                                  </span>
                                </div>)}
                          </div>
                        </div>

                        {/* AI Analysis */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            AI 분석 결과
                          </h4>
                          <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-3">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-teal-700">
                                결과
                              </span>
                              <Badge variant={task.aiAnalysis.result === '정상' ? 'success' : 'warning'}>
                                {task.aiAnalysis.result}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-teal-700">
                                신뢰도
                              </span>
                              <span className="font-bold text-teal-900">
                                {task.aiAnalysis.confidence}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Review Actions */}
                        <div className="space-y-3">
                          <textarea placeholder="반려 시 사유를 입력하세요 (선택)" value={reviewReason} onChange={e => setReviewReason(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-teal-500 focus:outline-none resize-none" rows={3} />
                          <div className="flex gap-3">
                            <Button onClick={handleReject} variant="danger" className="flex-1 flex items-center justify-center gap-2">
                              <XCircleIcon size={18} />
                              반려
                            </Button>
                            <Button onClick={handleApprove} className="flex-1 flex items-center justify-center gap-2">
                              <CheckCircle2Icon size={18} />
                              승인
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>}
                </Card>
              </motion.div>)}
          </div>
        </div>

        {/* Rewards Info */}
        <Card className="bg-gradient-to-br from-orange-500 to-amber-500 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm mb-1">검증 보상</p>
              <p className="text-2xl font-bold">건당 +30 포인트</p>
            </div>
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <TrendingUpIcon size={28} />
            </div>
          </div>
        </Card>
      </div>
    </Layout>;
}