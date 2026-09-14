import { faShareFromSquare, faEllipsis, faCopy, faArrowUpFromBracket, 
         faPencil, faThumbsUp, faThumbsDown, faRepeat, faPlus, faBrain, 
         faMicrophoneLines, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Main.scss'

const Main = () => {
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
      </div>
      <div className='chat-input'>
        <div className="input-box">
          <FontAwesomeIcon className="input-icons" icon={faPlus} />
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
  )
}

export default Main