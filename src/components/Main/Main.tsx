import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import {
  faArrowRight,
  faArrowsSplitUpAndLeft,
  faBoxArchive,
  faBrain,
  faCopy,
  faEllipsis,
  faHeadphones,
  faImage,
  faMagnifyingGlass,
  faMicrophoneLines,
  faMusic,
  faPaperclip,
  faPencil,
  faPlus,
  faRepeat,
  faShareFromSquare,
  faThumbsDown,
  faThumbsUp,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ChatMessage } from '../../App'
import './Main.scss'

type MainProps = {
  title: string
  messages: ChatMessage[]
  isGenerating: boolean
  onSendMessage: (content: string, thinkingMode: boolean) => void
  onEditMessage: (messageId: string, content: string) => void
  onRegenerate: () => void
  onBranch: (messageId: string) => void
  onArchiveChat: () => void
  onDeleteChat: () => void
}

type BrowserSpeechRecognition = {
  lang: string
  interimResults: boolean
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null
  onerror: (() => void) | null
  start: () => void
}

type BrowserSpeechRecognitionConstructor = new () => BrowserSpeechRecognition

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: BrowserSpeechRecognitionConstructor
  webkitSpeechRecognition?: BrowserSpeechRecognitionConstructor
}

const Main = ({
  title,
  messages,
  isGenerating,
  onSendMessage,
  onEditMessage,
  onRegenerate,
  onBranch,
  onArchiveChat,
  onDeleteChat,
}: MainProps) => {
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false)
  const [isInputMenuOpen, setIsInputMenuOpen] = useState(false)
  const [activeChatMenuId, setActiveChatMenuId] = useState<string | null>(null)
  const [draft, setDraft] = useState('')
  const [attachments, setAttachments] = useState<File[]>([])
  const [thinkingMode, setThinkingMode] = useState(false)
  const [editingMessage, setEditingMessage] = useState<{ id: string; content: string } | null>(null)
  const [notice, setNotice] = useState('')

  const headerMenuRef = useRef<HTMLDivElement>(null)
  const inputMenuRef = useRef<HTMLFormElement>(null)
  const chatMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const chatContentRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const composerRef = useRef<HTMLTextAreaElement>(null)
  const noticeTimer = useRef<number | null>(null)

  const showNotice = (message: string) => {
    setNotice(message)
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current)
    noticeTimer.current = window.setTimeout(() => setNotice(''), 2600)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      if (headerMenuRef.current && !headerMenuRef.current.contains(target)) {
        setIsHeaderMenuOpen(false)
      }
      if (inputMenuRef.current && !inputMenuRef.current.contains(target)) {
        setIsInputMenuOpen(false)
      }
      if (
        activeChatMenuId &&
        chatMenuRefs.current[activeChatMenuId] &&
        !chatMenuRefs.current[activeChatMenuId]?.contains(target)
      ) {
        setActiveChatMenuId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [activeChatMenuId])

  useEffect(() => {
    const content = chatContentRef.current
    if (content) content.scrollTop = content.scrollHeight
  }, [messages, isGenerating])

  useEffect(
    () => () => {
      if (noticeTimer.current) window.clearTimeout(noticeTimer.current)
    },
    [],
  )

  const copyText = async (content: string, confirmation = 'Copied to clipboard.') => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard is unavailable')
      await navigator.clipboard.writeText(content)
      showNotice(confirmation)
    } catch {
      showNotice('Clipboard access was unavailable. Please copy the text manually.')
    }
  }

  const handleShare = async () => {
    const transcript = messages
      .map((message) => (message.role === 'user' ? 'You: ' : 'Catgirl: ') + message.content)
      .join('\n\n')

    try {
      if (navigator.share) {
        await navigator.share({ title: title + ' · Catgirl', text: transcript })
        showNotice('Chat shared.')
        return
      }
    } catch {
      showNotice('Sharing was cancelled.')
      return
    }

    void copyText(transcript, 'Chat transcript copied to clipboard.')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!draft.trim() || isGenerating) return

    const attachmentNote = attachments.length
      ? '\n\nAttached: ' + attachments.map((file) => file.name).join(', ')
      : ''
    onSendMessage(draft.trim() + attachmentNote, thinkingMode)
    setDraft('')
    setAttachments([])
    setIsInputMenuOpen(false)
  }

  const handleSpeechInput = () => {
    const SpeechRecognition = (window as SpeechRecognitionWindow).SpeechRecognition ??
      (window as SpeechRecognitionWindow).webkitSpeechRecognition

    if (!SpeechRecognition) {
      showNotice('Voice input is not supported by this browser.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = navigator.language || 'en-US'
    recognition.interimResults = false
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? '')
        .join(' ')
        .trim()
      setDraft((current) => (current ? current + ' ' + transcript : transcript))
      composerRef.current?.focus()
    }
    recognition.onerror = () => showNotice('Voice input could not be started. Please check microphone permission.')

    try {
      recognition.start()
      showNotice('Listening…')
    } catch {
      showNotice('Voice input is already active or unavailable.')
    }
  }

  const startDraft = (prefix: string) => {
    setDraft((current) => current || prefix)
    setIsInputMenuOpen(false)
    window.setTimeout(() => composerRef.current?.focus(), 0)
  }

  const handleListen = (content: string) => {
    if (!('speechSynthesis' in window)) {
      showNotice('Text-to-speech is not supported by this browser.')
      return
    }

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(content))
    showNotice('Reading the response aloud.')
  }

  const handleSaveEdit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingMessage?.content.trim()) return
    onEditMessage(editingMessage.id, editingMessage.content)
    setEditingMessage(null)
  }

  return (
    <main className="main">
      <header className="chat-options">
        <h1>{title}</h1>
        <div className="chat-option-container">
          <button type="button" className="chat-option" onClick={() => void handleShare()}>
            <FontAwesomeIcon icon={faShareFromSquare} />
            <span>Share</span>
          </button>
          <div ref={headerMenuRef}>
            <button
              type="button"
              className="chat-option"
              aria-label="Chat actions"
              aria-expanded={isHeaderMenuOpen}
              onClick={() => setIsHeaderMenuOpen((open) => !open)}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
            {isHeaderMenuOpen && (
              <div className="chat-options-tab options" role="menu">
                <button
                  type="button"
                  className="chat-tab-option"
                  role="menuitem"
                  onClick={() => {
                    onArchiveChat()
                    setIsHeaderMenuOpen(false)
                  }}
                >
                  <FontAwesomeIcon icon={faBoxArchive} />
                  <span>Archive chat</span>
                </button>
                <button
                  type="button"
                  className="chat-tab-option chat-tab-option--danger"
                  role="menuitem"
                  onClick={() => {
                    if (window.confirm('Delete “' + title + '”? This cannot be undone.')) {
                      onDeleteChat()
                    }
                    setIsHeaderMenuOpen(false)
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                  <span>Delete chat</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="chat-content" ref={chatContentRef}>
        <div className="chat-container">
          {messages.length === 0 ? (
            <section className="empty-chat">
              <span className="empty-chat__sparkle">✦</span>
              <h2>Nyaa! What can I help with?</h2>
              <p>Start a conversation, then your chat will be saved in this browser.</p>
              <div className="suggestion-list">
                <button type="button" onClick={() => startDraft('Help me plan ')}>
                  Help me plan something
                </button>
                <button type="button" onClick={() => startDraft('Explain ')}>
                  Explain a topic
                </button>
              </div>
            </section>
          ) : (
            messages.map((message) =>
              message.role === 'user' ? (
                <article className="user-chat" key={message.id}>
                  <div className="user-chat-container">
                    {editingMessage?.id === message.id ? (
                      <form className="message-editor" onSubmit={handleSaveEdit}>
                        <textarea
                          value={editingMessage.content}
                          onChange={(event) =>
                            setEditingMessage({ ...editingMessage, content: event.target.value })
                          }
                          aria-label="Edit message"
                          autoFocus
                        />
                        <div>
                          <button type="button" onClick={() => setEditingMessage(null)}>
                            Cancel
                          </button>
                          <button type="submit">Save</button>
                        </div>
                      </form>
                    ) : (
                      <div className="user-chat-box">{message.content}</div>
                    )}
                    <div className="user-chat-options" aria-label="Message actions">
                      <button
                        type="button"
                        title="Copy message"
                        aria-label="Copy message"
                        onClick={() => void copyText(message.content)}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                      <button
                        type="button"
                        title="Edit message"
                        aria-label="Edit message"
                        onClick={() => setEditingMessage({ id: message.id, content: message.content })}
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                    </div>
                  </div>
                </article>
              ) : (
                <article className="ai-chat" key={message.id}>
                  <div className="ai-chat-box">{message.content}</div>
                  <div className="ai-chat-options" aria-label="Response actions">
                    <button
                      type="button"
                      title="Copy response"
                      aria-label="Copy response"
                      onClick={() => void copyText(message.content)}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                    <button type="button" title="Helpful" aria-label="Helpful" onClick={() => showNotice('Thanks for the feedback!')}>
                      <FontAwesomeIcon icon={faThumbsUp} />
                    </button>
                    <button type="button" title="Not helpful" aria-label="Not helpful" onClick={() => showNotice('Thanks for the feedback!')}>
                      <FontAwesomeIcon icon={faThumbsDown} />
                    </button>
                    <button
                      type="button"
                      title="Regenerate response"
                      aria-label="Regenerate response"
                      disabled={isGenerating}
                      onClick={onRegenerate}
                    >
                      <FontAwesomeIcon icon={faRepeat} />
                    </button>
                    <div
                      className="message-menu"
                      ref={(element) => {
                        chatMenuRefs.current[message.id] = element
                      }}
                    >
                      <button
                        type="button"
                        title="More response actions"
                        aria-label="More response actions"
                        aria-expanded={activeChatMenuId === message.id}
                        onClick={() =>
                          setActiveChatMenuId((activeId) => (activeId === message.id ? null : message.id))
                        }
                      >
                        <FontAwesomeIcon icon={faEllipsis} />
                      </button>
                      {activeChatMenuId === message.id && (
                        <div className="ai-message-options-tab options" role="menu">
                          <button
                            type="button"
                            className="ai-message-tab-option"
                            role="menuitem"
                            onClick={() => {
                              onBranch(message.id)
                              setActiveChatMenuId(null)
                            }}
                          >
                            <FontAwesomeIcon icon={faArrowsSplitUpAndLeft} />
                            <span>Branch chat</span>
                          </button>
                          <button
                            type="button"
                            className="ai-message-tab-option"
                            role="menuitem"
                            onClick={() => {
                              handleListen(message.content)
                              setActiveChatMenuId(null)
                            }}
                          >
                            <FontAwesomeIcon icon={faHeadphones} />
                            <span>Listen</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ),
            )
          )}
          {isGenerating && (
            <article className="ai-chat ai-chat--typing" aria-live="polite">
              <div className="ai-chat-box typing-indicator">
                <span />
                <span />
                <span />
              </div>
            </article>
          )}
        </div>
      </div>

      <div className="chat-input">
        <form ref={inputMenuRef} onSubmit={handleSubmit}>
          <input
            ref={fileInputRef}
            className="visually-hidden"
            type="file"
            multiple
            onChange={(event) => {
              setAttachments(Array.from(event.target.files ?? []))
              event.target.value = ''
            }}
          />
          {isInputMenuOpen && (
            <div className="add-input-options options">
              <button type="button" onClick={() => fileInputRef.current?.click()}>
                <FontAwesomeIcon icon={faPaperclip} />
                <span>Add photos and files</span>
              </button>
              <button type="button" onClick={() => startDraft('Create an image of ')}>
                <FontAwesomeIcon icon={faImage} />
                <span>Draft an image prompt</span>
              </button>
              <button type="button" onClick={() => startDraft('Create music that ')}>
                <FontAwesomeIcon icon={faMusic} />
                <span>Draft a music prompt</span>
              </button>
              <button type="button" onClick={() => startDraft('Search the web for ')}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <span>Draft a web search</span>
              </button>
            </div>
          )}

          {attachments.length > 0 && (
            <div className="attachment-list" aria-label="Selected attachments">
              {attachments.map((file) => (
                <button
                  type="button"
                  key={file.name + file.size}
                  onClick={() => setAttachments((current) => current.filter((item) => item !== file))}
                  title="Remove attachment"
                >
                  <FontAwesomeIcon icon={faPaperclip} />
                  {file.name}
                  <span aria-hidden="true">×</span>
                </button>
              ))}
            </div>
          )}

          <div className="input-box">
            <button
              type="button"
              className="input-icons toggle-btn"
              aria-label="Add to message"
              aria-expanded={isInputMenuOpen}
              onClick={() => setIsInputMenuOpen((open) => !open)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
            <textarea
              ref={composerRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  event.currentTarget.form?.requestSubmit()
                }
              }}
              placeholder="Ask anything..."
              aria-label="Message Catgirl"
              rows={1}
              disabled={isGenerating}
            />
            <button
              type="button"
              className={'thinking-mode' + (thinkingMode ? ' is-active' : '')}
              aria-pressed={thinkingMode}
              title="Toggle thinking mode"
              onClick={() => setThinkingMode((enabled) => !enabled)}
            >
              <FontAwesomeIcon icon={faBrain} />
              <span>Think</span>
            </button>
            <button
              type="button"
              className="input-icons"
              aria-label="Use voice input"
              title="Use voice input"
              onClick={handleSpeechInput}
              disabled={isGenerating}
            >
              <FontAwesomeIcon icon={faMicrophoneLines} />
            </button>
            <button type="submit" className="send-button" aria-label="Send message" disabled={!draft.trim() || isGenerating}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </form>
      </div>

      {notice && (
        <p className="chat-notice" role="status">
          {notice}
        </p>
      )}
    </main>
  )
}

export default Main
