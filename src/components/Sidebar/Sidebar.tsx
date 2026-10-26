import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faTableColumns,
  faSquarePlus,
  faImages,
  faInbox,
  faFolderOpen,
  faFileCode,
  faPuzzlePiece,
  faEllipsis,
  faPen,
  faBoxArchive,
  faTrash,
  faCube,
  faGear,
  faUser,
  faCircleQuestion,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons'

import profilePic from '../../assets/profile.png'
import './Sidebar.scss'
import { history } from '../../data/history'

const Sidebar: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  const [activeHistoryMenuIndex, setActiveHistoryMenuIndex] = useState<number | null>(null)
  const [historyMenuPosition, setHistoryMenuPosition] = useState({ top: 0, left: 0 })
  const historyMenuRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        activeHistoryMenuIndex !== null &&
        historyMenuRefs.current[activeHistoryMenuIndex] &&
        !historyMenuRefs.current[activeHistoryMenuIndex]?.contains(target)
      ) {
        setActiveHistoryMenuIndex(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeHistoryMenuIndex])

  const toggleHistoryMenu = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (activeHistoryMenuIndex === index) {
      setActiveHistoryMenuIndex(null)
      return
    }

    const trigger = event.currentTarget.getBoundingClientRect()
    const menuWidth = 240
    const menuHeight = 156
    setHistoryMenuPosition({
      top: Math.max(8, trigger.top - menuHeight - 8),
      left: Math.max(8, Math.min(trigger.right - 12, window.innerWidth - menuWidth - 8)),
    })
    setActiveHistoryMenuIndex(index)
  }

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <h3>Catgirl</h3>
        <div>
          <FontAwesomeIcon className='sidebar-header-icon' icon={faMagnifyingGlass} />
          <FontAwesomeIcon className='sidebar-header-icon' icon={faTableColumns} />
        </div>
      </div>

      <div className='sidebar-chat-tools'>
        <button type='button' className='chat-tool'>
          <FontAwesomeIcon className='icon' icon={faSquarePlus} />
          <span>New Chat</span>
        </button>
        <button type='button' className='chat-tool'>
          <FontAwesomeIcon className='icon' icon={faImages} />
          <span>Images</span>
        </button>
        <button type='button' className='chat-tool'>
          <FontAwesomeIcon className='icon' icon={faInbox} />
          <span>Library</span>
        </button>
        <button type='button' className='chat-tool'>
          <FontAwesomeIcon className='icon' icon={faFolderOpen} />
          <span>Projects</span>
        </button>
        <button type='button' className='chat-tool'>
          <FontAwesomeIcon className='icon' icon={faFileCode} />
          <span>Codixie</span>
        </button>
        <button type='button' className='chat-tool'>
          <FontAwesomeIcon className='icon' icon={faPuzzlePiece} />
          <span>Plugins</span>
        </button>
        <button type='button' className='chat-tool'>
          <FontAwesomeIcon className='icon' icon={faEllipsis} />
          <span>More</span>
        </button>
      </div>

      <div className='sidebar-chat-history'>
        <span>Recents</span>
        <div className='chat-history-content'>
          {history.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                historyMenuRefs.current[index] = el
              }}
            >
              <div className='chat-history'>
                <button
                  type='button'
                  className='chat-history-label'
                  onClick={() => {}}
                >
                  {item.name}
                </button>
                <button
                  type='button'
                  className='chat-history-option'
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleHistoryMenu(index, e)
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
                {activeHistoryMenuIndex === index && (
                  <div
                    className='chat-history-options options'
                    style={{ top: historyMenuPosition.top, left: historyMenuPosition.left }}
                  >
                    <button type='button' className='ai-message-tab-option'>
                      <FontAwesomeIcon icon={faPen} />
                      <span>Rename Chat</span>
                    </button>
                    <button type='button' className='ai-message-tab-option'>
                      <FontAwesomeIcon icon={faBoxArchive} />
                      <span>Archive</span>
                    </button>
                    <button type='button' className='ai-message-tab-option'>
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='sidebar-user-section'>
        <div ref={profileMenuRef}>
          <button type='button' className='user-name-btn' onClick={() => setIsProfileMenuOpen(prev => !prev)}>
            <img className='profile-pic' src={profilePic} alt='profile pic' />
            <span id='user-name'>Sofia Trixie</span>
          </button>
          {isProfileMenuOpen &&
          <div className='profile-options-tab options'>
            <div className='profile-options-section-1'>
            <button type='button' className='user-name'>
              <img className='profile-pic' src={profilePic} alt='profile pic' />
              <span id='user-name'>Sofia Trixie</span>
            </button>
            </div>
            <div className='profile-options-section-2'>
              <button className='profile-tab-option'>
                <FontAwesomeIcon icon={faCube} />
                <span>View Files In Chat</span>
              </button>
              <button className='profile-tab-option'>
                <FontAwesomeIcon icon={faUser} />
                <span>Profile</span>
              </button>
              <button className='profile-tab-option'>
                <FontAwesomeIcon icon={faGear} />
                <span>Settings</span>
              </button>
            </div>
            <div className='profile-options-section-3'>
              <button className='profile-tab-option'>
                <FontAwesomeIcon icon={faCircleQuestion} />
                <span>Help</span>
              </button>
              <button className='profile-tab-option'>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Sidebar
