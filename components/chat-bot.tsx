"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Send, X, MessageCircle } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages")
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        setMessages(
          parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        )
      } catch (error) {
        console.error("Error loading chat history:", error)
      }
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages))
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    const responses: { [key: string]: string } = {
      hello: "Hello! I'm the Coding Club AI Assistant. How can I help you today?",
      hi: "Hi there! Welcome to the Coding Club. What would you like to know?",
      help: "I can help you with:\n- Information about coding club events\n- Programming tips and resources\n- Questions about practicals and question papers\n- General coding guidance",
      events:
        "We host regular coding competitions, workshops, and study sessions. Check our blogs and discussion forum for updates!",
      python: "Python is great for beginners! Try our Python Code Runner to practice.",
      practice: "You can access practicals and question papers in the respective sections.",
      about: "We are a college coding club dedicated to helping students improve their programming skills.",
      syllabus: "You can find the course syllabus in our Syllabus section.",
      blog: "Check out our Blogs section for programming tutorials and tips!",
      contact: "You can contact us through the Contact page or our discussion forum!",
      default: "That's an interesting question! Feel free to explore our platform for more resources.",
    }

    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) return response
    }
    return responses.default
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(input),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 300)
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem("chatMessages")
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:opacity-90 z-40"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[32rem] bg-card border border-border rounded-lg shadow-xl flex flex-col z-50 max-sm:w-full max-sm:h-full max-sm:right-0 max-sm:bottom-0 max-sm:rounded-none">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              <h3 className="font-semibold">Coding Club AI</h3>
              <p className="text-xs text-muted-foreground">Always here to help</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:opacity-70" aria-label="Close chat">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <MessageCircle size={40} className="text-muted-foreground mx-auto mb-3 opacity-50" />
                  <p className="text-muted-foreground text-sm">
                    Start a conversation! Ask me anything about the coding club.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <div className="border-t border-border p-4 space-y-2">
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="w-full text-xs text-muted-foreground hover:text-foreground text-center py-1"
              >
                Clear conversation
              </button>
            )}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-3 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
