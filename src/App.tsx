import { useEffect, useRef, useState } from 'react'
import Main from './components/Main/Main'
import Sidebar from './components/Sidebar/Sidebar'
import { chatData } from './data/chatData'
import { history } from './data/history'
import './App.scss'

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export type Conversation = {
  id: string
  title: string
  messages: ChatMessage[]
  archived?: boolean
}

const storageKey = 'catgirl-gpt-conversations'
const activeChatStorageKey = 'catgirl-gpt-active-chat'

const createId = () =>
  globalThis.crypto?.randomUUID?.() ?? Date.now() + '-' + Math.random().toString(16).slice(2)

const createMessage = (role: ChatMessage['role'], content: string): ChatMessage => ({
  id: createId(),
  role,
  content,
})

const createConversation = (): Conversation => ({
  id: createId(),
  title: 'New chat',
  messages: [],
})

const initialConversations: Conversation[] = history.map((item, index) => ({
  id: item.id,
  title: item.name,
  messages:
    index === 0
      ? chatData.flatMap((chat) => [
          createMessage('user', chat.userMessage.trim()),
          createMessage('assistant', chat.aiMessage),
        ])
      : [
          createMessage(
            'assistant',
            'Nyaa! This is your “' + item.name + '” chat. Ask me anything when you are ready.',
          ),
        ],
}))

const loadConversations = (): Conversation[] => {
  try {
    const saved = window.localStorage.getItem(storageKey)
    if (!saved) return initialConversations

    const parsed: unknown = JSON.parse(saved)
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      parsed.every(
        (chat) =>
          typeof chat === 'object' &&
          chat !== null &&
          typeof chat.id === 'string' &&
          typeof chat.title === 'string' &&
          Array.isArray(chat.messages),
      )
    ) {
      return parsed as Conversation[]
    }
  } catch {
    // A corrupted local cache should never prevent the app from opening.
  }

  return initialConversations
}

const getReply = (prompt: string, thinkingMode: boolean) => {
  const cleanPrompt = prompt.trim()
  const lowerPrompt = cleanPrompt.toLowerCase()

  if (/\b(hi|hello|hey|kumusta)\b/.test(lowerPrompt)) {
    return 'Nyaa! Hi there — I’m Catgirl. What would you like to work on?'
  }

  if (/\b(help|what can you do)\b/.test(lowerPrompt)) {
    return 'I can keep a local chat, help you think through a prompt, and keep your conversations organised in this browser. Try asking for an outline, an explanation, or a next step!'
  }

  const snippet = cleanPrompt.length > 180 ? cleanPrompt.slice(0, 177) + '…' : cleanPrompt
  return thinkingMode
    ? 'Nyaa! Let’s break this down: “' +
        snippet +
        '”\n\n1. Identify the outcome you want.\n2. Separate the important constraints from the nice-to-haves.\n3. Take the smallest useful next step.\n\nTell me which part you’d like to explore further.'
    : 'Nyaa! I hear you: “' +
        snippet +
        '”\n\nThis demo uses a local response engine, so it does not send your message to an external AI service. I can still help you shape the next question or think through the task.'
}

const titleFromMessage = (message: string) => {
  const compact = message.replace(/\s+/g, ' ').trim()
  return compact.length > 36 ? compact.slice(0, 33) + '…' : compact || 'New chat'
}

