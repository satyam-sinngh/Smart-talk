import React, {useState} from 'react'
import "./App.css"
import {IoCodeSlash, IoSend} from "react-icons/io5";
import {BiPlanet} from "react-icons/bi";
import {FaPython} from "react-icons/fa";
import {TbMessageChatbot} from "react-icons/tb";

const App: React.FC = () => {
    const [message, setMessage] = useState<string>("");
    const [isResponseScreen, setIsResponseScreen] = useState<boolean>(true);
    return (
        <>
            <main className={"container  min-w-full min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white"}>
                {
                    isResponseScreen ?
                        <section className={"min-h-[80vh]"}>
                            <div
                                className={"header flex items-center justify-between w-[100vw] h-[20vh]  px-[300px]"}>
                                <h2 className={"text-2xl"}>
                                    Smart Talk
                                </h2>
                                <button
                                    className={"bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]"}
                                    id={"newChatBtn"}>New Chat
                                </button>
                            </div>
                            <div className={"message"}>
                                <div className={"userMsg"}>What does server rendering means?</div>
                                <div className={"response"}>What does server rendering means?</div>
                            </div>

                        </section> :
                        <section className={"middle min-h-[80vh] flex items-center justify-center flex-col"}>
                            <h2 className={"text-4xl"}>Smart Talk </h2>
                            <div className={"boxes mt-[30px] flex items-center gap-2"}>
                                <div
                                    className={"card rounded-lg px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px] cursor-pointer transition-all hover:bg-[#201f1f] duration-300"}>
                                    <p className={"text-[18px]"}>
                                        what is coding?<br/>
                                        how can we learn it.
                                    </p>
                                    <i className={"absolute right-3 bottom-3 text-[18px]"}><IoCodeSlash/></i>
                                </div>
                                <div
                                    className={"card rounded-lg px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px] cursor-pointer transition-all hover:bg-[#201f1f] duration-300"}>
                                    <p className={"text-[18px]"}>
                                        what is the red?<br/>
                                        planet of solar<br/>
                                        system?
                                    </p>
                                    <i className={"absolute right-3 bottom-3 text-[18px]"}><BiPlanet/></i>
                                </div>
                                <div
                                    className={"card rounded-lg px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px] cursor-pointer transition-all hover:bg-[#201f1f] duration-300"}>
                                    <p className={"text-[18px]"}>
                                        In which year python<br/>
                                        was invented?
                                    </p>
                                    <i className={"absolute right-3 bottom-3 text-[18px]"}><FaPython/></i>
                                </div>
                                <div
                                    className={"card rounded-lg px-[20px] relative min-h-[20vh] bg-[#181818] p-[10px] cursor-pointer transition-all hover:bg-[#201f1f] duration-300"}>
                                    <p className={"text-[18px]"}>
                                        How can we can use<br/>
                                        the AI for adopt?
                                    </p>
                                    <i className={"absolute right-3 bottom-3 text-[18px]"}><TbMessageChatbot/></i>
                                </div>
                            </div>
                        </section>
                }
                <section className={"bottom w-full flex flex-col justify-center items-center"}>
                    <div
                        className={"inputBox flex items-center bg-[#181818] rounded-[30px] w-[60%] text-[15px] py-[7px]"}>
                        <input
                            type={"text"}
                            placeholder={"Write your message here..."}
                            id={"messageBox"}
                            className={"p-[10px] bg-transparent flex-1 outline-0 border-none text-white pl-[15px]"}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        {
                            message === "" ? "" : <i className={"text-green-500 text-[20px] mr-5 cursor-pointer"}>
                                <IoSend/>
                            </i>
                        }
                    </div>
                    <p className={"text-[gray] text-[14px] my-4"}>Smart Talk is developed by <a
                        href={"https://linkedin.com/in/aryankumarofficial"} target={"_blank"}>Aryan Kumar</a>. this AI
                        use the gemini API for giving
                        the
                        response </p>
                </section>
            </main>
        </>
    )
}
export default App
