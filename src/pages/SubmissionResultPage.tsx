import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { CheckCircle2Icon, ShieldCheckIcon, TrendingUpIcon, AlertCircleIcon, CoinsIcon, ChevronRightIcon } from 'lucide-react';
export function SubmissionResultPage() {
  const navigate = useNavigate();
  return <Layout showNav={false}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 p-4">
        <div className="max-w-lg mx-auto pt-4 space-y-6">
          {/* Success Header */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} className="text-center">
            <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            delay: 0.2,
            type: 'spring'
          }} className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
              <CheckCircle2Icon size={48} className="text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              제출 완료!
            </h1>
            <p className="text-gray-600">AI 분석 결과를 확인하세요</p>
          </motion.div>

          {/* Reward Card */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }}>
            <Card className="bg-gradient-to-br from-orange-500 to-amber-500 text-white border-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 mb-1">획득한 포인트</p>
                  <p className="text-4xl font-bold">+50</p>
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <CoinsIcon size={32} className="text-white" />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* AI Analysis Result */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  AI 분석 결과
                </h2>
                <Badge variant="success">정상</Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">신뢰도 점수</span>
                    <span className="text-lg font-bold text-teal-600">92%</span>
                  </div>
                  <ProgressBar value={92} showPercentage={false} color="teal" />
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUpIcon size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900 mb-1">
                        건강 상태 양호
                      </p>
                      <p className="text-sm text-green-700">
                        식욕, 배변, 활동량 모두 정상 범위입니다. 현재 상태를 잘
                        유지하고 계십니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    제출한 정보
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">식욕</span>
                      <span className="font-medium text-gray-900">
                        매우 좋음
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">배변 상태</span>
                      <span className="font-medium text-gray-900">정상</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">활동량</span>
                      <span className="font-medium text-gray-900">
                        매우 활발
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* zkML Verification */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5
        }}>
            <Card className="bg-teal-50 border-2 border-teal-200">
              <div className="flex items-start gap-3">
                <ShieldCheckIcon size={24} className="text-teal-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-teal-900 mb-2">
                    zkML 검증 완료
                  </h3>
                  <p className="text-sm text-teal-700 mb-3">
                    🔒 로컬 환경에서 처리되었습니다
                    <br />
                    원본 데이터는 외부로 전송되지 않았으며, 영지식 증명으로
                    검증되었습니다.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-teal-600">
                    <span className="font-mono bg-teal-100 px-2 py-1 rounded">
                      Proof: 0x7a3b...9f2c
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Validation Status */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6
        }}>
            <Card>
              <div className="flex items-start gap-3">
                <AlertCircleIcon size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    검증 대기 중
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    커뮤니티 검증자들이 데이터를 확인하고 있습니다. 검증 완료 시
                    추가 보상을 받을 수 있습니다.
                  </p>
                  <button onClick={() => navigate('/aggregator-result')} className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
                    검증 상태 확인 <ChevronRightIcon size={16} />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Actions */}
          <div className="space-y-3 pb-6">
            <Button onClick={() => navigate('/home')} className="w-full">
              홈으로 돌아가기
            </Button>
            <Button variant="ghost" onClick={() => navigate('/did')} className="w-full">
              건강 기록 보기
            </Button>
          </div>
        </div>
      </div>
    </Layout>;
}