function App() {
  const [conversations, setConversations] = useState<Conversation[]>(loadConversations)
  const [activeChatId, setActiveChatId] = useState(() => {
    try {
      const savedActiveId = window.localStorage.getItem(activeChatStorageKey)
      return savedActiveId || loadConversations()[0].id
    } catch {
      return initialConversations[0].id
    }
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const responseTimers = useRef<number[]>([])

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeChatId && !conversation.archived) ??
    conversations.find((conversation) => !conversation.archived) ??
    conversations[0]

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(conversations))
    } catch {
      // The chat still works for this session when browser storage is unavailable.
    }
  }, [conversations])

  useEffect(() => {
    if (activeConversation) {
      setActiveChatId(activeConversation.id)
      try {
        window.localStorage.setItem(activeChatStorageKey, activeConversation.id)
      } catch {
        // Keeping the active chat in memory is an acceptable fallback.
      }
    }
  }, [activeConversation])

  useEffect(
    () => () => {
      responseTimers.current.forEach((timer) => window.clearTimeout(timer))
    },
    [],
  )

  const queueReply = (conversationId: string, prompt: string, thinkingMode: boolean) => {
    setIsGenerating(true)
    const timer = window.setTimeout(() => {
      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                messages: [...conversation.messages, createMessage('assistant', getReply(prompt, thinkingMode))],
              }
            : conversation,
        ),
      )
      setIsGenerating(false)
      responseTimers.current = responseTimers.current.filter((item) => item !== timer)
    }, 550)

    responseTimers.current.push(timer)
  }

  const handleNewChat = () => {
    const conversation = createConversation()
    setConversations((current) => [conversation, ...current])
    setActiveChatId(conversation.id)
  }

  const handleSendMessage = (content: string, thinkingMode: boolean) => {
    const message = content.trim()
    if (!message || !activeConversation || isGenerating) return

    const conversationId = activeConversation.id
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              title: conversation.title === 'New chat' ? titleFromMessage(message) : conversation.title,
              messages: [...conversation.messages, createMessage('user', message)],
            }
          : conversation,
      ),
    )
    queueReply(conversationId, message, thinkingMode)
  }

  const handleRenameChat = (conversationId: string) => {
    const conversation = conversations.find((item) => item.id === conversationId)
    if (!conversation) return

    const title = window.prompt('Rename chat', conversation.title)?.trim()
    if (!title) return
    setConversations((current) =>
      current.map((item) => (item.id === conversationId ? { ...item, title } : item)),
    )
  }

  const handleArchiveChat = (conversationId: string) => {
    const updated = conversations.map((conversation) =>
      conversation.id === conversationId ? { ...conversation, archived: true } : conversation,
    )
    const nextVisible = updated.find((conversation) => !conversation.archived)

    if (nextVisible) {
      setConversations(updated)
      if (activeChatId === conversationId) setActiveChatId(nextVisible.id)
      return
    }

    const freshConversation = createConversation()
    setConversations([freshConversation, ...updated])
    setActiveChatId(freshConversation.id)
  }

  const handleDeleteChat = (conversationId: string) => {
    const updated = conversations.filter((conversation) => conversation.id !== conversationId)
    const nextConversation = updated.find((conversation) => !conversation.archived)

    if (nextConversation) {
      setConversations(updated)
      if (activeChatId === conversationId) setActiveChatId(nextConversation.id)
      return
    }

    const freshConversation = createConversation()
    setConversations([freshConversation, ...updated])
    setActiveChatId(freshConversation.id)
  }

  const handleEditMessage = (messageId: string, content: string) => {
    if (!activeConversation || !content.trim()) return
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === activeConversation.id
          ? {
              ...conversation,
              messages: conversation.messages.map((message) =>
                message.id === messageId ? { ...message, content: content.trim() } : message,
              ),
            }
          : conversation,
      ),
    )
  }

  const handleRegenerate = () => {
    if (!activeConversation || isGenerating) return
    const lastUserMessage = [...activeConversation.messages]
      .reverse()
      .find((message) => message.role === 'user')
    if (lastUserMessage) queueReply(activeConversation.id, lastUserMessage.content, false)
  }

  const handleBranch = (messageId: string) => {
    if (!activeConversation) return
    const endIndex = activeConversation.messages.findIndex((message) => message.id === messageId)
    if (endIndex === -1) return

    const branch: Conversation = {
      id: createId(),
      title: activeConversation.title + ' (branch)',
      messages: activeConversation.messages.slice(0, endIndex + 1),
    }
    setConversations((current) => [branch, ...current])
    setActiveChatId(branch.id)
  }

  return (
    <div className="app">
      <Sidebar
        conversations={conversations.filter((conversation) => !conversation.archived)}
        activeChatId={activeConversation?.id ?? ''}
        onNewChat={handleNewChat}
        onSelectChat={setActiveChatId}
        onRenameChat={handleRenameChat}
        onArchiveChat={handleArchiveChat}
        onDeleteChat={handleDeleteChat}
      />
      <Main
        title={activeConversation?.title ?? 'New chat'}
        messages={activeConversation?.messages ?? []}
        isGenerating={isGenerating}
        onSendMessage={handleSendMessage}
        onEditMessage={handleEditMessage}
        onRegenerate={handleRegenerate}
        onBranch={handleBranch}
        onArchiveChat={() => activeConversation && handleArchiveChat(activeConversation.id)}
        onDeleteChat={() => activeConversation && handleDeleteChat(activeConversation.id)}
      />
    </div>
  )
}

export default App
