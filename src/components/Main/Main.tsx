import { faShareFromSquare, faEllipsis, faCopy, faArrowUpFromBracket, 
         faPencil, faThumbsUp, faThumbsDown, faRepeat, faPlus, faBrain, 
         faMicrophoneLines, faArrowRight, faPaperclip, faFolderPlus,
        faImage, faMusic, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect, useRef } from 'react';
import './Main.scss'

const Main: React.FC = () => {

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isVisible && 
        menuRef.current && 
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]); 


  return (
    <div className='main'>
      <div className='chat-options'>
        <div className='chat-option-container'>
          <button className='chat-option'>
              <FontAwesomeIcon icon={faShareFromSquare} />
              <span>Share</span>
          </button>
          <button className="chat-option">
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
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
              <button><FontAwesomeIcon icon={faEllipsis} /></button>
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
              <button><FontAwesomeIcon icon={faEllipsis} /></button>
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
              <button><FontAwesomeIcon icon={faEllipsis} /></button>
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
              <button><FontAwesomeIcon icon={faEllipsis} /></button>
            </div>
          </div>
        </div>
      </div>
      <div className='chat-input'>
        <div ref={menuRef}>
          {isVisible && (
            <div className='add-input-options'>
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
              onClick={() => setIsVisible((prev) => !prev)} 
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