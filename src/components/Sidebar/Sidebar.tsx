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
} from '@fortawesome/free-solid-svg-icons'

import profilePic from '../../assets/profile.png'
import './Sidebar.scss'
import { history } from '../../data/history'

const Sidebar: React.FC = () => {
  const [activeHistoryMenuIndex, setActiveHistoryMenuIndex] = useState<number | null>(null)
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

  const toggleHistoryMenu = (index: number) => {
    setActiveHistoryMenuIndex((prev) => (prev === index ? null : index))
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
          <FontAwesomeIcon icon={faSquarePlus} />
          <span>New Chat</span>
        </button>
        <button type='button' className='chat-tool'>
          <FontAwesomeIcon icon={faImages} />
          <span>Images</span>
        </button>
        <button type='button' className='chat-tool'>
          <FontAwesomeIcon icon={faInbox} />
          <span>Library</span>
        </button>
        <button type='button' className='chat-tool'>
          <FontAwesomeIcon icon={faFolderOpen} />
          <span>Projects</span>
        </button>
        <button type='button' className='chat-tool'>
          <FontAwesomeIcon icon={faFileCode} />
          <span>Codixie</span>
        </button>
        <button type='button' className='chat-tool'>
          <FontAwesomeIcon icon={faPuzzlePiece} />
          <span>Plugins</span>
        </button>
        <button type='button' className='chat-tool'>
          <FontAwesomeIcon icon={faEllipsis} />
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
                    toggleHistoryMenu(index)
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
              </div>

              {activeHistoryMenuIndex === index && (
                <div className='chat-history-options options'>
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
          ))}
        </div>
      </div>

      <div className='sidebar-user-section'>
        <div className='user-name'>
          <img className='profile-pic' src={profilePic} alt='profile pic' />
          <span id='user-name'>Sofia Trixie</span>
        </div>
        <button type='button' className='settings' aria-label='Settings'></button>
      </div>
    </div>
  )
}

export default Sidebar