import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ArrowLeftIcon, CameraIcon, ShieldCheckIcon, SparklesIcon, CheckCircle2Icon } from 'lucide-react';
type TaskStep = 'intro' | 'questions' | 'photo' | 'processing' | 'result';

type Pet = {
  name: string;
  breed: string;
  age: string;
};

export function TaskPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState<TaskStep>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [photoUploaded, setPhotoUploaded] = useState(false);
   const petFromState = (location.state as { pet?: Pet } | null)?.pet;

  const pet: Pet = petFromState ?? {
    name: '초코',
    breed: '골든 리트리버',
    age: '3',
  };
  const questions = [{
    id: 1,
    question: '식욕은 어땠나요?',
    options: ['매우 좋음', '보통', '식욕 없음', '평소보다 많이 먹음']
  }, {
    id: 2,
    question: '배변 상태는 정상인가요?',
    options: ['정상', '설사', '변비', '혈변']
  }, {
    id: 3,
    question: '활동량은 어떤가요?',
    options: ['매우 활발', '보통', '조용함', '무기력함']
  }];
  const handleAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer
    });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('photo');
    }
  };
  const handlePhotoUpload = () => {
    setPhotoUploaded(true);
    setTimeout(() => {
      setStep('processing');
      setTimeout(() => {
        navigate('/submission-result');
      }, 3000);
    }, 500);
  };
  return <Layout showNav={false}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <button onClick={() => navigate('/home')} className="p-2 hover:bg-white rounded-full transition-colors">
            <ArrowLeftIcon size={24} className="text-gray-600" />
          </button>
          <Badge variant="info">+50 포인트</Badge>
        </div>

        <AnimatePresence mode="wait">
          {step === 'intro' && <motion.div key="intro" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }}>
              <Card>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SparklesIcon size={40} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    오늘의 행동 평가
                  </h1>
                  <p className="text-gray-600">
                    {pet.name}의 오늘 상태를 평가해주세요.
                    <br />
                    AI가 건강 상태를 분석합니다.
                  </p>
                </div>

                <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <ShieldCheckIcon size={20} className="text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-teal-900 mb-1">
                        프라이버시 보호
                      </p>
                      <p className="text-sm text-teal-700">
                        모든 분석은 zkML 기술로 로컬 환경에서 처리됩니다. 원본
                        데이터는 외부로 전송되지 않습니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-sm font-bold text-teal-600">
                      1
                    </div>
                    <span className="text-gray-700">
                      간단한 질문 답변 (3개)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-sm font-bold text-teal-600">
                      2
                    </div>
                    <span className="text-gray-700">사진 업로드 (선택)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-sm font-bold text-teal-600">
                      3
                    </div>
                    <span className="text-gray-700">AI 분석 결과 확인</span>
                  </div>
                </div>

                <Button onClick={() => setStep('questions')} className="w-full">
                  시작하기
                </Button>
              </Card>
            </motion.div>}

          {step === 'questions' && <motion.div key="questions" initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }}>
              <Card>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-teal-600">
                      질문 {currentQuestion + 1} / {questions.length}
                    </span>
                    <div className="flex gap-1">
                      {questions.map((_, idx) => <div key={idx} className={`h-1 w-8 rounded-full transition-colors ${idx <= currentQuestion ? 'bg-teal-500' : 'bg-gray-200'}`} />)}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {questions[currentQuestion].question}
                  </h2>
                </div>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map(option => <motion.button key={option} whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }} onClick={() => handleAnswer(option)} className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all">
                      <span className="font-medium text-gray-900">
                        {option}
                      </span>
                    </motion.button>)}
                </div>
              </Card>
            </motion.div>}

          {step === 'photo' && <motion.div key="photo" initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }}>
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  사진 업로드 (선택)
                </h2>
                <p className="text-gray-600 mb-6">
                  {pet.name}의 오늘 모습을 사진으로 기록해주세요.
                  <br />
                  AI가 더 정확한 분석을 제공합니다.
                </p>

                {!photoUploaded ? <motion.button whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }} onClick={handlePhotoUpload} className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                      <CameraIcon size={32} className="text-teal-600" />
                    </div>
                    <span className="font-medium text-gray-700">
                      사진 선택하기
                    </span>
                  </motion.button> : <motion.div initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} className="relative h-48 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center">
                    <CheckCircle2Icon size={48} className="text-teal-600" />
                    <span className="absolute bottom-4 text-sm font-medium text-teal-700">
                      사진이 업로드되었습니다
                    </span>
                  </motion.div>}

                <div className="mt-6 flex gap-3">
                  <Button variant="ghost" onClick={() => {
                setStep('processing');
                setTimeout(() => navigate('/submission-result'), 3000);
              }} className="flex-1">
                    건너뛰기
                  </Button>
                  {photoUploaded && <Button onClick={handlePhotoUpload} className="flex-1">
                      다음
                    </Button>}
                </div>
              </Card>
            </motion.div>}

          {step === 'processing' && <motion.div key="processing" initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.9
        }}>
              <Card className="text-center">
                <motion.div animate={{
              rotate: 360
            }} transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }} className="w-20 h-20 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  AI 분석 중...
                </h2>
                <p className="text-gray-600 mb-6">
                  제출하신 정보를 분석하고 있습니다
                </p>

                <div className="space-y-4">
                  <motion.div initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.5
              }} className="flex items-center gap-3 bg-teal-50 p-4 rounded-xl">
                    <CheckCircle2Icon size={20} className="text-teal-600" />
                    <span className="text-sm text-teal-900">
                      응답 데이터 검증 완료
                    </span>
                  </motion.div>
                  <motion.div initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 1
              }} className="flex items-center gap-3 bg-teal-50 p-4 rounded-xl">
                    <CheckCircle2Icon size={20} className="text-teal-600" />
                    <span className="text-sm text-teal-900">
                      zkML 로컬 처리 중
                    </span>
                  </motion.div>
                  <motion.div initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 1.5
              }} className="flex items-center gap-3 bg-orange-50 p-4 rounded-xl">
                    <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm text-orange-900">
                      건강 상태 분석 중...
                    </span>
                  </motion.div>
                </div>

                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-xs text-gray-600">
                    🔒 모든 분석은 로컬 환경에서 처리되며,
                    <br />
                    원본 데이터는 외부로 전송되지 않습니다
                  </p>
                </div>
              </Card>
            </motion.div>}
        </AnimatePresence>
      </div>
    </Layout>;
}