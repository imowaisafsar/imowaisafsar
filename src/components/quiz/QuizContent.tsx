import React, { useEffect, useState } from 'react';
import NoSSR from "@/components/NoSSR";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, selectMessages, selectPrompt, setPrompt, addConversation, selectConversations } from "@/redux/reducers/chatSlice";
import { useRouter } from 'next/navigation';
import { Question } from '@/types/Question';

const QuizContent = () => {
    const [questions, setQuestions] = useState<Array<Question>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showResult, setShowResult] = useState<boolean>(false);
    const messages = useSelector(selectMessages);
    const [congratsMessage, setCongratsMessage] = useState<string>('');
    const [correctCount, setCorrectCount] = useState<number>(0);
    const router = useRouter();
    const [showIntensity, setShowIntensity] = useState<boolean>(true);

    useEffect(() => {
        if (!messages || messages.length === 0) {
            router.push('/chat');
        }
    }, [messages, router]);

    const generateQuiz = async (intensity: string) => {
        setShowIntensity(false);

        if (isLoading) return;

        setIsLoading(true);

        try {
            const quizGenerationPrompt: string = `Generate a 10-question quiz on this conversation topic. Please keep the questions intensity should be ${intensity}. Answer in JSON form and it should always be an array of Question. One question should have one correct answer. Remember, don't write any text before and after the JSON because I only want JSON array.
            class QuizQuestion {
                public question: string;
                public options: string[];
                public answer: string;  
            }`;

            const response = await axios.post('/api/chat', {
                prompt: quizGenerationPrompt,
                messages
            });

            let quizString: string = response.data.data[0].content;
            if (quizString.includes('```')) {
                quizString = quizString.split('```json')[1].split('```')[0];
            }
            const quizObj = JSON.parse(quizString) as Array<Question>;

            setQuestions(quizObj);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    // useEffect(() => {
    //     generationPrompt();

    //     return () => {
    //         setIsLoading(false);  // Cleanup to reset loading state if the component is unmounted
    //     };
    // }, []);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = event.target.value;
        setUserAnswers(newAnswers);
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmit = () => {
        const correctCount = userAnswers.filter((answer, index) => answer === questions[index].answer).length;
        setCorrectCount(correctCount);
        const message = `You got ${correctCount} out of ${questions.length} correct!`;
        setCongratsMessage(message);
        setShowResult(true);
    };

    const skeleton = (
        <div role="status" className="animate-pulse">
            <div className="h-[30px] bg-gray-200 rounded-full dark:bg-gray-700 w-full my-8"></div>
            <div className="h-[20px] bg-gray-400 rounded-full dark:bg-gray-700 w-full my-[18px]"></div>
            <div className="h-[20px] bg-gray-400 rounded-full dark:bg-gray-700 w-full my-[18px]"></div>
            <div className="h-[20px] bg-gray-400 rounded-full dark:bg-gray-700 w-full my-[18px]"></div>
            <div className="h-[20px] bg-gray-400 rounded-full dark:bg-gray-700 w-full my-[18px]"></div>
            <div className="flex justify-between">
                <div className="w-[80px] h-[18px] bg-gray-300 rounded-full dark:bg-gray-700 my-[18px]"></div>
                <div className="w-[80px] h-[18px] bg-gray-300 rounded-full dark:bg-gray-700 my-[18px]"></div>
            </div>
        </div>
    );

    const preQuizQuestion = (
        <>
            <h3 className="mb-5 text-lg font-medium text-white">What should be the intensity of the quiz?</h3>
            <ul className="grid w-full gap-6 md:grid-cols-3">
                <li>
                    <button type='button' className="inline-flex items-center justify-between w-full p-5 border-2 border-gray-500 rounded-xl" onClick={() => generateQuiz('easy')}>
                        <div className="block">
                            <div className="w-full text-lg font-semibold text-white/80">EASY</div>
                        </div>
                        <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </li>
                <li>
                    <button type='button' className="inline-flex items-center justify-between w-full p-5 border-2 border-gray-500 rounded-xl" onClick={() => generateQuiz('medium')}>
                        <div className="block">
                            <div className="w-full text-lg font-semibold text-white/80">MEDIUM</div>
                        </div>
                        <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </li>
                <li>
                    <button type='button' className="inline-flex items-center justify-between w-full p-5 border-2 border-gray-500 rounded-xl" onClick={() => generateQuiz('hard')}>
                        <div className="block">
                            <div className="w-full text-lg font-semibold text-white/80">HARD</div>
                        </div>
                        <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </li>
            </ul>
        </>
    )

    return (
        <div className="relative flex h-screen justify-center items-center">
            <NoSSR>
                <div className="w-full p-4 text-white rounded-lg shadow sm:p-6 mx-28 sm:mx-12 md:mx-20">
                    <h5 className="mb-3 text-3xl font-semibold text-gray-100">
                        Exercise On Topic
                    </h5>
                    <p className="text-sm font-normal text-gray-400 mb-2">Play a quiz to strengthen your knowledge on the topic.</p>
                    <hr className='my-4' />

                    {showIntensity ? preQuizQuestion : null}

                    {!showResult ?
                        (
                            isLoading ?
                                skeleton :
                                <div className="w-full">
                                    {questions.length > 0 && (
                                        <>
                                            <div className="mb-4">
                                                <h2 className="text-xl font-bold mb-2"><span>{currentQuestionIndex + 1}/10 | </span>Q: {questions[currentQuestionIndex].question}</h2>
                                                <div className='mt-4'>
                                                    {questions[currentQuestionIndex].options.map(option => (
                                                        <div key={option} className="mb-2">
                                                            <div className="flex items-center ps-4 border border-gray-600 rounded-lg dark:border-gray-700">
                                                                <input
                                                                    id={option}
                                                                    type="radio"
                                                                    value={option}
                                                                    name="option"
                                                                    checked={userAnswers[currentQuestionIndex] === option}
                                                                    onChange={handleAnswerChange}
                                                                    className="w-4 h-4 !text-white bg-transparent border-gray-300 mr-2" />
                                                                <label
                                                                    htmlFor={option}
                                                                    className="w-full py-4 ms-2 text-sm font-medium !text-white">{option}</label>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-8">
                                                {currentQuestionIndex > 0 ?
                                                    (<button
                                                        onClick={handlePrevious}
                                                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center h-[48px]">
                                                        Previous
                                                    </button>) :
                                                    (<button
                                                        onClick={handlePrevious}
                                                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center h-[48px] cursor-not-allowed" disabled>
                                                        Previous
                                                    </button>)
                                                }
                                                {currentQuestionIndex === questions.length - 1 && (
                                                    <button
                                                        onClick={handleSubmit}
                                                        className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center h-[48px]"
                                                    >
                                                        Submit
                                                    </button>
                                                )}
                                                {!(currentQuestionIndex === questions.length - 1) && (
                                                    <button
                                                        onClick={handleNext}
                                                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center h-[48px]"
                                                    >
                                                        Next
                                                    </button>)
                                                }
                                            </div>
                                        </>
                                    )}
                                </div>
                        ) :
                        (
                            <div className='result-wrapper min-h-[360px] w-full flex justify-center items-center'>
                                <div>
                                    <h2 className="text-4xl font-bold text-white/80 text-center">Well Done</h2>
                                    <h1 className="text-5xl font-extrabold text-white text-center my-5">{correctCount}/{questions.length}</h1>
                                    <h6 className="text-lg font-bold text-white/60 text-center">{congratsMessage}</h6>
                                </div>
                            </div>
                        )
                    }
                </div>
            </NoSSR>
        </div>
    );
};

export default QuizContent;
