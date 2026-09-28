import { faShareFromSquare, faEllipsis, faCopy, faArrowUpFromBracket, 
         faPencil, faThumbsUp, faThumbsDown, faRepeat, faPlus, faBrain, 
         faMicrophoneLines, faArrowRight, faPaperclip, faFolderPlus,
        faImage, faMusic, faMagnifyingGlass, faFolderOpen, faThumbTack,
        faBoxArchive, faTrashCan, faArrowsSplitUpAndLeft, faHeadphones,
        faBookOpen} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect, useRef } from 'react';
import './Main.scss'

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
            <button className="chat-option" onClick={() => setIsHeaderMenuOpen((prev) => !prev)} >
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
          <div className="user-chat">
            <div className='user-chat-container'>
              <div className='user-chat-box'>
                Hello Catgirl
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
              Nyaa! What's up how are you?
            </div>
            <div className='ai-chat-options'>
              <button><FontAwesomeIcon icon={faCopy} /></button>
              <button><FontAwesomeIcon icon={faThumbsUp} /></button>
              <button><FontAwesomeIcon icon={faThumbsDown} /></button>
              <button><FontAwesomeIcon icon={faArrowUpFromBracket} /></button>
              <button><FontAwesomeIcon icon={faRepeat} /></button>
              <div ref={(el) => { chatMenuRefs.current[0] = el; }}>
                <button onClick={() => setActiveChatMenuIndex((prev) => (prev === 0 ? null : 0))} >
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
                {activeChatMenuIndex === 0 && (
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
          <div className="user-chat">
            <div className='user-chat-container'>
              <div className='user-chat-box'>
                heyy! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident doloremque, modi, neque alias tempora animi iste possimus harum obcaecati recusandae porro nostrum, dolorem eos corporis in nesciunt. Rerum, commodi quo?
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, molestias hic dignissimos ab ducimus maxime aut et libero dolores quae, ipsa dicta aliquam animi consequuntur laudantium unde delectus optio ipsam.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsum amet veniam mollitia, fugiat autem facilis quaerat. Omnis earum delectus optio vero aspernatur nemo. Dolorem voluptas odio voluptate consequatur neque.
            </div>
            <div className='ai-chat-options'>
              <button><FontAwesomeIcon icon={faCopy} /></button>
              <button><FontAwesomeIcon icon={faThumbsUp} /></button>
              <button><FontAwesomeIcon icon={faThumbsDown} /></button>
              <button><FontAwesomeIcon icon={faArrowUpFromBracket} /></button>
              <button><FontAwesomeIcon icon={faRepeat} /></button>
              <div ref={(el) => { chatMenuRefs.current[1] = el; }}>
                <button onClick={() => setActiveChatMenuIndex((prev) => (prev === 1 ? null : 1))} >
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
                {activeChatMenuIndex === 1 && (
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
          <div className="user-chat">
            <div className='user-chat-container'>
              <div className='user-chat-box'>
                heyy! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident doloremque, modi, neque alias tempora animi iste possimus harum obcaecati recusandae porro nostrum, dolorem eos corporis in nesciunt. Rerum, commodi quo?
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, molestias hic dignissimos ab ducimus maxime aut et libero dolores quae, ipsa dicta aliquam animi consequuntur laudantium unde delectus optio ipsam.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsum amet veniam mollitia, fugiat autem facilis quaerat. Omnis earum delectus optio vero aspernatur nemo. Dolorem voluptas odio voluptate consequatur neque.
            </div>
            <div className='ai-chat-options'>
              <button><FontAwesomeIcon icon={faCopy} /></button>
              <button><FontAwesomeIcon icon={faThumbsUp} /></button>
              <button><FontAwesomeIcon icon={faThumbsDown} /></button>
              <button><FontAwesomeIcon icon={faArrowUpFromBracket} /></button>
              <button><FontAwesomeIcon icon={faRepeat} /></button>
              <div ref={(el) => { chatMenuRefs.current[2] = el; }}>
                <button onClick={() => setActiveChatMenuIndex((prev) => (prev === 2 ? null : 2))} >
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
                {activeChatMenuIndex === 2 && (
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
          <div className="user-chat">
            <div className='user-chat-container'>
              <div className='user-chat-box'>
                heyy! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident doloremque, modi, neque alias tempora animi iste possimus harum obcaecati recusandae porro nostrum, dolorem eos corporis in nesciunt. Rerum, commodi quo?
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, molestias hic dignissimos ab ducimus maxime aut et libero dolores quae, ipsa dicta aliquam animi consequuntur laudantium unde delectus optio ipsam.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsum amet veniam mollitia, fugiat autem facilis quaerat. Omnis earum delectus optio vero aspernatur nemo. Dolorem voluptas odio voluptate consequatur neque.
            </div>
            <div className='ai-chat-options'>
              <button><FontAwesomeIcon icon={faCopy} /></button>
              <button><FontAwesomeIcon icon={faThumbsUp} /></button>
              <button><FontAwesomeIcon icon={faThumbsDown} /></button>
              <button><FontAwesomeIcon icon={faArrowUpFromBracket} /></button>
              <button><FontAwesomeIcon icon={faRepeat} /></button>
              <div ref={(el) => { chatMenuRefs.current[3] = el; }}>
                <button onClick={() => setActiveChatMenuIndex((prev) => (prev === 3 ? null : 3))} >
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
                {activeChatMenuIndex === 3 && (
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
            <input />
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
  )
}

export default Main