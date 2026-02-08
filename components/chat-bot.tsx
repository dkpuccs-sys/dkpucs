"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Send, X, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

/**
 * Floating chat widget component that provides a conversational UI for interacting with an AI assistant.
 *
 * @returns The ChatBot React element.
 */
export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(
          parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
        );
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages, isLoaded]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const payloadMessages = [...messages, userMessage].map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        content: msg.text,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Chat API returned an error");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      const botMessageId = crypto.randomUUID();
      let fullText = "";

      try {
        setMessages((prev) => [
          ...prev,
          {
            id: botMessageId,
            text: "",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, text: fullText } : msg,
            ),
          );
        }
      } catch (error) {
        console.error("Error reading stream:", error);
        if (botMessageId) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId
                ? {
                    ...msg,
                    text: "Sorry, something went wrong while contacting the AI service.",
                  }
                : msg,
            ),
          );
        }
        throw error;
      } finally {
        reader?.releaseLock();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 cursor-pointer right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:opacity-90 z-40"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-128 bg-card border border-border rounded-lg shadow-xl flex flex-col z-50 max-sm:w-full max-sm:h-full max-sm:right-0 max-sm:bottom-0 max-sm:rounded-none">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              <h3 className="font-semibold">Coding Club AI</h3>
              <p className="text-xs text-muted-foreground">
                Always here to help
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:opacity-70 cursor-pointer"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <MessageCircle
                    size={40}
                    className="text-muted-foreground mx-auto mb-3 opacity-50"
                  />
                  <p className="text-muted-foreground text-sm">
                    Start a conversation! Ask me anything about the coding club.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
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
                className="w-full text-xs cursor-pointer text-muted-foreground hover:text-foreground text-center py-1"
              >
                Clear conversation
              </button>
            )}
            {isLoading && (
              <p className="text-xs text-muted-foreground text-center">
                AI is thinking...
              </p>
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
                disabled={!input.trim() || isLoading}
                className="px-3 py-2 cursor-pointer bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
