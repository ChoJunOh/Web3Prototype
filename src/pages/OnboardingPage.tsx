import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { ShieldCheckIcon, PawPrintIcon, CheckCircle2Icon } from 'lucide-react';
type Step = 'welcome' | 'email' | 'did' | 'terms' | 'pet';
export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('welcome');
  const validateEmail = (value: string) => {
  if (!value) return '이메일을 입력해주세요.';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return '올바른 이메일 형식이 아닙니다.';
    }
    return '';
  };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [petData, setPetData] = useState({
    name: '',
    breed: '',
    age: '',
    gender: 'male' as 'male' | 'female',
    vaccinated: false
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleEmailSubmit = () => {

    const error = validateEmail(email);
      if (error) {
        setEmailError(error);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('did');
    }, 1500);
  };
  const handleDIDCreation = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('terms');
    }, 2000);
  };
  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/home', {
        state: {
          pet: {
            name: petData.name,
            breed: petData.breed,
            age: petData.age,
          },
        },
      });
    }, 1000);
  };
  return <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 flex items-center justify-center p-4">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="w-full max-w-md">
        {step === 'welcome' && <Card className="text-center">
            <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          delay: 0.2,
          type: 'spring'
        }} className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <PawPrintIcon size={40} className="text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">PetChain</h1>
            <p className="text-gray-600 mb-8">
              반려동물 건강 데이터를 안전하게 관리하고
              <br />
              보상을 받으세요
            </p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShieldCheckIcon size={20} className="text-teal-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    내 데이터는 내가 소유
                  </p>
                  <p className="text-sm text-gray-600">DID 기반 데이터 관리</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2Icon size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    AI 기반 건강 분석
                  </p>
                  <p className="text-sm text-gray-600">
                    zkML로 프라이버시 보호
                  </p>
                </div>
              </div>
            </div>
            <Button onClick={() => setStep('email')} className="w-full">
              시작하기
            </Button>
          </Card>}

        {step === 'email' && <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              이메일로 시작하기
            </h2>
            <p className="text-gray-600 mb-6">
              계정을 생성하고 DID를 발급받으세요
            </p>
            <Input type="email" label="이메일" placeholder="your@email.com" value={email} onChange={handleEmailChange} className="mb-2" />

             {emailError && (
                <p className="text-sm text-red-500 mb-4">{emailError}</p>
              )}

            <Button onClick={handleEmailSubmit} loading={loading} disabled={!!emailError || !email} className="w-full">
              다음
            </Button>
          </Card>}

        {step === 'did' && <Card>
            <div className="text-center mb-6">
              <motion.div animate={{
            rotate: 360
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }} className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                DID 생성 중...
              </h2>
              <p className="text-gray-600">
                분산 신원 증명(DID)을 생성하고 있습니다.
                <br />이 과정은 블록체인에 기록됩니다.
              </p>
            </div>
            <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-teal-900 font-medium mb-2">
                🔒 보안 알림
              </p>
              <p className="text-sm text-teal-700">
                생성된 DID는 오직 당신만이 소유하며, 중앙 서버에 저장되지
                않습니다.
              </p>
            </div>
            <Button onClick={handleDIDCreation} loading={loading} className="w-full">
              {loading ? 'DID 생성 중...' : 'DID 생성 완료'}
            </Button>
          </Card>}

        {step === 'terms' && <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">약관 동의</h2>
            <div className="space-y-4 mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} className="mt-1 w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                <div>
                  <p className="font-semibold text-gray-900">
                    개인정보 처리 방침 (필수)
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    • 반려동물 건강 데이터는 DID 기반으로 관리됩니다
                    <br />
                    • 데이터는 암호화되어 저장되며, 소유권은 사용자에게 있습니다
                    <br />• AI 분석은 로컬 환경에서 처리됩니다 (zkML)
                  </p>
                </div>
              </label>
            </div>
            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 mb-6">
              <p className="text-sm font-semibold text-orange-900 mb-2">
                💡 Web3 데이터 소유권
              </p>
              <p className="text-sm text-orange-700">
                모든 데이터는 블록체인에 기록됩니다.
              </p>
            </div>
            <Button onClick={() => setStep('pet')} disabled={!termsAccepted} className="w-full">
              다음
            </Button>
          </Card>}

        {step === 'pet' && <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              반려동물 등록
            </h2>
            <p className="text-gray-600 mb-6">
              반려동물 정보를 입력해주세요
            </p>
            <div className="space-y-4">
              <Input label="이름" placeholder="예: 초코" value={petData.name} onChange={e => setPetData({
            ...petData,
            name: e.target.value
          })} />
              <Input label="품종" placeholder="예: 골든 리트리버" value={petData.breed} onChange={e => setPetData({
            ...petData,
            breed: e.target.value
          })} />
              <Input type="number" label="나이" placeholder="예: 3" value={petData.age} onChange={e => setPetData({
            ...petData,
            age: e.target.value
          })} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  성별
                </label>
                <div className="flex gap-3">
                  <button onClick={() => setPetData({
                ...petData,
                gender: 'male'
              })} className={`flex-1 py-3 rounded-xl border-2 transition-all ${petData.gender === 'male' ? 'border-teal-500 bg-teal-50 text-teal-700 font-semibold' : 'border-gray-200 text-gray-600'}`}>
                    남아
                  </button>
                  <button onClick={() => setPetData({
                ...petData,
                gender: 'female'
              })} className={`flex-1 py-3 rounded-xl border-2 transition-all ${petData.gender === 'female' ? 'border-teal-500 bg-teal-50 text-teal-700 font-semibold' : 'border-gray-200 text-gray-600'}`}>
                    여아
                  </button>
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={petData.vaccinated} onChange={e => setPetData({
              ...petData,
              vaccinated: e.target.checked
            })} className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                <span className="text-gray-700">예방접종 완료</span>
              </label>
            </div>
            <Button onClick={handleComplete} loading={loading} disabled={!petData.name || !petData.breed || !petData.age} className="w-full mt-6">
              등록 완료
            </Button>
          </Card>}
      </motion.div>
    </div>;
}