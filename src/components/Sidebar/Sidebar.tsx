import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faTableColumns, faSquarePlus, faImages, faInbox, faFolderOpen, faFileCode, faPuzzlePiece, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.scss'
import profilePic from '../../assets/profile.png'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <h3>Catgirl</h3>
        <div>
          <FontAwesomeIcon className='sidebar-header-icon' icon={faMagnifyingGlass} />
          <FontAwesomeIcon className='sidebar-header-icon'  icon={faTableColumns} />
        </div>
      </div>
      <div className='sidebar-chat-tools'>
        <button className='chat-tool'>
          <FontAwesomeIcon icon={faSquarePlus} />
          <span>New Chat</span>
        </button>
        <button className='chat-tool'>
          <FontAwesomeIcon icon={faImages} />
          <span>Images</span>
        </button>
        <button className='chat-tool'>
          <FontAwesomeIcon icon={faInbox} />
          <span>Library</span>
        </button>
        <button className='chat-tool'>
          <FontAwesomeIcon icon={faFolderOpen} />
          <span>Projects</span>
        </button>
        <button className='chat-tool'>
          <FontAwesomeIcon icon={faFileCode} />
          <span>Codixie</span>
        </button>
        <button className='chat-tool'>
          <FontAwesomeIcon icon={faPuzzlePiece} />
          <span>Plugins</span>
        </button>
        <button className='chat-tool'>
          <FontAwesomeIcon icon={faEllipsis} />
          <span>More</span>
        </button>
      </div>
      <div className='sidebar-chat-history'>
        <span>Recents</span>
        <div className='chat-history-content'>
          <button>Minecraft Game</button>
          <button>Pabebe</button>
          <button>Hay naku</button>
          <button>Musta man ka</button>
          <button>Hello po</button>
          <button>Problema mo</button>
          <button>Mobile legends</button>
          <button>Bisaya girls</button>
          <button>Girl with septum</button>
          <button>Mobile legends</button>
          <button>Bisaya girls</button>
          <button>Girl with septum</button>
          <button>Mobile legends</button>
          <button>Bisaya girls</button>
          <button>Girl with septum</button>
        </div>
      </div>
      <div className='sidebar-user-section'>
        <div className='user-name'>
          <img className='profile-pic' src={profilePic} alt='profile pic' />
          <span id='user-name'>Sofia Trixie</span>
        </div>
        <button className='settings'></button>
      </div>
    </div>
  )
}

export default Sidebar