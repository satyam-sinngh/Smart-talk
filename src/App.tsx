import React, {useState} from 'react';
import './App.css';
import {IoCodeSlash, IoSend} from 'react-icons/io5';
import {BiPlanet} from 'react-icons/bi';
import {FaPython} from 'react-icons/fa';
import {TbMessageChatbot} from 'react-icons/tb';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {Remarkable} from 'remarkable';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const App: React.FC = () => {
    // Markdown parser configuration
    const md = new Remarkable({
        highlight: function (str, lang) {
            let highlightedCode = '';
            if (lang && hljs.getLanguage(lang)) {
                try {
                    highlightedCode = hljs.highlight(str, {language: lang}).value;
                } catch (err) {
                    console.error('Error highlighting with specified language:', err);
                }
            } else {
                try {
                    highlightedCode = hljs.highlightAuto(str).value;
                } catch (err) {
                    console.error('Error highlighting automatically:', err);
                }
            }

            return `
        <div className="code-container">
          <button className="copy-btn" onClick={copyCode(this)}>Copy</button>
          <pre><code className="hljs">${highlightedCode}</code></pre>
        </div>
      `;
        },
        html: true,
        typographer: true,
        breaks: true,
        linkify: true,
        xhtmlOut: true,
    });

    // State
    const [message, setMessage] = useState<string>('');
    const [isResponseScreen, setIsResponseScreen] = useState<boolean>(false);
    const [response, setResponse] = useState<{ type: 'userMsg' | 'response'; text: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Suggestions
    const suggestions = [
        {text: 'What is coding? How can we learn it?', Icon: <IoCodeSlash/>},
        {text: 'What is the red planet of our solar system?', Icon: <BiPlanet/>},
        {text: 'In which year was Python invented?', Icon: <FaPython/>},
        {text: 'How can we use AI for adoption?', Icon: <TbMessageChatbot/>},
    ];

    // Copy code block
    const copyCode = (btn: HTMLElement) => {
        const codeBlock = btn.nextElementSibling?.querySelector('code')?.textContent;
        if (codeBlock) {
            navigator.clipboard.writeText(codeBlock).then(() => {
                btn.textContent = 'Copied!';
                setTimeout(() => (btn.textContent = 'Copy'), 2000);
            });
        }
    };

    (window as unknown as { copyCode: (btn: HTMLElement) => void }).copyCode = copyCode;

    // Generate response
    const generateResponse = async (message: string) => {
        setLoading(true);
        try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});
            const result = await model.generateContent(message);

            setResponse((prev) => [
                ...prev,
                {type: 'userMsg', text: message},
                {type: 'response', text: result.response.text()},
            ]);
            setIsResponseScreen(true);
            setMessage('');
        } catch (error) {
            console.error('Error generating response:', error);
            alert('Failed to generate a response. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Event handlers
    const handleSendMessage = () => {
        if (message.trim()) {
            generateResponse(message.trim());
        } else {
            alert('Message cannot be empty!');
        }
    };

    const startNewChat = () => {
        setIsResponseScreen(false);
        setMessage('');
        setResponse([]);
    };

    // JSX structure
    return (
        <main className="container min-w-full min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">
            {/* Main Content */}
            {isResponseScreen ? (
                <section className="min-h-[80vh]">
                    {/* Header */}
                    <header className="header flex items-center justify-between w-full h-[20vh] px-[300px]">
                        <h2 className="text-2xl">Smart Talk</h2>
                        <button
                            className="bg-[#181818] px-6 py-2 rounded-full cursor-pointer text-sm text-white hover:bg-[#201f1f] transition-all duration-300 shadow-lg hover:shadow-xl active:shadow-none focus:outline-none"
                            onClick={startNewChat}
                        >
                            New Chat
                        </button>
                    </header>

                    {/* Messages */}
                    <div className="message">
                        {loading ? (
                            <div className="flex flex-col items-center mt-8">
                                <div
                                    className="loader animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
                                <p className="text-lg mt-4 text-gray-400">Thinking... Generating response...</p>
                            </div>
                        ) : (
                            response.map((msg, index) => (
                                <div
                                    key={index}
                                    className={msg.type}
                                    dangerouslySetInnerHTML={{__html: md.render(msg.text)}}
                                />
                            ))
                        )}
                    </div>
                </section>
            ) : (
                <section className="middle min-h-[80vh] flex items-center justify-center flex-col">
                    <h2 className="text-4xl">Smart Talk</h2>
                    <div className="boxes mt-8 flex gap-4">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                onClick={() => setMessage(suggestion.text)}
                                className="card bg-[#181818] p-4 rounded-lg cursor-pointer hover:bg-[#201f1f] transition-all duration-300 min-h-[20vh] flex flex-col justify-between"
                            >
                                <p className="text-lg">{suggestion.text}</p>
                                <span className="text-2xl self-end">{suggestion.Icon}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bottom w-full flex flex-col justify-center items-center py-4">
                <div className="inputBox flex items-center bg-[#181818] rounded-full w-[60%] py-2 px-4">
                    <input
                        value={message}
                        type="text"
                        placeholder="Write your message here..."
                        className="flex-1 bg-transparent text-white outline-none placeholder-gray-500 text-lg focus:placeholder-transparent focus:ring-0 focus:border-0 focus:outline-none focus:bg-transparent focus:text-white transition-all duration-300"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    {loading ? (
                        <span className="text-green-500 text-2xl ml-4 animate-spin">⏳</span>
                    ) : (
                        message && (
                            <IoSend
                                className="text-green-500 text-2xl cursor-pointer ml-4"
                                onClick={handleSendMessage}
                            />
                        )
                    )}
                </div>
                <p className="text-gray-400 text-sm mt-4">
                    Smart Talk is developed by{' '}
                    <a
                        href="https://linkedin.com/in/aryankumarofficial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        Aryan Kumar
                    </a>
                    . This AI uses the Gemini API to generate responses.
                </p>
            </footer>
        </main>
    );
};

export default App;
