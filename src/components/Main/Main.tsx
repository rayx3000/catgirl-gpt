import { faShareFromSquare, faEllipsis } from '@fortawesome/free-solid-svg-icons'
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
          <div className='user-chat-box'>
            Hello Catgirl
          </div>
        </div>
        <div className="ai-chat">
          <div className='ai-chat-box'>
            Nyaa! What's up how are you?
          </div>
        </div>
      </div>
      <div className='chat-input'></div>
    </div>
  )
}

export default Main