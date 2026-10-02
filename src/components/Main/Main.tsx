import React, { useState, useEffect, useRef } from 'react';
import { 
  faShareFromSquare, faEllipsis, faCopy, faArrowUpFromBracket, 
  faPencil, faThumbsUp, faThumbsDown, faRepeat, faPlus, faBrain, 
  faMicrophoneLines, faArrowRight, faPaperclip, faFolderPlus,
  faImage, faMusic, faMagnifyingGlass, faFolderOpen, faThumbTack,
  faBoxArchive, faTrashCan, faArrowsSplitUpAndLeft, faHeadphones,
  faBookOpen 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Main.scss';
import { chatData } from '../../data/chatData'; // Removed .ts extension to avoid TS2691

const Main: React.FC = () => {
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState<boolean>(false);
  const [isInputMenuOpen, setIsInputMenuOpen] = useState<boolean>(false);
  const [activeChatMenuIndex, setActiveChatMenuIndex] = useState<number | null>(null);

  const headerMenuRef = useRef<HTMLDivElement>(null);
  const inputMenuRef = useRef<HTMLDivElement>(null);
  const chatMenuRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (headerMenuRef.current && !headerMenuRef.current.contains(target)) {
        setIsHeaderMenuOpen(false);
      }
      if (inputMenuRef.current && !inputMenuRef.current.contains(target)) {
        setIsInputMenuOpen(false);
      }
      if (
        activeChatMenuIndex !== null &&
        chatMenuRefs.current[activeChatMenuIndex] &&
        !chatMenuRefs.current[activeChatMenuIndex]?.contains(target)
      ) {
        setActiveChatMenuIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeChatMenuIndex]);

  return (
    <div className='main'>
      <div className='chat-options'>
        <div className='chat-option-container'>
          <button className='chat-option'>
            <FontAwesomeIcon icon={faShareFromSquare} />
            <span>Share</span>
          </button>
          <div ref={headerMenuRef}>
            <button className="chat-option" onClick={() => setIsHeaderMenuOpen((prev) => !prev)}>
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
            {isHeaderMenuOpen && (
              <div className='chat-options-tab options'>
                <button className='chat-tab-option'>
                  <FontAwesomeIcon icon={faFolderOpen} />
                  <span>View Files In Chat</span>
                </button>
                <button className='chat-tab-option'>
                  <FontAwesomeIcon icon={faThumbTack} />
                  <span>Pin Chat</span>
                </button>
                <button className='chat-tab-option'>
                  <FontAwesomeIcon icon={faBoxArchive} />
                  <span>Archive</span>
                </button>
                <button className='chat-tab-option'>
                  <FontAwesomeIcon icon={faTrashCan} />
                  <span>Delete Chat</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='chat-content'>
        <div className='chat-container'>
          {chatData.map((chat, index) => (
            <React.Fragment key={index}>
              <div className="user-chat">
                <div className='user-chat-container'>
                  <div className='user-chat-box'>
                    {chat.userMessage}
                  </div>
                  <div className='user-chat-options'>
                    <button><FontAwesomeIcon icon={faCopy} /></button>
                    <button><FontAwesomeIcon icon={faArrowUpFromBracket} /></button>
                    <button><FontAwesomeIcon icon={faPencil} /></button>
                  </div>
                </div>
              </div>

              <div className="ai-chat">
                <div className='ai-chat-box'>
                  {chat.aiMessage}
                </div>
                <div className='ai-chat-options'>
                  <button><FontAwesomeIcon icon={faCopy} /></button>
                  <button><FontAwesomeIcon icon={faThumbsUp} /></button>
                  <button><FontAwesomeIcon icon={faThumbsDown} /></button>
                  <button><FontAwesomeIcon icon={faArrowUpFromBracket} /></button>
                  <button><FontAwesomeIcon icon={faRepeat} /></button>
                  <div ref={(el) => { chatMenuRefs.current[index] = el; }}>
                    <button onClick={() => setActiveChatMenuIndex((prev) => (prev === index ? null : index))}>
                      <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                    {activeChatMenuIndex === index && (
                      <div className='ai-message-options-tab options'>
                        <button className='ai-message-tab-option'>
                          <FontAwesomeIcon icon={faArrowsSplitUpAndLeft} />
                          <span>Branch Chat</span>
                        </button>
                        <button className='ai-message-tab-option'>
                          <FontAwesomeIcon icon={faHeadphones} />
                          <span>Listen</span>
                        </button>
                        <button className='ai-message-tab-option'>
                          <FontAwesomeIcon icon={faBookOpen} />
                          <span>View Sources</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className='chat-input'>
        <div ref={inputMenuRef}>
          {isInputMenuOpen && (
            <div className='add-input-options options'>
              <button>
                <FontAwesomeIcon icon={faPaperclip} />
                <span>Add Photos and Files</span>
              </button>
              <button>
                <FontAwesomeIcon icon={faFolderPlus} />
                <span>Add from Library</span>
              </button>
              <button>
                <FontAwesomeIcon icon={faImage} />
                <span>Create Image</span>
              </button>
              <button>
                <FontAwesomeIcon icon={faMusic} />
                <span>Create Music</span>
              </button>
              <button>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <span>Web Search</span>
              </button>
            </div>
          )}

          <div className="input-box">
            <FontAwesomeIcon 
              onClick={() => setIsInputMenuOpen((prev) => !prev)} 
              className="input-icons toggle-btn" 
              icon={faPlus} 
            />
            <input placeholder="Ask anything..." />
            <span className='thinking-mode'>
              <span><FontAwesomeIcon icon={faBrain} /></span>
              <span>Think</span>
            </span>
            <FontAwesomeIcon className="input-icons" icon={faMicrophoneLines} />
            <button><FontAwesomeIcon icon={faArrowRight} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;