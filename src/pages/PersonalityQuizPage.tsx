import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  Compass,
  Award,
} from 'lucide-react';

export const PersonalityQuizPage: React.FC = () => {
  const { quizResult, saveQuizResult, retakeQuiz } = useApp();

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];
  const isLastQuestion = currentIdx === QUIZ_QUESTIONS.length - 1;
  const hasSelectedCurrent = selectedAnswers[currentQuestion?.id] !== undefined;

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const calculateResults = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      // Calculate archetype based on selected options
      const chosenTraits: string[] = [];
      let totalWeight = 0;

      QUIZ_QUESTIONS.forEach((q) => {
        const chosenIdx = selectedAnswers[q.id] ?? 0;
        const opt = q.options[chosenIdx];
        if (opt) {
          chosenTraits.push(opt.trait);
          totalWeight += opt.scoreWeight;
        }
      });

      // Archetype generation
      let archetype = 'Reflective Community Scholar';
      let description =
        'You combine intellectual curiosity with genuine warmth and grounded family values. You value quiet moments of substance, thoughtful conversations, and mutual spiritual encouragement.';

      if (totalWeight > 72) {
        archetype = 'Purpose-Driven Visionary';
        description =
          'You are deeply motivated by high ideals, community contribution, and clear, authentic communication. You seek a partner with equal ambition and emotional maturity.';
      } else if (totalWeight < 60) {
        archetype = 'Gentle Harmonizer';
        description =
          'You bring serenity, patience, and empathetic listening to relationships. You prioritize peaceful home life, shared laughter, and respectful, sincere bonds.';
      }

      saveQuizResult({
        completed: true,
        archetype,
        archetypeDescription: description,
        traits: chosenTraits,
        compatibilityBonus: 4,
      });

      setIsSubmitting(false);
    }, 600);
  };

  // If already completed and user hasn't clicked retake:
  if (quizResult && quizResult.completed) {
    return (
      <div className="min-h-screen bg-[#FAF4EA] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#E8DCC3] shadow-lg p-6 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[#FAF4EA] border border-[#C99A2E] text-[#C99A2E] flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#A34D28]">
            Demonstration Compatibility Model
          </span>

          <h1
            className="text-3xl sm:text-4xl font-serif font-medium text-[#2B2118] mt-2 mb-3"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Your Compatibility Snapshot
          </h1>

          <div className="inline-block px-4 py-1.5 rounded-full bg-[#FAF4EA] border border-[#E8DCC3] text-sm font-serif font-semibold text-[#2B2118] mb-6">
            Archetype: <span className="text-[#A34D28]">{quizResult.archetype}</span>
          </div>

          <p className="text-xs sm:text-sm text-[#756353] leading-relaxed max-w-lg mx-auto mb-8">
            {quizResult.archetypeDescription}
          </p>

          {/* Key Traits Grid */}
          <div className="bg-[#FAF4EA]/60 rounded-2xl p-5 border border-[#E8DCC3] mb-8 text-left">
            <h3 className="font-serif font-semibold text-sm text-[#2B2118] mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C99A2E]" />
              Your Primary Compatibility Traits
            </h3>
            <div className="flex flex-wrap gap-2">
              {quizResult.traits.map((trait, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white border border-[#E8DCC3] text-xs font-medium text-[#2B2118]"
                >
                  {trait}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[#756353] mt-3 pt-3 border-t border-[#E8DCC3]/60">
              Match compatibility scores across the 8 sample university profiles have been boosted by +4% based on your answers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/browse"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#C99A2E]" />
              <span>Explore Recalculated Matches</span>
            </Link>
            <button
              onClick={retakeQuiz}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#E8DCC3] hover:bg-[#FAF4EA] text-xs font-medium text-[#756353] flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake 30-Second Quiz</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF4EA] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-xl w-full">
        {/* Top Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#A34D28] mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C99A2E]" />
            <span>30-Second Student Compatibility Quiz</span>
          </div>
          <h1
            className="text-3xl font-serif font-medium text-[#2B2118]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Find Your Rhythm
          </h1>
          <p className="text-xs text-[#756353] mt-1">
            Answer five brief questions to illuminate your values and university matching preferences.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-[#E8DCC3] shadow-md p-6 sm:p-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold text-[#756353] mb-2">
              <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-[#A34D28]">
                {Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed
              </span>
            </div>
            <div className="w-full bg-[#FAF4EA] h-2 rounded-full overflow-hidden border border-[#E8DCC3]">
              <div
                className="bg-[#C99A2E] h-full transition-all duration-300"
                style={{
                  width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-6">
            <h2 className="text-xl font-serif font-semibold text-[#2B2118] mb-1">
              {currentQuestion.question}
            </h2>
            <p className="text-xs text-[#756353]">
              {currentQuestion.subtitle}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQuestion.id] === optIdx;

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-[#2B2118] bg-[#FAF4EA] shadow-xs'
                      : 'border-[#E8DCC3] bg-white hover:border-[#C99A2E]/70'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? 'border-[#2B2118] bg-[#2B2118] text-[#FAF4EA]'
                        : 'border-[#E8DCC3]'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#2B2118] mb-0.5">
                      {option.label}
                    </h4>
                    <p className="text-[11px] text-[#756353] leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-[#FAF4EA]">
            <button
              onClick={handleBack}
              disabled={currentIdx === 0}
              className={`py-2 px-3 rounded-xl text-xs font-medium flex items-center gap-1.5 ${
                currentIdx === 0
                  ? 'text-[#756353]/40 cursor-not-allowed'
                  : 'text-[#756353] hover:text-[#2B2118]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!hasSelectedCurrent || isSubmitting}
              className={`py-2.5 px-5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                !hasSelectedCurrent || isSubmitting
                  ? 'bg-[#E8DCC3] text-[#756353] cursor-not-allowed'
                  : 'bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA]'
              }`}
            >
              <span>{isLastQuestion ? 'See My Snapshot' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4 text-[#C99A2E]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
