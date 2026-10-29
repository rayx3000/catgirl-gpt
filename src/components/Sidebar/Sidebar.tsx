import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
  faBoxArchive,
  faCircleQuestion,
  faCube,
  faEllipsis,
  faFileCode,
  faFolderOpen,
  faGear,
  faImages,
  faInbox,
  faMagnifyingGlass,
  faPen,
  faPuzzlePiece,
  faSquarePlus,
  faTableColumns,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import profilePic from '../../assets/profile.png'
import type { Conversation } from '../../App'
import './Sidebar.scss'

type SidebarProps = {
  conversations: Conversation[]
  activeChatId: string
  onNewChat: () => void
  onSelectChat: (conversationId: string) => void
  onRenameChat: (conversationId: string) => void
  onArchiveChat: (conversationId: string) => void
  onDeleteChat: (conversationId: string) => void
}

const Sidebar = ({
  conversations,
  activeChatId,
  onNewChat,
  onSelectChat,
  onRenameChat,
  onArchiveChat,
  onDeleteChat,
}: SidebarProps) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notice, setNotice] = useState('')
  const [activeHistoryMenuIndex, setActiveHistoryMenuIndex] = useState<number | null>(null)
  const [historyMenuPosition, setHistoryMenuPosition] = useState({ top: 0, left: 0 })

  const profileMenuRef = useRef<HTMLDivElement>(null)
  const historyMenuRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setIsProfileMenuOpen(false)
      }

      if (
        activeHistoryMenuIndex !== null &&
        historyMenuRefs.current[activeHistoryMenuIndex] &&
        !historyMenuRefs.current[activeHistoryMenuIndex]?.contains(target)
      ) {
        setActiveHistoryMenuIndex(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [activeHistoryMenuIndex])

  const toggleHistoryMenu = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    if (activeHistoryMenuIndex === index) {
      setActiveHistoryMenuIndex(null)
      return
    }

    const trigger = event.currentTarget.getBoundingClientRect()
    const menuWidth = 220
    const menuHeight = 148
    setHistoryMenuPosition({
      top: Math.max(8, trigger.top - menuHeight - 8),
      left: Math.max(8, Math.min(trigger.right - 12, window.innerWidth - menuWidth - 8)),
    })
    setActiveHistoryMenuIndex(index)
  }

  const showPlaceholderNotice = (label: string) => {
    setNotice(label + ' is not connected in this local chat demo yet.')
  }

  const filteredConversations = conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  )

  return (
    <aside className={'sidebar' + (isCollapsed ? ' sidebar--collapsed' : '')}>
      <div className="sidebar-header">
        <h3>Catgirl</h3>
        <div className="sidebar-header-actions">
          <button
            type="button"
            className="sidebar-header-icon"
            aria-label="Search chats"
            title="Search chats"
            onClick={() => {
              setIsSearchOpen((open) => !open)
              setIsCollapsed(false)
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <button
            type="button"
            className="sidebar-header-icon"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setIsCollapsed((collapsed) => !collapsed)}
          >
            <FontAwesomeIcon icon={faTableColumns} />
          </button>
        </div>
      </div>

      {isSearchOpen && !isCollapsed && (
        <label className="chat-search">
          <span className="sr-only">Search chats</span>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            autoFocus
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search chats"
          />
        </label>
      )}

      <nav className="sidebar-chat-tools" aria-label="Chat tools">
        <button type="button" className="chat-tool chat-tool--primary" onClick={onNewChat}>
          <FontAwesomeIcon className="icon" icon={faSquarePlus} />
          <span>New Chat</span>
        </button>
        <button type="button" className="chat-tool" onClick={() => showPlaceholderNotice('Images')}>
          <FontAwesomeIcon className="icon" icon={faImages} />
          <span>Images</span>
        </button>
        <button type="button" className="chat-tool" onClick={() => showPlaceholderNotice('Library')}>
          <FontAwesomeIcon className="icon" icon={faInbox} />
          <span>Library</span>
        </button>
        <button type="button" className="chat-tool" onClick={() => showPlaceholderNotice('Projects')}>
          <FontAwesomeIcon className="icon" icon={faFolderOpen} />
          <span>Projects</span>
        </button>
        <button type="button" className="chat-tool" onClick={() => showPlaceholderNotice('Codixie')}>
          <FontAwesomeIcon className="icon" icon={faFileCode} />
          <span>Codixie</span>
        </button>
        <button type="button" className="chat-tool" onClick={() => showPlaceholderNotice('Plugins')}>
          <FontAwesomeIcon className="icon" icon={faPuzzlePiece} />
          <span>Plugins</span>
        </button>
      </nav>

      {!isCollapsed && notice && (
        <p className="sidebar-notice" role="status">
          {notice}
        </p>
      )}

      <section className="sidebar-chat-history" aria-label="Recent chats">
        <span>Recents</span>
        <div className="chat-history-content">
          {filteredConversations.length ? (
            filteredConversations.map((conversation, index) => (
              <div
                className="chat-history-row"
                key={conversation.id}
                ref={(element) => {
                  historyMenuRefs.current[index] = element
                }}
              >
                <button
                  type="button"
                  className={'chat-history-label' + (activeChatId === conversation.id ? ' is-active' : '')}
                  aria-current={activeChatId === conversation.id ? 'page' : undefined}
                  onClick={() => onSelectChat(conversation.id)}
                >
                  {conversation.title}
                </button>
                <button
                  type="button"
                  className="chat-history-option"
                  aria-label={'Open actions for ' + conversation.title}
                  onClick={(event) => {
                    event.stopPropagation()
                    toggleHistoryMenu(index, event)
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
                {activeHistoryMenuIndex === index && (
                  <div
                    className="chat-history-options options"
                    role="menu"
                    style={{ top: historyMenuPosition.top, left: historyMenuPosition.left }}
                  >
                    <button
                      type="button"
                      className="ai-message-tab-option"
                      role="menuitem"
                      onClick={() => {
                        onRenameChat(conversation.id)
                        setActiveHistoryMenuIndex(null)
                      }}
                    >
                      <FontAwesomeIcon icon={faPen} />
                      <span>Rename chat</span>
                    </button>
                    <button
                      type="button"
                      className="ai-message-tab-option"
                      role="menuitem"
                      onClick={() => {
                        onArchiveChat(conversation.id)
                        setActiveHistoryMenuIndex(null)
                      }}
                    >
                      <FontAwesomeIcon icon={faBoxArchive} />
                      <span>Archive</span>
                    </button>
                    <button
                      type="button"
                      className="ai-message-tab-option ai-message-tab-option--danger"
                      role="menuitem"
                      onClick={() => {
                        if (window.confirm('Delete “' + conversation.title + '”? This cannot be undone.')) {
                          onDeleteChat(conversation.id)
                        }
                        setActiveHistoryMenuIndex(null)
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="empty-history">No chats match your search.</p>
          )}
        </div>
      </section>

      <div className="sidebar-user-section">
        <div ref={profileMenuRef}>
          <button
            type="button"
            className="user-name-btn"
            aria-expanded={isProfileMenuOpen}
            onClick={() => setIsProfileMenuOpen((open) => !open)}
          >
            <img className="profile-pic" src={profilePic} alt="" />
            <span className="user-name">Sofia Trixie</span>
          </button>
          {isProfileMenuOpen && (
            <div className="profile-options-tab options">
              <div className="profile-options-section-1">
                <span className="user-name">
                  <img className="profile-pic" src={profilePic} alt="" />
                  <span>Sofia Trixie</span>
                </span>
              </div>
              <div className="profile-options-section-2">
                <button type="button" className="profile-tab-option" onClick={() => showPlaceholderNotice('Files')}>
                  <FontAwesomeIcon icon={faCube} />
                  <span>View files in chat</span>
                </button>
                <button type="button" className="profile-tab-option" onClick={() => showPlaceholderNotice('Profile')}>
                  <FontAwesomeIcon icon={faUser} />
                  <span>Profile</span>
                </button>
                <button type="button" className="profile-tab-option" onClick={() => showPlaceholderNotice('Settings')}>
                  <FontAwesomeIcon icon={faGear} />
                  <span>Settings</span>
                </button>
              </div>
              <div className="profile-options-section-3">
                <button type="button" className="profile-tab-option" onClick={() => showPlaceholderNotice('Help')}>
                  <FontAwesomeIcon icon={faCircleQuestion} />
                  <span>Help</span>
                </button>
                <button type="button" className="profile-tab-option" onClick={() => showPlaceholderNotice('Log out')}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
