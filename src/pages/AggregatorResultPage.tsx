import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { ArrowLeftIcon, UsersIcon, BrainIcon, CheckCircle2Icon, TrendingUpIcon, AlertTriangleIcon } from 'lucide-react';
export function AggregatorResultPage() {
  const navigate = useNavigate();
  return <Layout showNav={false}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 p-4">
        <div className="max-w-lg mx-auto pt-4 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/home')} className="p-2 hover:bg-white rounded-full transition-colors">
              <ArrowLeftIcon size={24} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">검증 결과</h1>
            <div className="w-10" />
          </div>

          {/* Final Result Card */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }}>
            <Card className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white border-0">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2Icon size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">검증 완료</h2>
                <p className="text-teal-100">최종 분석 결과가 확정되었습니다</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <p className="text-teal-100 text-sm mb-1">최종 결과</p>
                <p className="text-2xl font-bold">경미한 소화 불편 가능성</p>
              </div>
            </Card>
          </motion.div>

          {/* Confidence Scores */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.1
        }}>
            <Card>
              <h3 className="font-bold text-gray-900 mb-4">신뢰도 분석</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <BrainIcon size={18} className="text-teal-600" />
                      <span className="text-sm font-medium text-gray-700">
                        AI 판단
                      </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">62%</span>
                  </div>
                  <ProgressBar value={62} showPercentage={false} color="teal" />
                  <p className="text-xs text-gray-600 mt-1">
                    AI 모델이 제출된 데이터를 분석한 결과입니다
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <UsersIcon size={18} className="text-orange-600" />
                      <span className="text-sm font-medium text-gray-700">
                        유사 사례 평균
                      </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">71%</span>
                  </div>
                  <ProgressBar value={71} showPercentage={false} color="orange" />
                  <p className="text-xs text-gray-600 mt-1">
                    비슷한 증상을 보고한 다른 사용자들의 평균 점수입니다
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUpIcon size={18} className="text-green-600" />
                      <span className="text-sm font-medium text-gray-700">
                        최종 신뢰도
                      </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">68%</span>
                  </div>
                  <ProgressBar value={68} showPercentage={false} color="green" />
                  <p className="text-xs text-gray-600 mt-1">
                    AI 분석 + 커뮤니티 데이터 + 과거 히스토리 종합 점수
                  </p>
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
          delay: 0.2
        }}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">검증자 확인</h3>
                <Badge variant="success">승인됨</Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">검증자 수</span>
                  <span className="font-semibold text-gray-900">5명</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">승인</span>
                  <span className="font-semibold text-green-600">4명</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">반려</span>
                  <span className="font-semibold text-red-600">1명</span>
                </div>
              </div>

              <div className="mt-4 bg-green-50 border-2 border-green-200 rounded-xl p-3">
                <p className="text-sm text-green-900">
                  ✓ 검증자 과반수가 승인하여 최종 결과가 확정되었습니다
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Similar Cases */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }}>
            <Card>
              <h3 className="font-bold text-gray-900 mb-4">유사 사례 분석</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">총 유사 사례</span>
                  <span className="font-semibold text-gray-900">127건</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">같은 결과</span>
                  <span className="font-semibold text-gray-900">
                    89건 (70%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">평균 회복 기간</span>
                  <span className="font-semibold text-gray-900">3-5일</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-700 mb-2 font-medium">
                  권장 사항
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">•</span>
                    <span>하루 동안 식사량을 평소의 70% 수준으로 조절</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">•</span>
                    <span>충분한 수분 섭취 유지</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">•</span>
                    <span>2일 후에도 증상이 지속되면 수의사 상담 권장</span>
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Warning */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }}>
            <Card className="bg-orange-50 border-2 border-orange-200">
              <div className="flex items-start gap-3">
                <AlertTriangleIcon size={20} className="text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-orange-900 mb-1">
                    주의사항
                  </p>
                  <p className="text-sm text-orange-700">
                    이 결과는 참고용이며 전문 수의사의 진단을 대체할 수
                    없습니다. 증상이 악화되거나 우려되는 경우 반드시 동물병원을
                    방문하세요.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Actions */}
          <div className="space-y-3 pb-6">
            <Button onClick={() => navigate('/home')} className="w-full">
              확인
            </Button>
            <Button variant="ghost" onClick={() => navigate('/did')} className="w-full">
              건강 기록에 저장
            </Button>
          </div>
        </div>
      </div>
    </Layout>;
}